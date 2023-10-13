package com.example.Project.entities;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.Hibernate;

import javax.persistence.*;
import java.util.Date;
import java.util.Objects;

@Getter
@Setter
@Entity
@Table(name = "bill")
public class Bill {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "billId", nullable = false)
    private Integer billId;

    @Column(name = "bill_sum")
    private Float billSum;

    @Temporal(TemporalType.DATE)
    @Column(name = "bill_date")
    private Date billDate;

    @Column(name = "bill_type")
    private String billType;

    @Column(name = "bill_num")
    private Integer billNum;

    @ManyToOne
    @JoinColumn(name = "payment_payment_id")
    private Payment payment;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        Bill bill = (Bill) o;
        return getBillId() != null && Objects.equals(getBillId(), bill.getBillId());
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}