package com.edugestion.config;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.core.MongoTemplate;

@Configuration
public class MongoConfig {
    @Value("${spring.data.mongodb.uri:}")
    private String mongoUri;

    @Bean
    @ConditionalOnProperty(name = "spring.data.mongodb.uri")
    public MongoClient mongoClient() {
        return MongoClients.create(mongoUri);
    }

    @Bean
    @ConditionalOnProperty(name = "spring.data.mongodb.uri")
    public MongoTemplate mongoTemplate(MongoClient mongoClient) {
        return new MongoTemplate(mongoClient, extractDatabaseName(mongoUri));
    }

    private String extractDatabaseName(String uri) {
        int idx = uri.lastIndexOf('/');
        if (idx >= 0 && idx < uri.length() - 1) return uri.substring(idx + 1).split("\\?")[0];
        return "test";
    }
}

