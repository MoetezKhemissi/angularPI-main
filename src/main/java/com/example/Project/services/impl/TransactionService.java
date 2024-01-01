package com.example.Project.services.impl;

import com.example.Project.dto.TransactionDTO;
import com.example.Project.entities.Transaction;
import com.example.Project.repositories.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class TransactionService {

    private final TransactionRepository transactionRepository;

    @Autowired
    public TransactionService(TransactionRepository transactionRepository) {
        this.transactionRepository = transactionRepository;
    }

    public List<Transaction> getAllTransactions() {
        return transactionRepository.findAll();
    }

    public Optional<Transaction> getTransactionById(Integer transactionId) {
        return transactionRepository.findById(transactionId);
    }

    public Transaction saveTransaction(Transaction transaction) {
        return transactionRepository.save(transaction);
    }

    public void deleteTransaction(Integer transactionId) {
        transactionRepository.deleteById(transactionId);
    }

    public List<TransactionDTO> getAllTransactionsByUserId(long userId) {
        return transactionRepository.findByAccount_AccountId(userId)
                .stream()
                .map(this::mapTransactionToDTO)
                .collect(Collectors.toList());
    }

    private TransactionDTO mapTransactionToDTO(Transaction transaction) {
        TransactionDTO transactionDTO = new TransactionDTO();
        transactionDTO.setTransactionAmount(transaction.getTransactionAmount());
        transactionDTO.setTransactionDate(transaction.getTransactionDate());
        transactionDTO.setTypeTransaction(transaction.getTypeTransaction());

        transactionDTO.setAssetName(transaction.getAsset().getAssetName());

        return transactionDTO;
    }
}