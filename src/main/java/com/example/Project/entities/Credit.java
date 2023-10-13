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
@Table(name = "credit")
public class Credit {
    @OneToMany(mappedBy = "credit", orphanRemoval = true)
    private Set<Payment> payments = new LinkedHashSet<>();

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "creditId", nullable = false)
    private Integer creditId;

    @Column(name = "credit_remaining_amount")
    private Float creditRemainingAmount;

    @Column(name = "credit_amount")
    private Float creditAmount;

    @Temporal(TemporalType.DATE)
    @Column(name = "credit_due_date")
    private Date creditDueDate;

    @Temporal(TemporalType.DATE)
    @Column(name = "credit_start_date")
    private Date creditStartDate;

}