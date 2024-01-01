package com.example.Project.services.impl;

import org.apache.kafka.clients.producer.ProducerConfig;
import org.apache.kafka.common.serialization.StringSerializer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.kafka.core.DefaultKafkaProducerFactory;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.kafka.core.ProducerFactory;

import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class KafkaSender {

    private final KafkaTemplate<String, String> kafkaTemplate;


    private String topicName;

    @Autowired
    public KafkaSender() {

        ProducerFactory<String, String> producerFactory = new DefaultKafkaProducerFactory<>(producerConfigs());
        this.kafkaTemplate = new KafkaTemplate<>(producerFactory);
        this.topicName="settled-order";
    }

    public void send(String topicName,String message) {

        System.out.println(topicName);
        kafkaTemplate.send(topicName, message);
    }

    private Map<String, Object> producerConfigs() {
        Map<String, Object> props = new HashMap<>();
        props.put(ProducerConfig.BOOTSTRAP_SERVERS_CONFIG, "localhost:9092");
        props.put(ProducerConfig.KEY_SERIALIZER_CLASS_CONFIG, StringSerializer.class.getName());
        props.put(ProducerConfig.VALUE_SERIALIZER_CLASS_CONFIG, StringSerializer.class.getName());
        return props;
    }
}