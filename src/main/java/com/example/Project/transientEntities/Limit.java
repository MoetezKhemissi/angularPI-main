package com.example.Project.transientEntities;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;
import java.util.Queue;

public class Limit {
    private int price;
    private Queue<Order> orders = new LinkedList<>();

    public Limit(int price) {
        this.price = price;
    }

    public int getPrice() {
        return price;
    }

    public void addOrder(Order order) {
        orders.add(order);
    }

    public Order getNextOrderInFIFO() {
        return orders.peek();
    }

    public void removeOrder(Order order) {
        orders.remove(order);
    }

    public int getTotalVolume() {
        int totalVolume = 0;
        for (Order order : orders) {
            totalVolume += order.getVolume();
        }
        return totalVolume;
    }

    public List<Order> getOrders() {
        return new ArrayList<>(orders);
    }

    public Order containsOrder(Long orderId) {

            for (Order existingOrder : orders) {
                if (existingOrder.getOrderId()==orderId) {
                    return existingOrder;
                }
            }
            return null;
        }

}