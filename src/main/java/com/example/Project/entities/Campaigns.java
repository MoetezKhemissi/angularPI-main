package com.example.Project.entities;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@Entity
@Table(name = "campaigns")
public class Campaigns {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "campaignId", nullable = false)
    private Integer campaignId;

    @Column(name = "campaign_description")
    private String campaignDescription;

    @ManyToOne
    @JoinColumn(name = "user_user_id")
    private User user;

}