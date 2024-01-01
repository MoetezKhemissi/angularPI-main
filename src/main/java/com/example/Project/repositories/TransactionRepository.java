package com.example.Project.repositories;

import com.example.Project.entities.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TransactionRepository extends JpaRepository<Transaction, Integer> {

    List<Transaction> findByAccount_AccountId(long accountId);
}