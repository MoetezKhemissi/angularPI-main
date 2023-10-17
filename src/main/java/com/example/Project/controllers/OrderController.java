package com.example.Project.controllers;


import com.example.Project.services.impl.OrderService;
import com.example.Project.transientEntities.Limit;
import com.example.Project.transientEntities.Order;
import com.example.Project.services.impl.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Queue;

@RestController
@RequestMapping("/api/orders")
public class OrderController {
    private final OrderService orderService;

    @Autowired
    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping("/add")
    public void addOrder(@RequestBody Order order) {
        orderService.addOrder(order);
    }

    @GetMapping("/ask")
    public Queue<Limit> getAskQueue() {
        return orderService.getOrderBook().getAskQueue();
    }

    @GetMapping("/bid")
    public Queue<Limit> getBidQueue() {
        return orderService.getOrderBook().getBidQueue();
    }
}