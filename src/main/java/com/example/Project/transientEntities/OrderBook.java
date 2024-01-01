package com.example.Project.transientEntities;

import com.example.Project.entities.Account;
import com.example.Project.entities.Asset;
import com.example.Project.services.impl.AccountAssetService;
import com.example.Project.services.impl.AccountService;
import com.example.Project.services.impl.KafkaSender;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.PriorityQueue;

import java.util.Queue;

@Component
public class OrderBook  {



    @Autowired
    private final AccountService accountService;

    @Autowired
    private final AccountAssetService accountAssetService;

    private long assetId;

    @Autowired
    private KafkaSender kafkaSender;




    /*Todo could be linked and persisted to see historical price data in time series format*/
    private Integer lastPrice ;

    public OrderBook(AccountService accountService, KafkaSender kafkaSender, AccountAssetService accountAssetService) {
        this.accountService = accountService;
        this.kafkaSender = kafkaSender;
        this.accountAssetService =accountAssetService;
    }
    public PriorityQueue<Limit> bidQueue = new PriorityQueue<>((l1, l2) -> Integer.compare(l2.getPrice(), l1.getPrice())); // Max-heap
    public PriorityQueue<Limit> askQueue = new PriorityQueue<>((l1, l2) -> Integer.compare(l1.getPrice(), l2.getPrice())); // Min-heap


    public void addOrder(Order order, Account account) throws Exception {
        Limit limit;

        int totalPrice = order.getPrice() * order.getVolume();
        System.out.println("Total Price :"+totalPrice);
        if (order.isBuy()) {

            if (account.getBalance() >= totalPrice) {

                account.setBalance(account.getBalance() - totalPrice);
                System.out.println("Total balance :"+account.getBalance());
                accountService.updateAccount(account);

            } else {
                throw new RuntimeException("No available balance to do transaction");
            }
            limit = findOrAddLimit(bidQueue, order);
        } else {


            accountAssetService.updateAccountAsset(account,assetId,-order.getVolume());

            /*TODO Does he have the underlying asset*/
            limit = findOrAddLimit(askQueue, order);
        }
        limit.addOrder(order);
        settleOrders();
    }
    public void cancelOrder(Long orderId, Account account) throws Exception {
        Boolean foundElement=false;

        /*TODO implement cancel order fee*/
        for (Limit limit : bidQueue) {
            Order WantedOrder=limit.containsOrder(orderId);
            if (WantedOrder!=null) {

                if (account.getAccountId()!=WantedOrder.getAccountId()){
                    throw new Exception("User dosen't correspond to the order");
                }
                limit.removeOrder(WantedOrder);
                account.setBalance(account.getBalance() + WantedOrder.getPrice() * WantedOrder.getVolume());
                accountService.updateAccount(account);
                foundElement=true;
                break;
            }
        }
        if (!foundElement){
            for (Limit limit : askQueue) {
                Order WantedOrder=limit.containsOrder(orderId);
                if (WantedOrder!=null) {
                    if (account.getAccountId()!=WantedOrder.getAccountId()){
                        throw new Exception("User dosen't correspond to the order");
                    }
                    limit.removeOrder(WantedOrder);

                    accountAssetService.updateAccountAsset(account, assetId, WantedOrder.getVolume());
                    foundElement=true;
                    break;
                }
            }

        }
        if (!foundElement){
            throw new Exception("Order not found");
        }



    }

    public Limit getBestBid() {
        return bidQueue.peek();
    }

    public Limit getBestAsk() {
        return askQueue.peek();
    }

    private Limit findOrAddLimit(PriorityQueue<Limit> queue, Order order) {
        /*kafkaSender.send("Done Order");*/
        for (Limit limit : queue) {
            if (limit.getPrice() == order.getPrice()) {
                return limit;
            }
        }

        Limit newLimit = new Limit(order.getPrice());
        queue.add(newLimit);
        return newLimit;
    }

    public void settleOrders() {
        while (true) {
            Limit bestBid = getBestBid();
            Limit bestAsk = getBestAsk();

            if (bestBid == null || bestAsk == null || bestBid.getPrice() < bestAsk.getPrice()) {

                break;
            }



            Order settledOrderBid = bestBid.getNextOrderInFIFO();
            Order settledOrderAsk = bestAsk.getNextOrderInFIFO();

            if (settledOrderBid != null && settledOrderAsk != null) {
                int settleVolume = Math.min(settledOrderAsk.getVolume(), settledOrderBid.getVolume());
                settledOrderBid.reduceVolume(settleVolume);
                settledOrderAsk.reduceVolume(settleVolume);

                lastPrice=settledOrderBid.getPrice();




                /*------------------------------------*/
                if (settledOrderBid.getVolume() == 0) {
                    String message ="";
                    if (settledOrderAsk.getVolume()!=0){
                        message = "Partially fulfilled Order " + settledOrderAsk.getOrderId() + " at price = " + settledOrderBid.getPrice() + " on volume = " + settleVolume+ " For user " +settledOrderAsk.getAccountId()+ " On Asset : " +settledOrderAsk.getAssetId() +" with type : bid";;
                        this.kafkaSender.send("settled-order",message);
                    }

                    message ="Fully fulfilled Order " + settledOrderBid.getOrderId() + " at price = "+ settledOrderBid.getPrice()   + " on volume = " + settleVolume+ " For user " +settledOrderBid.getAccountId()+ " On Asset : " +settledOrderAsk.getAssetId()+" with type : bid";;
                    this.kafkaSender.send("settled-order",message);

                    bestBid.removeOrder(settledOrderBid);

                }

                if (settledOrderAsk.getVolume() == 0) {
                    String message ="";
                    if (settledOrderBid.getVolume()!=0){
                        message = "Partially fulfilled Order " + settledOrderBid.getOrderId() + " at price = " + settledOrderBid.getPrice() + " on volume = " + settleVolume + " For user " +settledOrderBid.getAccountId()+ " On Asset : " +settledOrderAsk.getAssetId()+" with type : ask";;
                   this.kafkaSender.send("settled-order",message);
                    }
                    message = "Fully fulfilled Order " + settledOrderAsk.getOrderId() + " at price = " + settledOrderBid.getPrice()  + " on volume = " + settleVolume+ " For user " +settledOrderAsk.getAccountId()+ " On Asset : " +settledOrderAsk.getAssetId()+" with type : ask";;
                    this.kafkaSender.send("settled-order",message);
                    bestAsk.removeOrder(settledOrderAsk);
                }
                if (bestBid.getTotalVolume() == 0) {
                    bidQueue.remove(bestBid);
                }

                if (bestAsk.getTotalVolume() == 0) {
                    askQueue.remove(bestAsk);
                }

            }
        }
    }
    public List<Order> getOrdersForUser(long userId) {
        List<Order> userOrders = new ArrayList<>();

        for (Limit limit : bidQueue) {
            for (Order order : limit.getOrders()) {
                if (order.getAccountId() == userId) {
                    userOrders.add(order);
                }
            }
        }

        for (Limit limit : askQueue) {
            for (Order order : limit.getOrders()) {
                if (order.getAccountId() == userId) {
                    userOrders.add(order);
                }
            }
        }

        return userOrders;
    }

    public Queue<Limit> getAskQueue() {
        return askQueue;
    }

    public Queue<Limit> getBidQueue() {
        return bidQueue;
    }

    public Integer getLastPrice() {
        return lastPrice;
    }

    public void setLastPrice(Integer lastPrice) {
        this.lastPrice = lastPrice;
    }
    public long getAssetId() {
        return assetId;
    }

    public void setAssetId(long assetId) {
        this.assetId = assetId;
    }
}
