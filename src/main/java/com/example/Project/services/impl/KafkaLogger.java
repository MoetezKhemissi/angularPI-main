

package com.example.Project.services.impl;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
public class KafkaLogger {
    private static final Logger logger = LoggerFactory.getLogger(Logger.class);

    @KafkaListener(topics = "settled-order")
    public void logSettledOrders(String message) {
        logger.info("Received message from Kafka: " + message);

    }
}