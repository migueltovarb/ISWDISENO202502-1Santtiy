package com.vehiculos.service;

import com.vehiculos.entity.Vehiculo;
import com.vehiculos.exception.DuplicateResourceException;
import com.vehiculos.exception.ResourceNotFoundException;
import com.vehiculos.repository.VehiculoRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class VehiculoServiceImpl implements VehiculoService {
    
    private final VehiculoRepository vehiculoRepository;
    
    @Override
    @Transactional(readOnly = true)
    public List<Vehiculo> obtenerTodosVehiculos() {
        log.info("Obteniendo todos los vehículos");
        return vehiculoRepository.findAll();
    }
    
    @Override
    @Transactional(readOnly = true)
    public Optional<Vehiculo> obtenerVehiculoPorId(String id) {
        log.info("Obteniendo vehículo por ID: {}", id);
        return vehiculoRepository.findById(id);
    }
    
    @Override
    public Vehiculo guardarVehiculo(Vehiculo vehiculo) {
        log.info("Guardando nuevo vehículo: {} {}", vehiculo.getMarca(), vehiculo.getModelo());
        
        // Validar duplicados
        if (existePorPlaca(vehiculo.getPlaca())) {
            throw new DuplicateResourceException("Ya existe un vehículo con la placa: " + vehiculo.getPlaca());
        }
        
        if (existePorNumeroChasis(vehiculo.getNumeroChasis())) {
            throw new DuplicateResourceException("Ya existe un vehículo con el número de chasis: " + vehiculo.getNumeroChasis());
        }
        
        // Establecer fechas
        vehiculo.setFechaCreacion(LocalDateTime.now());
        vehiculo.setFechaActualizacion(LocalDateTime.now());
        vehiculo.setDisponible(true);
        
        Vehiculo vehiculoGuardado = vehiculoRepository.save(vehiculo);
        log.info("Vehículo guardado exitosamente con ID: {}", vehiculoGuardado.getId());
        return vehiculoGuardado;
    }
    
    @Override
    public Vehiculo actualizarVehiculo(String id, Vehiculo vehiculoActualizado) {
        log.info("Actualizando vehículo con ID: {}", id);
        
        Vehiculo vehiculoExistente = vehiculoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Vehículo no encontrado con ID: " + id));
        
        // Validar duplicados si se cambia la placa o número de chasis
        if (!vehiculoExistente.getPlaca().equals(vehiculoActualizado.getPlaca()) && 
            existePorPlaca(vehiculoActualizado.getPlaca())) {
            throw new DuplicateResourceException("Ya existe un vehículo con la placa: " + vehiculoActualizado.getPlaca());
        }
        
        if (!vehiculoExistente.getNumeroChasis().equals(vehiculoActualizado.getNumeroChasis()) && 
            existePorNumeroChasis(vehiculoActualizado.getNumeroChasis())) {
            throw new DuplicateResourceException("Ya existe un vehículo con el número de chasis: " + vehiculoActualizado.getNumeroChasis());
        }
        
        // Actualizar campos
        vehiculoExistente.setMarca(vehiculoActualizado.getMarca());
        vehiculoExistente.setModelo(vehiculoActualizado.getModelo());
        vehiculoExistente.setAnio(vehiculoActualizado.getAnio());
        vehiculoExistente.setNumeroChasis(vehiculoActualizado.getNumeroChasis());
        vehiculoExistente.setColor(vehiculoActualizado.getColor());
        vehiculoExistente.setTipoCombustible(vehiculoActualizado.getTipoCombustible());
        vehiculoExistente.setPrecio(vehiculoActualizado.getPrecio());
        vehiculoExistente.setPlaca(vehiculoActualizado.getPlaca());
        vehiculoExistente.setDisponible(vehiculoActualizado.getDisponible());
        vehiculoExistente.setDescripcion(vehiculoActualizado.getDescripcion());
        vehiculoExistente.setFechaActualizacion(LocalDateTime.now());
        
        Vehiculo vehiculoActualizadoGuardado = vehiculoRepository.save(vehiculoExistente);
        log.info("Vehículo actualizado exitosamente");
        return vehiculoActualizadoGuardado;
    }
    
    @Override
    public void eliminarVehiculo(String id) {
        log.info("Eliminando vehículo con ID: {}", id);
        
        if (!vehiculoRepository.existsById(id)) {
            throw new ResourceNotFoundException("Vehículo no encontrado con ID: " + id);
        }
        
        vehiculoRepository.deleteById(id);
        log.info("Vehículo eliminado exitosamente");
    }
    
    @Override
    @Transactional(readOnly = true)
    public List<Vehiculo> buscarPorMarca(String marca) {
        log.info("Buscando vehículos por marca: {}", marca);
        return vehiculoRepository.findByMarcaContainingIgnoreCase(marca);
    }
    
    @Override
    @Transactional(readOnly = true)
    public List<Vehiculo> buscarPorModelo(String modelo) {
        log.info("Buscando vehículos por modelo: {}", modelo);
        return vehiculoRepository.findByModeloContainingIgnoreCase(modelo);
    }
    
    @Override
    @Transactional(readOnly = true)
    public List<Vehiculo> buscarPorAnio(Integer anio) {
        log.info("Buscando vehículos por año: {}", anio);
        return vehiculoRepository.findByAnio(anio);
    }
    
    @Override
    @Transactional(readOnly = true)
    public List<Vehiculo> buscarPorRangoAnios(Integer anioInicio, Integer anioFin) {
        log.info("Buscando vehículos por rango de años: {} - {}", anioInicio, anioFin);
        return vehiculoRepository.findByAnioBetween(anioInicio, anioFin);
    }
    
    @Override
    @Transactional(readOnly = true)
    public List<Vehiculo> buscarPorColor(String color) {
        log.info("Buscando vehículos por color: {}", color);
        return vehiculoRepository.findByColorContainingIgnoreCase(color);
    }
    
    @Override
    @Transactional(readOnly = true)
    public List<Vehiculo> buscarPorTipoCombustible(String tipoCombustible) {
        log.info("Buscando vehículos por tipo de combustible: {}", tipoCombustible);
        return vehiculoRepository.findByTipoCombustibleContainingIgnoreCase(tipoCombustible);
    }
    
    @Override
    @Transactional(readOnly = true)
    public List<Vehiculo> buscarPorDisponibilidad(Boolean disponible) {
        log.info("Buscando vehículos por disponibilidad: {}", disponible);
        return vehiculoRepository.findByDisponible(disponible);
    }
    
    @Override
    @Transactional(readOnly = true)
    public Optional<Vehiculo> buscarPorPlaca(String placa) {
        log.info("Buscando vehículo por placa: {}", placa);
        return vehiculoRepository.findByPlaca(placa);
    }
    
    @Override
    @Transactional(readOnly = true)
    public Optional<Vehiculo> buscarPorNumeroChasis(String numeroChasis) {
        log.info("Buscando vehículo por número de chasis: {}", numeroChasis);
        return vehiculoRepository.findByNumeroChasis(numeroChasis);
    }
    
    @Override
    @Transactional(readOnly = true)
    public List<Vehiculo> buscarPorRangoPrecios(BigDecimal precioMin, BigDecimal precioMax) {
        log.info("Buscando vehículos por rango de precios: {} - {}", precioMin, precioMax);
        return vehiculoRepository.findByPrecioBetween(precioMin, precioMax);
    }
    
    @Override
    @Transactional(readOnly = true)
    public List<Vehiculo> buscarPorPrecioMaximo(BigDecimal precioMax) {
        log.info("Buscando vehículos con precio máximo: {}", precioMax);
        return vehiculoRepository.findByPrecioLessThanEqual(precioMax);
    }
    
    @Override
    @Transactional(readOnly = true)
    public List<Vehiculo> buscarPorPrecioMinimo(BigDecimal precioMin) {
        log.info("Buscando vehículos con precio mínimo: {}", precioMin);
        return vehiculoRepository.findByPrecioGreaterThanEqual(precioMin);
    }
    
    @Override
    @Transactional(readOnly = true)
    public List<Vehiculo> buscarPorMarcaYModelo(String marca, String modelo) {
        log.info("Buscando vehículos por marca: {} y modelo: {}", marca, modelo);
        return vehiculoRepository.findByMarcaAndModeloContainingIgnoreCase(marca, modelo);
    }
    
    @Override
    @Transactional(readOnly = true)
    public boolean existePorPlaca(String placa) {
        return vehiculoRepository.existsByPlaca(placa);
    }
    
    @Override
    @Transactional(readOnly = true)
    public boolean existePorNumeroChasis(String numeroChasis) {
        return vehiculoRepository.existsByNumeroChasis(numeroChasis);
    }
    
    @Override
    @Transactional(readOnly = true)
    public long contarPorMarca(String marca) {
        return vehiculoRepository.countByMarca(marca);
    }
    
    @Override
    @Transactional(readOnly = true)
    public long contarPorDisponibilidad(Boolean disponible) {
        return vehiculoRepository.countByDisponible(disponible);
    }
    
    @Override
    @Transactional(readOnly = true)
    public List<Vehiculo> buscarPorPlacaConteniendo(String placa) {
        log.info("Buscando vehículos por placa conteniendo: {}", placa);
        return vehiculoRepository.findByPlacaContainingIgnoreCase(placa);
    }
    
    @Override
    @Transactional(readOnly = true)
    public List<Vehiculo> buscarPorMarcaOrdenarPorPrecioAsc(String marca) {
        log.info("Buscando vehículos por marca: {} ordenados por precio ascendente", marca);
        return vehiculoRepository.findByMarcaOrderByPrecioAsc(marca);
    }
    
    @Override
    @Transactional(readOnly = true)
    public List<Vehiculo> buscarPorMarcaOrdenarPorPrecioDesc(String marca) {
        log.info("Buscando vehículos por marca: {} ordenados por precio descendente", marca);
        return vehiculoRepository.findByMarcaOrderByPrecioDesc(marca);
    }
}