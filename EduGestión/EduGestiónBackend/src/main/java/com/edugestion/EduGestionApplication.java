package com.edugestion;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.mongo.MongoAutoConfiguration;

@SpringBootApplication(exclude = {MongoAutoConfiguration.class})
public class EduGestionApplication {
    public static void main(String[] args) {
        SpringApplication.run(EduGestionApplication.class, args);
    }
}

