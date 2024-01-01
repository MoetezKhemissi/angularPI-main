package com.example.Project.services.impl;

import com.example.Project.entities.Account;
import com.example.Project.repositories.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AccountService   {

    private final AccountRepository accountRepository;

    @Autowired
    public AccountService(AccountRepository accountRepository) {
        this.accountRepository = accountRepository;
    }


    public Account getById(long id) {
        Optional<Account> account = accountRepository.findById(id);
        return account.orElse(null);
    }


    public List<Account> getAllAccounts() {
        return (List<Account>) accountRepository.findAll();
    }


    public Account saveAccount(Account account) {
        return accountRepository.save(account);
    }


    public void deleteAccount(long id) {
        accountRepository.deleteById(id);
    }
    public Account updateAccount(Account updatedAccount) {
        // Check if the account with the given ID exists in the repository
        long id = updatedAccount.getAccountId();
        Optional<Account> existingAccountOptional = accountRepository.findById(id);

        if (existingAccountOptional.isPresent()) {
            Account existingAccount = existingAccountOptional.get();
            // Save the updated account to the repository
            return accountRepository.save(updatedAccount);
        } else {

            return null; // You can change this to an appropriate response.
        }
    }
}
