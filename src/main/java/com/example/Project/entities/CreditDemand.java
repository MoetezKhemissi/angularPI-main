package com.example.Project.entities;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@Entity
@Table(name = "credit_demand")
public class CreditDemand {
    @OneToOne(orphanRemoval = true)
    @JoinColumn(name = "credit_credit_id")
    private Credit credit;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "demandId", nullable = false)
    private Integer demandId;

    @Column(name = "status")
    private Boolean status;

    @Column(name = "sum_demand")
    private Float sumDemand;

    @ManyToOne
    @JoinColumn(name = "account_account_id")
    private Account account;

}