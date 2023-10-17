package com.example.Project.transientEntities;

import java.util.PriorityQueue;
import java.util.Queue;

public class OrderBook {
    public PriorityQueue<Limit> bidQueue = new PriorityQueue<>((l1, l2) -> Integer.compare(l2.getPrice(), l1.getPrice())); // Max-heap
    public PriorityQueue<Limit> askQueue = new PriorityQueue<>((l1, l2) -> Integer.compare(l1.getPrice(), l2.getPrice())); // Min-heap

    public void addOrder(Order order) {

        Limit limit;

        if (order.isBuy()) {
            limit = findOrAddLimit(bidQueue, order);
        } else {
            limit = findOrAddLimit(askQueue, order);
        }
        limit.addOrder(order);
        settleOrders();
    }

    public Limit getBestBid() {
        return bidQueue.peek();
    }

    public Limit getBestAsk() {
        return askQueue.peek();
    }

    private Limit findOrAddLimit(PriorityQueue<Limit> queue, Order order) {
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

            int settleVolume = Math.min(bestBid.getTotalVolume(), bestAsk.getTotalVolume());

            Order settledOrderBid = bestBid.getNextOrderInFIFO();
            Order settledOrderAsk = bestAsk.getNextOrderInFIFO();

            if (settledOrderBid != null && settledOrderAsk != null) {
                settledOrderBid.reduceVolume(settleVolume);
                settledOrderAsk.reduceVolume(settleVolume);
                if (settledOrderBid.getVolume() == 0) {
                    System.out.println("Partially fulfilled Order " + settledOrderAsk.getOrderId() + " at price = " + settledOrderBid.getPrice() + " on volume = " + settledOrderAsk.getVolume());
                    System.out.println("Fully fulfilled Order " + settledOrderBid.getOrderId() + " at price = " + settledOrderBid.getPrice());
                    bestBid.removeOrder(settledOrderBid);

                }

                if (settledOrderAsk.getVolume() == 0) {
                    System.out.println("Partially fulfilled Order " + settledOrderBid.getOrderId() + " at price = " + settledOrderBid.getPrice() + " on volume = " + settledOrderBid.getVolume());
                    System.out.println("Fully fulfilled Order " + settledOrderAsk.getOrderId() + " at price = " + settledOrderBid.getPrice());
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

    public Queue<Limit> getAskQueue() {
        return askQueue;
    }

    public Queue<Limit> getBidQueue() {
        return bidQueue;
    }
}