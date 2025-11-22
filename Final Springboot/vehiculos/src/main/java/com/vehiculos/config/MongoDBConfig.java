package com.vehiculos.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

import com.vehiculos.entity.Vehiculo;
import com.vehiculos.repository.VehiculoRepository;

import java.math.BigDecimal;

@Configuration
@EnableMongoRepositories(basePackages = "com.vehiculos.repository")
public class MongoDBConfig {

    @Bean
    @Profile("!test") // Solo ejecutar si no es perfil de prueba
    public CommandLineRunner initData(VehiculoRepository repository) {
        return args -> {
            // Verificar si ya hay datos
            if (repository.count() == 0) {
                System.out.println("🚗 Inicializando datos de prueba...");
                
                // Crear vehículos de ejemplo
                Vehiculo v1 = new Vehiculo("Toyota", "Corolla", 2022, "ABC12345678901234", "Blanco", "Gasolina", new BigDecimal("25000.00"), "ABC-123");
                v1.setDisponible(true);
                v1.setDescripcion("Sedán económico y confiable");
                
                Vehiculo v2 = new Vehiculo("Honda", "Civic", 2023, "DEF12345678901234", "Negro", "Gasolina", new BigDecimal("28000.00"), "DEF-456");
                v2.setDisponible(true);
                v2.setDescripcion("Sedán deportivo con excelente rendimiento");
                
                Vehiculo v3 = new Vehiculo("Ford", "F-150", 2021, "GHI12345678901234", "Azul", "Gasolina", new BigDecimal("45000.00"), "GHI-789");
                v3.setDisponible(false);
                v3.setDescripcion("Camioneta pickup potente para trabajo pesado");
                
                Vehiculo v4 = new Vehiculo("Tesla", "Model 3", 2023, "JKL12345678901234", "Rojo", "Eléctrico", new BigDecimal("55000.00"), "JKL-012");
                v4.setDisponible(true);
                v4.setDescripcion("Vehículo eléctrico de alta tecnología");
                
                // Guardar en la base de datos
                repository.save(v1);
                repository.save(v2);
                repository.save(v3);
                repository.save(v4);
                
                System.out.println("✅ Datos de prueba inicializados correctamente!");
                System.out.println("📊 Total de vehículos: " + repository.count());
            } else {
                System.out.println("📊 Base de datos ya contiene " + repository.count() + " vehículos");
            }
        };
    }
}