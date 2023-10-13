package com.example.Project.entities;

import com.example.Project.enums.RoleUser;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.LinkedHashSet;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "user")
public class User {
    @OneToMany(mappedBy = "user", orphanRemoval = true)
    private Set<Campaigns> campaigns = new LinkedHashSet<>();

    @OneToMany(mappedBy = "user", orphanRemoval = true)
    private Set<Post> posts = new LinkedHashSet<>();

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "UserId", nullable = false)
    private Integer UserId;

    @Column(name = "last_name")
    private String lastName;

    @OneToMany(mappedBy = "user", orphanRemoval = true)
    private Set<Event> events = new LinkedHashSet<>();

    @OneToMany(mappedBy = "user", orphanRemoval = true)
    private Set<Claim> claims = new LinkedHashSet<>();

    @Column(name = "cin")
    private Integer cin;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "addres")
    private String addres;

    @Column(name = "status")
    private Boolean status;

    @Column(name = "phonenum")
    private String phonenum;

    @Column(name = "email")
    private String email;

    @Column(name = "user_job")
    private String userJob;

    @Column(name = "user_pwd")
    private String userPwd;

    @Enumerated(EnumType.STRING)
    @Column(name = "role_user")
    private RoleUser roleUser;

}