package com.vehiculos.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

/**
 * Configuración de demostración para mostrar cómo funciona la API
 * sin necesidad de MongoDB real durante la configuración inicial.
 * 
 * Esta configuración solo se activa con el perfil "demo"
 * mvn spring-boot:run -Dspring.profiles.active=demo
 */
@Configuration
@Profile("demo")
public class DemoConfig {

    @Bean
    public CommandLineRunner demoInfo() {
        return args -> {
            System.out.println("🚗 ======================================");
            System.out.println("🚗 API CRUD DE VEHÍCULOS - MODO DEMO");
            System.out.println("🚗 ======================================");
            System.out.println("");
            System.out.println("📋 PARA CONFIGURAR MONGODB ATLAS:");
            System.out.println("1. Ve a: https://www.mongodb.com/cloud/atlas");
            System.out.println("2. Crea una cuenta gratuita");
            System.out.println("3. Crea un cluster M0 (gratis)");
            System.out.println("4. Crea un usuario de base de datos");
            System.out.println("5. Configura acceso de red (tu IP)");
            System.out.println("6. Obtén tu cadena de conexión");
            System.out.println("");
            System.out.println("📋 EJEMPLOS DE ENDPOINTS DISPONIBLES:");
            System.out.println("GET  http://localhost:8080/api/vehiculos");
            System.out.println("POST http://localhost:8080/api/vehiculos");
            System.out.println("GET  http://localhost:8080/api/vehiculos/buscar/marca/Toyota");
            System.out.println("GET  http://localhost:8080/api/vehiculos/buscar/disponibilidad/true");
            System.out.println("");
            System.out.println("📋 PARA PROBAR CON CURL:");
            System.out.println("curl http://localhost:8080/api/vehiculos");
            System.out.println("");
            System.out.println("📋 UNA VEZ CONFIGURADO MONGODB:");
            System.out.println("Actualiza application.properties con tu URI");
            System.out.println("Ejecuta: mvn spring-boot:run");
            System.out.println("🚗 ======================================");
        };
    }
}