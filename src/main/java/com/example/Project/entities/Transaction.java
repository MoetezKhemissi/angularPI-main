package com.example.Project.entities;

import com.example.Project.enums.TypeTransaction;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;

@Getter
@Setter
@Entity
@Table(name = "transaction")
public class Transaction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "transactionId", nullable = false)
    private Integer transactionId;

    @Column(name = "transaction_amount")
    private Float transactionAmount;

    @Temporal(TemporalType.DATE)
    @Column(name = "transaction_date")
    private Date transactionDate;

    @Enumerated(EnumType.STRING)
    @Column(name = "type_transaction")
    private TypeTransaction typeTransaction;

    @ManyToOne
    @JoinColumn(name = "account_account_id")
    private Account account;

    @ManyToOne
    @JoinColumn(name = "asset_asset_id")
    private Asset asset;

}