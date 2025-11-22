package com.vehiculos.service;

import com.vehiculos.entity.Vehiculo;
import java.util.List;
import java.util.Optional;
import java.math.BigDecimal;

public interface VehiculoService {
    
    // CRUD básico
    List<Vehiculo> obtenerTodosVehiculos();
    
    Optional<Vehiculo> obtenerVehiculoPorId(String id);
    
    Vehiculo guardarVehiculo(Vehiculo vehiculo);
    
    Vehiculo actualizarVehiculo(String id, Vehiculo vehiculo);
    
    void eliminarVehiculo(String id);
    
    // Búsquedas personalizadas
    List<Vehiculo> buscarPorMarca(String marca);
    
    List<Vehiculo> buscarPorModelo(String modelo);
    
    List<Vehiculo> buscarPorAnio(Integer anio);
    
    List<Vehiculo> buscarPorRangoAnios(Integer anioInicio, Integer anioFin);
    
    List<Vehiculo> buscarPorColor(String color);
    
    List<Vehiculo> buscarPorTipoCombustible(String tipoCombustible);
    
    List<Vehiculo> buscarPorDisponibilidad(Boolean disponible);
    
    Optional<Vehiculo> buscarPorPlaca(String placa);
    
    Optional<Vehiculo> buscarPorNumeroChasis(String numeroChasis);
    
    List<Vehiculo> buscarPorRangoPrecios(BigDecimal precioMin, BigDecimal precioMax);
    
    List<Vehiculo> buscarPorPrecioMaximo(BigDecimal precioMax);
    
    List<Vehiculo> buscarPorPrecioMinimo(BigDecimal precioMin);
    
    List<Vehiculo> buscarPorMarcaYModelo(String marca, String modelo);
    
    // Métodos de utilidad
    boolean existePorPlaca(String placa);
    
    boolean existePorNumeroChasis(String numeroChasis);
    
    long contarPorMarca(String marca);
    
    long contarPorDisponibilidad(Boolean disponible);
    
    List<Vehiculo> buscarPorPlacaConteniendo(String placa);
    
    List<Vehiculo> buscarPorMarcaOrdenarPorPrecioAsc(String marca);
    
    List<Vehiculo> buscarPorMarcaOrdenarPorPrecioDesc(String marca);
}