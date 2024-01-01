package com.example.Project.dto;


public class AccountAssetUpdateRequest {
    private Long accountId;
    private Long assetId;
    private double amount;

    public AccountAssetUpdateRequest() {}

    public AccountAssetUpdateRequest(Long accountId, Long assetId, double amount) {
        this.accountId = accountId;
        this.assetId = assetId;
        this.amount = amount;
    }

    public Long getAccountId() {
        return accountId;
    }

    public void setAccountId(Long accountId) {
        this.accountId = accountId;
    }

    public Long getAssetId() {
        return assetId;
    }

    public void setAssetId(Long assetId) {
        this.assetId = assetId;
    }

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }
}