package com.example.Project.controllers;

import com.example.Project.dto.AssetRequest;
import com.example.Project.dto.MinimalAssetDTO;
import com.example.Project.entities.Asset;
import com.example.Project.services.impl.AssetService;
import com.example.Project.transientEntities.Order;
import com.example.Project.transientEntities.OrderBook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/assets")
public class AssetController {

    private final AssetService assetService;




    @Autowired
    public AssetController(AssetService assetService) {
        this.assetService = assetService;
    }

    @PostMapping
    public ResponseEntity<Asset> createAsset(@RequestBody AssetRequest assetRequest) {
        System.out.println(assetRequest);
        Asset asset = assetService.createAsset(assetRequest.getAssetName(), assetRequest.getDescription());
        return ResponseEntity.status(HttpStatus.CREATED).body(asset);
    }

    @GetMapping("/{assetId}")
    public ResponseEntity<Asset> getAsset(@PathVariable Long assetId) {
        Asset asset = assetService.getAssetById(assetId);
        if (asset != null) {
            return ResponseEntity.ok(asset);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{assetId}")
    public ResponseEntity<Asset> updateAsset(
            @PathVariable Long assetId,
            @RequestBody AssetRequest assetRequest) {
        Asset asset = assetService.updateAsset(assetId, assetRequest.getAssetName(), assetRequest.getDescription());
        if (asset != null) {
            return ResponseEntity.ok(asset);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    @GetMapping
    public ResponseEntity<List<Asset>> getAllAssets() {
        List<Asset> assets = assetService.getAllAssets();
        if (!assets.isEmpty()) {
            return ResponseEntity.ok(assets);
        } else {
            return ResponseEntity.noContent().build();
        }
    }

    @DeleteMapping("/{assetId}")
    public ResponseEntity<Void> deleteAsset(@PathVariable Long assetId) {
        assetService.deleteAsset(assetId);
        return ResponseEntity.noContent().build();
    }
    @GetMapping("/orders/{userId}")
    public ResponseEntity<List<Order>> getOrdersByUser(
            @PathVariable Long userId) {
        List<Order> list = assetService.GetOrdersByUser(userId);
        if (list != null) {
            return ResponseEntity.ok(list);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    @GetMapping("minimal")
    public ResponseEntity<List<MinimalAssetDTO>> getAllAssetsMinimal() {
        List<Asset> assets = assetService.getAllAssets();
        if (!assets.isEmpty()) {
            List<MinimalAssetDTO> assetDTOs = assets.stream()
                    .map(this::convertToAssetDTO) // Convert each Asset to AssetDTO
                    .collect(Collectors.toList());
            return ResponseEntity.ok(assetDTOs);
        } else {
            return ResponseEntity.noContent().build();
        }
    }
    @GetMapping("GetLastPrice/{assetId}")
    public ResponseEntity<Integer> GetLastPrice(@PathVariable Long assetId) {
        Asset asset = assetService.getAssetById(assetId);
        Integer lastPrice =asset.getOrderBook().getLastPrice();
        System.out.println("Last Price at :");
        System.out.println(lastPrice);


            return ResponseEntity.ok(asset.getOrderBook().getLastPrice());



    }
    private MinimalAssetDTO convertToAssetDTO(Asset asset) {
        MinimalAssetDTO assetDTO = new MinimalAssetDTO();
        assetDTO.setAssetId(asset.getAssetId());
        assetDTO.setAssetName(asset.getAssetName());
        assetDTO.setDescription(asset.getDescription());
        assetDTO.setLastPrice(asset.getOrderBook().getLastPrice());
        return assetDTO;
    }



    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler({IllegalArgumentException.class})
    public String handleBadRequestException(Exception ex) {
        return ex.getMessage();
    }

    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ExceptionHandler({ResourceNotFoundException.class})
    public String handleResourceNotFoundException(ResourceNotFoundException ex) {
        return ex.getMessage();
    }

    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    @ExceptionHandler({Exception.class})
    public String handleGeneralException(Exception ex) {
        return "An error occurred: " + ex.getMessage();
    }
}
