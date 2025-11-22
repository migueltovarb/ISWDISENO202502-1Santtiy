package com.vehiculos.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.data.mongodb.MongoDatabaseFactory;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.SimpleMongoClientDatabaseFactory;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoDatabase;

/**
 * Configuración alternativa para ejecutar sin MongoDB local.
 * Esta configuración crea una conexión simulada para pruebas.
 */
@Configuration
@Profile("embedded") // Activa este perfil con: -Dspring.profiles.active=embedded
public class EmbeddedMongoConfig {

    @Bean
    public MongoClient mongoClient() {
        // Para pruebas sin MongoDB, puedes usar una conexión simulada
        // o comentar esta configuración y usar la de Atlas
        try {
            return MongoClients.create("mongodb://localhost:27017");
        } catch (Exception e) {
            System.out.println("⚠️ MongoDB no está disponible. La aplicación se ejecutará en modo demo.");
            System.out.println("📋 Por favor, configura MongoDB siguiendo MONGODB_SETUP_GUIDE.md");
            throw new RuntimeException("MongoDB no está disponible. Por favor, configura una conexión válida.");
        }
    }

    @Bean
    public MongoDatabaseFactory mongoDatabaseFactory() {
        return new SimpleMongoClientDatabaseFactory(mongoClient(), "vehiculos_db");
    }

    @Bean
    public MongoTemplate mongoTemplate() {
        return new MongoTemplate(mongoDatabaseFactory());
    }
}