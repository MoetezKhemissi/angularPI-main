package com.example.Project.transientEntities;

import com.example.Project.entities.Asset;
import com.example.Project.repositories.AccountRepository;
import com.example.Project.repositories.AssetRepository;
import com.example.Project.services.impl.AccountAssetService;
import com.example.Project.services.impl.AccountService;
import com.example.Project.services.impl.KafkaSender;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Component
public class AssetOrderBookManager {

    private final AccountService accountServicel;


    private final AccountAssetService accountAssetService;

    private static  Map<Long, OrderBook> assetOrderBooks = new HashMap();

    @Autowired
    private AssetRepository assetRepository;
    @Autowired
    private KafkaSender kafkaSender;

    public AssetOrderBookManager(AccountService accountServicel,AccountAssetService accountAssetService) {


        this.accountServicel = accountServicel;

        this.accountAssetService=accountAssetService;
    }
    public Map<Long, OrderBook> getAssetOrderBooks() {
        return assetOrderBooks;
    }
    @PostConstruct
    public void initializeAssetOrderBooks() {
        // Retrieve all assets using the AssetRepository
        List<Asset> assets = (List<Asset>) assetRepository.findAll();

        // Initialize an empty OrderBook for each asset
        for (Asset asset : assets) {

            AccountRepository accountRepository;
            KafkaSender kafkaSender = new KafkaSender();
            OrderBook orderBook = new OrderBook(accountServicel, kafkaSender,accountAssetService);
            orderBook.setAssetId(asset.getAssetId());
            assetOrderBooks.put(asset.getAssetId(), orderBook);
        }
    }

    public OrderBook getOrderBookForAsset(Long assetId) {
        return assetOrderBooks.get(assetId);
    }

    public void addOrderBook(Long assetId, OrderBook orderBook) {
        assetOrderBooks.put(assetId, orderBook);
    }

    public void removeOrderBook(Long assetId) {
        assetOrderBooks.remove(assetId);
    }

    public List<Order> getAllOrdersForUser(Long userId) {
        List<Order> userOrders = new ArrayList<>();

        for (OrderBook orderBook : assetOrderBooks.values()) {
            List<Order> ordersForUser = orderBook.getOrdersForUser(userId);
            userOrders.addAll(ordersForUser);
        }

        return userOrders;
    }
    public static Map<Long, OrderBook> getStaticAssetOrderBooks() {
        return assetOrderBooks;
    }


}