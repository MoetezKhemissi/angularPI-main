package com.example.Project.services.impl;

import com.example.Project.transientEntities.AssetOrderBookManager;
import com.example.Project.entities.Asset;
import com.example.Project.repositories.AssetRepository;
import com.example.Project.transientEntities.Order;
import com.example.Project.transientEntities.OrderBook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
public class AssetService {
    private final AssetRepository assetRepository;
    private AssetOrderBookManager assetOrderBookManager;

    private final AccountService accountService;



    private final AccountAssetService accountAssetService;


    @Autowired
    public AssetService(AssetRepository assetRepository, AssetOrderBookManager assetOrderBookManager, AccountService accountService,AccountAssetService accountAssetService) {
        this.assetRepository = assetRepository;
        this.assetOrderBookManager = assetOrderBookManager;
        this.accountService = accountService;

        this.accountAssetService=accountAssetService;
    }

    @Transactional
    public Asset createAsset(String assetName, String description) {
        // Create the asset
        System.out.println("Started Creating Asset");
        Asset asset = new Asset(assetName, description, accountService);
        System.out.println(asset);
        // Save the asset to the database
        asset = assetRepository.save(asset);
        OrderBook updateOrderbook = asset.getOrderBook();
        updateOrderbook.setAssetId(asset.getAssetId());
        asset.setOrderBook(updateOrderbook);
        // Create and store the OrderBook for the asset
        KafkaSender kafkaSender = new KafkaSender();
        OrderBook orderBook = new OrderBook(this.accountService,kafkaSender,this.accountAssetService);
        orderBook.setAssetId(asset.getAssetId());
        // Add the OrderBook to the AssetOrderBookManager
        assetOrderBookManager.addOrderBook(asset.getAssetId(), orderBook);

        return asset;
    }

    public Asset getAssetById(Long assetId) {
        Asset asset = assetRepository.findById(assetId).orElse(null);

        if (asset != null) {
            OrderBook orderBook = assetOrderBookManager.getOrderBookForAsset(asset.getAssetId());
            asset.setOrderBook(orderBook);
        }

        return asset;
    }
    public List<Order> GetOrdersByUser(Long userId){
        return assetOrderBookManager.getAllOrdersForUser(userId);
    }

    @Transactional
    public Asset updateAsset(Long assetId, String assetName, String description) {
        Asset existingAsset = assetRepository.findById(assetId).orElse(null);
        if (existingAsset != null) {
            existingAsset.setAssetName(assetName);
            existingAsset.setDescription(description);
            return assetRepository.save(existingAsset);
        }
        return null;
    }

    @Transactional
    public void deleteAsset(Long assetId) {
        // Delete the asset from the database
        assetRepository.deleteById(assetId);

        // Remove the associated OrderBook
        assetOrderBookManager.removeOrderBook(assetId);
    }

    @Transactional
    public List<Asset> getAllAssets() {
        List<Asset> assets = (List<Asset>) assetRepository.findAll();
        List<Asset> assetsWithOrderBooks = new ArrayList<>();

        for (Asset asset : assets) {
            OrderBook orderBook = assetOrderBookManager.getOrderBookForAsset(asset.getAssetId());
            asset.setOrderBook(orderBook);
            assetsWithOrderBooks.add(asset);
        }

        return assetsWithOrderBooks;
    }
    public AssetOrderBookManager getOrderBookManager() {
        return assetOrderBookManager;
    }
}