package com.example.Project.dto;

public class OrderCancellationDTO {
    private long orderId;
    private long accountId;

    // Getters and setters for orderId and accountId

    public long getOrderId() {
        return orderId;
    }

    public void setOrderId(long orderId) {
        this.orderId = orderId;
    }

    public long getAccountId() {
        return accountId;
    }

    public void setAccountId(long accountId) {
        this.accountId = accountId;
    }
}