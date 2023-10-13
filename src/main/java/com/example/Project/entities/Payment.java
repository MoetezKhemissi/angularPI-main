package com.example.Project.entities;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;
import java.util.LinkedHashSet;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "payment")
public class Payment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "paymentId", nullable = false)
    private Integer paymentId;

    @Temporal(TemporalType.DATE)
    @Column(name = "pay_date")
    private Date payDate;

    @Column(name = "pay_type")
    private String payType;

    @OneToMany(mappedBy = "payment", orphanRemoval = true)
    private Set<Bill> bills = new LinkedHashSet<>();

    @Column(name = "pay_sum")
    private Float paySum;

    @ManyToOne
    @JoinColumn(name = "credit_credit_id")
    private Credit credit;

}