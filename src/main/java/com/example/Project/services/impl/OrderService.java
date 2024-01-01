package com.example.Project.services.impl;


import com.example.Project.entities.Account;
import com.example.Project.transientEntities.Order;
import com.example.Project.transientEntities.OrderBook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OrderService {
    private final OrderBook orderBook;

    
    public OrderService(OrderBook orderBook) {
        this.orderBook = orderBook;
    }

    public void addOrder(Order order, Account account) throws Exception {
        orderBook.addOrder(order,account);
    }

    public OrderBook getOrderBook() {
        return orderBook;
    }
}