package com.example.Project.services;

import java.util.HashMap;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class Helper {

    public static Map<String, String> extractOrderInfo(String input) {
        Map<String, String> orderInfo = new HashMap<>();
        // Regular expressions to match different parts of the input string
        Pattern orderPattern = Pattern.compile("(?i)(Partially|Fully) fulfilled Order (\\d+) at price = (\\d+) on volume = (\\d+) For user (\\d+) On Asset : (\\d+) with type : (bid|ask)");
        Matcher matcher = orderPattern.matcher(input);

        if (matcher.find()) {
            System.out.println("Found stuff");
            orderInfo.put("status", matcher.group(1));
            orderInfo.put("orderId", matcher.group(2));
            orderInfo.put("price", matcher.group(3));
            orderInfo.put("volume", matcher.group(4));
            orderInfo.put("userId", matcher.group(5));
            orderInfo.put("assetId", matcher.group(6));
            orderInfo.put("transactionType", matcher.group(7));
        }

        return orderInfo;
    }
}

