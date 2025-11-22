package com.vehiculos.repository;

import com.vehiculos.entity.Vehiculo;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Repository
public interface VehiculoRepository extends MongoRepository<Vehiculo, String> {
    
    // Buscar por marca
    List<Vehiculo> findByMarcaContainingIgnoreCase(String marca);
    
    // Buscar por modelo
    List<Vehiculo> findByModeloContainingIgnoreCase(String modelo);
    
    // Buscar por año
    List<Vehiculo> findByAnio(Integer anio);
    
    // Buscar por rango de años
    List<Vehiculo> findByAnioBetween(Integer anioInicio, Integer anioFin);
    
    // Buscar por color
    List<Vehiculo> findByColorContainingIgnoreCase(String color);
    
    // Buscar por tipo de combustible
    List<Vehiculo> findByTipoCombustibleContainingIgnoreCase(String tipoCombustible);
    
    // Buscar por disponibilidad
    List<Vehiculo> findByDisponible(Boolean disponible);
    
    // Buscar por placa (exacta)
    Optional<Vehiculo> findByPlaca(String placa);
    
    // Buscar por número de chasis (exacto)
    Optional<Vehiculo> findByNumeroChasis(String numeroChasis);
    
    // Buscar por rango de precios
    List<Vehiculo> findByPrecioBetween(BigDecimal precioMin, BigDecimal precioMax);
    
    // Buscar vehículos con precio menor o igual a
    List<Vehiculo> findByPrecioLessThanEqual(BigDecimal precioMax);
    
    // Buscar vehículos con precio mayor o igual a
    List<Vehiculo> findByPrecioGreaterThanEqual(BigDecimal precioMin);
    
    // Buscar por marca y modelo
    List<Vehiculo> findByMarcaAndModeloContainingIgnoreCase(String marca, String modelo);
    
    // Verificar si existe un vehículo con una placa específica
    Boolean existsByPlaca(String placa);
    
    // Verificar si existe un vehículo con un número de chasis específico
    Boolean existsByNumeroChasis(String numeroChasis);
    
    // Contar vehículos por marca
    Long countByMarca(String marca);
    
    // Contar vehículos por disponibilidad
    Long countByDisponible(Boolean disponible);
    
    // Buscar vehículos con placa que contenga el texto
    List<Vehiculo> findByPlacaContainingIgnoreCase(String placa);
    
    // Buscar vehículos por marca ordenados por precio ascendente
    List<Vehiculo> findByMarcaOrderByPrecioAsc(String marca);
    
    // Buscar vehículos por marca ordenados por precio descendente
    List<Vehiculo> findByMarcaOrderByPrecioDesc(String marca);
}