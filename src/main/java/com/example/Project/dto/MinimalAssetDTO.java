package com.example.Project.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MinimalAssetDTO {
    private Long assetId;
    private String assetName;
    private String description;

    private Integer lastPrice;
}
