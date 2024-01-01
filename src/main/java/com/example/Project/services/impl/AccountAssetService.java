package com.example.Project.services.impl;

import com.example.Project.dto.AssetDTO;
import com.example.Project.entities.Account;
import com.example.Project.entities.AccountAssets;
import com.example.Project.entities.Asset;
import com.example.Project.repositories.AccountAssetsRepository;
import com.example.Project.repositories.AccountRepository;
import com.example.Project.repositories.AssetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
public class AccountAssetService {

    private final AccountAssetsRepository accountAssetsRepository;

    private final AssetRepository assetRepository;

    private final AccountRepository accountRepository;

    @Autowired
    public AccountAssetService(AccountAssetsRepository accountAssetsRepository, AssetRepository assetRepository, AccountRepository accountRepository) {
        this.accountAssetsRepository = accountAssetsRepository;
        this.assetRepository = assetRepository;
        this.accountRepository = accountRepository;
    }
    public List<AssetDTO> getAssetsForAccount(long accountId) {
        List<AssetDTO> assetDTOList = new ArrayList<>();
        Account account = accountRepository.findById(accountId).get();
        List<AccountAssets> accountAssets = accountAssetsRepository.findByAccount(account);
        for (AccountAssets accountAsset : accountAssets) {
            Asset asset = accountAsset.getAsset();
            String assetName = asset.getAssetName();
            String assetDescription = asset.getDescription();
            double assetVolumeOwned = accountAsset.getAmount();

            AssetDTO assetDTO = new AssetDTO(assetName, assetDescription, assetVolumeOwned);
            assetDTOList.add(assetDTO);
        }

        return assetDTOList;
    }

    @Transactional(rollbackFor = Exception.class)
    public void updateAccountAsset(Account account, long assetId, double amount) throws Exception {
        Asset asset = assetRepository.findById(assetId).get();
        AccountAssets accountAsset = accountAssetsRepository.findByAccountAndAsset(account, asset);

        if (accountAsset == null) {
            if (amount > 0) {
                accountAsset = new AccountAssets();
                accountAsset.setAccount(account);
                accountAsset.setAsset(asset);
                accountAsset.setAmount(amount);
                accountAssetsRepository.save(accountAsset);
            } else {
                throw new Exception("Amount should be positive for adding a new entry.");
            }
        } else {
            double updatedAmount = accountAsset.getAmount() + amount;
            if (updatedAmount == 0) {
                accountAssetsRepository.delete(accountAsset);
            } else if (updatedAmount < 0) {
                throw new Exception("Subtracting this amount would result in a negative balance.");
            } else {
                accountAsset.setAmount(updatedAmount);
                accountAssetsRepository.save(accountAsset);
            }
        }
    }
}