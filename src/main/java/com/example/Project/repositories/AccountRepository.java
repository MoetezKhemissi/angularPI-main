package com.example.Project.repositories;

import com.example.Project.entities.Account;

import org.springframework.data.repository.CrudRepository;

public interface AccountRepository extends CrudRepository<Account, Long> {

}
