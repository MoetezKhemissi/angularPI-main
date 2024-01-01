package com.example.Project.repositories;

import com.example.Project.entities.Account;
import com.example.Project.entities.AccountAssets;
import com.example.Project.entities.Asset;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AccountAssetsRepository extends JpaRepository<AccountAssets, Long> {
    AccountAssets findByAccountAndAsset(Account account, Asset asset);

    List<AccountAssets> findByAccount(Account account);
}