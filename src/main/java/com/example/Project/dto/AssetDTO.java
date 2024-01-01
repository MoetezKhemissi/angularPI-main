package com.example.Project.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AssetDTO {
    private String assetName;
    private String assetDescription;
    private double assetVolumeOwned;



    public AssetDTO(String assetName, String assetDescription, double assetVolumeOwned) {
        this.assetName = assetName;
        this.assetDescription = assetDescription;
        this.assetVolumeOwned = assetVolumeOwned;
    }


}