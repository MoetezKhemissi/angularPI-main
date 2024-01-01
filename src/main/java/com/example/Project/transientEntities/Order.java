package com.example.Project.transientEntities;



import lombok.*;

import java.util.concurrent.atomic.AtomicLong;



@Getter
@Builder
@Setter
public class Order {
    private static final AtomicLong uniqueIdGenerator = new AtomicLong(0);
    private final long orderId;

    private final long accountId;

    private long assetId;
    private String assetName;
    private int price;
    private int volume;
    private boolean isBuy; // True for bid False for ask


    public Order(long orderId ,long accountId,long assetId,String assetName, int price, int volume, boolean isBuy) {
        this.orderId = uniqueIdGenerator.incrementAndGet();
        this.accountId = accountId;
        this.price = price;
        this.volume = volume;
        this.assetId=assetId;
        this.assetName=assetName;
        this.isBuy = isBuy;
    }

    public long getOrderId() {
        return orderId;
    }

    public int getPrice() {
        return price;
    }

    public int getVolume() {
        return volume;
    }

    public boolean isBuy() {
        return isBuy;
    }

    public void reduceVolume(int volume) {
        this.volume -= volume;
    }

    public long getAccountId() {
        return accountId;
    }
}
