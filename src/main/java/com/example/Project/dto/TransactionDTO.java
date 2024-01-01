package com.example.Project.dto;

import com.example.Project.enums.TypeTransaction;
import lombok.Getter;
import lombok.Setter;
import java.util.Date;

@Getter
@Setter
public class TransactionDTO {
    private Float transactionAmount;
    private Date transactionDate;
    private TypeTransaction typeTransaction;
    private String assetName;


}