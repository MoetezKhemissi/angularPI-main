package com.example.Project.controllers;


import com.example.Project.dto.AccountAssetUpdateRequest;
import com.example.Project.dto.AssetDTO;
import com.example.Project.entities.Account;
import com.example.Project.entities.Asset;
import com.example.Project.services.impl.AccountAssetService;
import com.example.Project.services.impl.AccountService;
import com.example.Project.services.impl.AssetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/account-assets")
public class AccountAssetsController {

    private final AccountAssetService accountAssetsService;
    private final AccountService accountService;

    private final AssetService assetService;

    @Autowired
    public AccountAssetsController(AccountAssetService accountAssetsService, AccountService accountService, AssetService assetService) {
        this.accountAssetsService = accountAssetsService;
        this.accountService = accountService;
        this.assetService = assetService;
    }

    @PostMapping("/update")
    public ResponseEntity<String> updateAccountAsset(@RequestBody AccountAssetUpdateRequest request) {
        try {
            Account account = accountService.getById(request.getAccountId());

            if (account != null ) {
                accountAssetsService.updateAccountAsset(account, request.getAssetId(), request.getAmount());
                return new ResponseEntity<>("Operation successful", HttpStatus.OK);
            } else {
                return new ResponseEntity<>("Account or Asset not found", HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
    @GetMapping("/account/{accountId}")
    public ResponseEntity<List<AssetDTO>> getAssetsForAccount(@PathVariable("accountId") long accountId) {
        try {
            List<AssetDTO> assetDTOList = accountAssetsService.getAssetsForAccount(accountId);
            return new ResponseEntity<>(assetDTOList, HttpStatus.OK);
        } catch (Exception e) {
            // Handle exceptions, maybe log the error
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}