package com.example.Project.entities;

import com.example.Project.enums.TypeEvent;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;

@Getter
@Setter
@Entity
@Table(name = "event")
public class Event {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "eventId", nullable = false)
    private Integer eventId;

    @Column(name = "event_price")
    private Float eventPrice;

    @Column(name = "event_name")
    private String eventName;


    @Enumerated
    @Column(name = "type_event")
    private TypeEvent typeEvent;

    @Column(name = "event_description")
    private String eventDescription;

    @Temporal(TemporalType.DATE)
    @Column(name = "event_date")
    private Date eventDate;

    @ManyToOne
    @JoinColumn(name = "user_user_id")
    private User user;

}