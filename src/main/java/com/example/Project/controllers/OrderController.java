package com.example.Project.controllers;


import com.example.Project.dto.OrderCancellationDTO;
import com.example.Project.entities.Account;
import com.example.Project.services.impl.*;

import com.example.Project.transientEntities.Limit;
import com.example.Project.transientEntities.Order;
import com.example.Project.services.impl.OrderService;
import com.example.Project.transientEntities.OrderBook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.PrintWriter;
import java.io.StringWriter;
import java.util.List;
import java.util.Queue;

@RestController
@RequestMapping("/api/orders")
public class OrderController {
    private OrderService orderService;
    private AssetService assetService ;
    private AccountService accountService ;



    @Autowired
    public OrderController(OrderService orderService,AssetService assetService,AccountService accountService) {
        this.orderService = orderService;
        this.assetService = assetService;
        this.accountService = accountService;

    }

    @PostMapping("/add/{assetId}")
    public ResponseEntity<String> addOrder(@RequestBody Order order,@PathVariable Long assetId) {
        try {
            if (order.getPrice() < 0 || order.getVolume() < 0) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Price and volume must be non-negative.");
            }
/*TODO parse out the wanted person in order by token*/
            Account account = accountService.getById(order.getAccountId());
            OrderBook orderBook = assetService.getOrderBookManager().getOrderBookForAsset(assetId);
            String assetName = assetService.getAssetById(assetId).getAssetName();
            order.setAssetName(assetName);
            order.setAssetId(assetId);
            orderBook.addOrder(order,account);

            return ResponseEntity.status(HttpStatus.CREATED).body("Order added successfully");
        } catch (Exception e) {
            if (e.getMessage()=="No available balance to do transaction"){
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("You don't have enough funds");
            }
            StringWriter sw = new StringWriter();
            PrintWriter pw = new PrintWriter(sw);
            e.printStackTrace(pw);
            String sStackTrace = sw.toString(); // stack trace as a string
            System.out.println(sStackTrace);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }
    @PostMapping("/cancel/{assetId}")
    public ResponseEntity<String> CancelOrder(@RequestBody OrderCancellationDTO orderCancellationDTO, @PathVariable Long assetId) throws Exception {

            OrderBook orderBook = assetService.getOrderBookManager().getOrderBookForAsset(assetId);
            long orderId = orderCancellationDTO.getOrderId();
            long accountId = orderCancellationDTO.getAccountId();
            Account account = accountService.getById(accountId);
            if (account ==null) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Account dosen't exist");
            }
            try {
                orderBook.cancelOrder(orderId, account);
                return ResponseEntity.status(HttpStatus.CREATED).body("Order canceled successfully");
            }
            catch (Exception e){
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
            }


    }

    @GetMapping("/ask/{assetId}")
    public Queue<Limit> getAskQueue(@PathVariable Long assetId) {

        OrderBook orderBook = assetService.getOrderBookManager().getOrderBookForAsset(assetId);
        return orderBook.getAskQueue();
    }

    @GetMapping("/bid/{assetId}")
    public Queue<Limit> getBidQueue(@PathVariable Long assetId) {
        OrderBook orderBook = assetService.getOrderBookManager().getOrderBookForAsset(assetId);
        return orderBook.getBidQueue();
    }
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Order>> getAllOrdersForUser(@PathVariable Long userId) {
        try {
            List<Order> userOrders =  assetService.getOrderBookManager().getAllOrdersForUser(userId);
            return new ResponseEntity<>(userOrders, HttpStatus.OK);
        } catch (Exception e) {
            // Log the error or handle it appropriately
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}