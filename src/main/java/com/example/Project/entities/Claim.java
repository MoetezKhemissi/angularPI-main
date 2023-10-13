package com.example.Project.entities;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;

@Getter
@Setter
@Entity
@Table(name = "claim")
public class Claim {
    @Column(name = "status")
    private Boolean status;

    @Column(name = "subject")
    private String subject;

    @Column(name = "description")
    private String description;

    @Temporal(TemporalType.DATE)
    @Column(name = "creation_date")
    private Date creationDate;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "claimId", nullable = false)
    private Integer claimId;

    @ManyToOne
    @JoinColumn(name = "user_user_id")
    private User user;

}