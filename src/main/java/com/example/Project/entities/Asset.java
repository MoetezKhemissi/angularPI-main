package com.example.Project.entities;

import com.example.Project.services.impl.AccountAssetService;
import com.example.Project.services.impl.AccountService;
import com.example.Project.services.impl.AssetService;
import com.example.Project.services.impl.KafkaSender;
import com.example.Project.transientEntities.OrderBook;
import lombok.Getter;
import lombok.Setter;


import javax.persistence.*;
import java.util.LinkedHashSet;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "asset")
public class Asset {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "asset_id", nullable = false)
    private Long assetId;

    @Column(name = "asset_name")
    private String assetName;

    @Column(name = "description")
    private String description;

    @Transient
    private OrderBook orderBook;

    @Transient
    private AccountService accountService;

    @Transient
    private AssetService assetService;

    @Transient
    private AccountAssetService accountAssetService;

    @OneToMany(mappedBy = "asset", orphanRemoval = true)
    private Set<Transaction> transactions = new LinkedHashSet<>();


    public Asset(String assetName, String description, AccountService accountService) {
        this.assetName = assetName;
        this.description = description;
        this.accountService = accountService;
        KafkaSender kafkaSender = new KafkaSender();
        this.orderBook = new OrderBook(this.accountService,kafkaSender,this.accountAssetService);

    }


    public Asset() {


    }
}
