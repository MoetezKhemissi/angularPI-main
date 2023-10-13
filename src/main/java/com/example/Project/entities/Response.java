package com.example.Project.entities;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.Hibernate;

import javax.persistence.*;
import java.util.Objects;

@Getter
@Setter
@Entity
@Table(name = "response")
public class Response {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "responseId", nullable = false)
    private Integer responseId;

    @Column(name = "response_txt")
    private String responseTxt;

    @ManyToOne
    @JoinColumn(name = "question_question_id")
    private Question question;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        Response response = (Response) o;
        return getResponseId() != null && Objects.equals(getResponseId(), response.getResponseId());
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}