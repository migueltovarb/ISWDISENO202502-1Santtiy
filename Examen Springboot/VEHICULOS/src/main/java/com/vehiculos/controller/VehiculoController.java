package com.vehiculos.controller;

import com.vehiculos.entity.Vehiculo;
import com.vehiculos.exception.DuplicateResourceException;
import com.vehiculos.exception.ResourceNotFoundException;
import com.vehiculos.service.VehiculoService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/vehiculos")
@RequiredArgsConstructor
@Slf4j
@Validated
@CrossOrigin(origins = "*")
public class VehiculoController {
    
    private final VehiculoService vehiculoService;
    
    // CRUD básico
    
    @GetMapping
    public ResponseEntity<List<Vehiculo>> obtenerTodosVehiculos() {
        log.info("GET /api/vehiculos - Obteniendo todos los vehículos");
        List<Vehiculo> vehiculos = vehiculoService.obtenerTodosVehiculos();
        return ResponseEntity.ok(vehiculos);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Vehiculo> obtenerVehiculoPorId(@PathVariable String id) {
        log.info("GET /api/vehiculos/{} - Obteniendo vehículo por ID", id);
        Optional<Vehiculo> vehiculo = vehiculoService.obtenerVehiculoPorId(id);
        return vehiculo.map(ResponseEntity::ok)
                      .orElseThrow(() -> new ResourceNotFoundException("Vehículo no encontrado con ID: " + id));
    }
    
    @PostMapping
    public ResponseEntity<Vehiculo> guardarVehiculo(@Valid @RequestBody Vehiculo vehiculo) {
        log.info("POST /api/vehiculos - Guardando nuevo vehículo");
        Vehiculo vehiculoGuardado = vehiculoService.guardarVehiculo(vehiculo);
        return ResponseEntity.status(HttpStatus.CREATED).body(vehiculoGuardado);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Vehiculo> actualizarVehiculo(@PathVariable String id, @Valid @RequestBody Vehiculo vehiculo) {
        log.info("PUT /api/vehiculos/{} - Actualizando vehículo", id);
        Vehiculo vehiculoActualizado = vehiculoService.actualizarVehiculo(id, vehiculo);
        return ResponseEntity.ok(vehiculoActualizado);
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, String>> eliminarVehiculo(@PathVariable String id) {
        log.info("DELETE /api/vehiculos/{} - Eliminando vehículo", id);
        vehiculoService.eliminarVehiculo(id);
        Map<String, String> response = new HashMap<>();
        response.put("mensaje", "Vehículo eliminado exitosamente");
        response.put("id", id);
        return ResponseEntity.ok(response);
    }
    
    // Búsquedas personalizadas
    
    @GetMapping("/buscar/marca/{marca}")
    public ResponseEntity<List<Vehiculo>> buscarPorMarca(@PathVariable String marca) {
        log.info("GET /api/vehiculos/buscar/marca/{} - Buscando por marca", marca);
        List<Vehiculo> vehiculos = vehiculoService.buscarPorMarca(marca);
        return ResponseEntity.ok(vehiculos);
    }
    
    @GetMapping("/buscar/modelo/{modelo}")
    public ResponseEntity<List<Vehiculo>> buscarPorModelo(@PathVariable String modelo) {
        log.info("GET /api/vehiculos/buscar/modelo/{} - Buscando por modelo", modelo);
        List<Vehiculo> vehiculos = vehiculoService.buscarPorModelo(modelo);
        return ResponseEntity.ok(vehiculos);
    }
    
    @GetMapping("/buscar/anio/{anio}")
    public ResponseEntity<List<Vehiculo>> buscarPorAnio(@PathVariable Integer anio) {
        log.info("GET /api/vehiculos/buscar/anio/{} - Buscando por año", anio);
        List<Vehiculo> vehiculos = vehiculoService.buscarPorAnio(anio);
        return ResponseEntity.ok(vehiculos);
    }
    
    @GetMapping("/buscar/rango-anios")
    public ResponseEntity<List<Vehiculo>> buscarPorRangoAnios(
            @RequestParam Integer anioInicio,
            @RequestParam Integer anioFin) {
        log.info("GET /api/vehiculos/buscar/rango-anios - Buscando por rango de años: {} - {}", anioInicio, anioFin);
        List<Vehiculo> vehiculos = vehiculoService.buscarPorRangoAnios(anioInicio, anioFin);
        return ResponseEntity.ok(vehiculos);
    }
    
    @GetMapping("/buscar/color/{color}")
    public ResponseEntity<List<Vehiculo>> buscarPorColor(@PathVariable String color) {
        log.info("GET /api/vehiculos/buscar/color/{} - Buscando por color", color);
        List<Vehiculo> vehiculos = vehiculoService.buscarPorColor(color);
        return ResponseEntity.ok(vehiculos);
    }
    
    @GetMapping("/buscar/combustible/{tipoCombustible}")
    public ResponseEntity<List<Vehiculo>> buscarPorTipoCombustible(@PathVariable String tipoCombustible) {
        log.info("GET /api/vehiculos/buscar/combustible/{} - Buscando por tipo de combustible", tipoCombustible);
        List<Vehiculo> vehiculos = vehiculoService.buscarPorTipoCombustible(tipoCombustible);
        return ResponseEntity.ok(vehiculos);
    }
    
    @GetMapping("/buscar/disponibilidad/{disponible}")
    public ResponseEntity<List<Vehiculo>> buscarPorDisponibilidad(@PathVariable Boolean disponible) {
        log.info("GET /api/vehiculos/buscar/disponibilidad/{} - Buscando por disponibilidad", disponible);
        List<Vehiculo> vehiculos = vehiculoService.buscarPorDisponibilidad(disponible);
        return ResponseEntity.ok(vehiculos);
    }
    
    @GetMapping("/buscar/placa/{placa}")
    public ResponseEntity<Vehiculo> buscarPorPlaca(@PathVariable String placa) {
        log.info("GET /api/vehiculos/buscar/placa/{} - Buscando por placa", placa);
        Optional<Vehiculo> vehiculo = vehiculoService.buscarPorPlaca(placa);
        return vehiculo.map(ResponseEntity::ok)
                      .orElseThrow(() -> new ResourceNotFoundException("Vehículo no encontrado con placa: " + placa));
    }
    
    @GetMapping("/buscar/chasis/{numeroChasis}")
    public ResponseEntity<Vehiculo> buscarPorNumeroChasis(@PathVariable String numeroChasis) {
        log.info("GET /api/vehiculos/buscar/chasis/{} - Buscando por número de chasis", numeroChasis);
        Optional<Vehiculo> vehiculo = vehiculoService.buscarPorNumeroChasis(numeroChasis);
        return vehiculo.map(ResponseEntity::ok)
                      .orElseThrow(() -> new ResourceNotFoundException("Vehículo no encontrado con número de chasis: " + numeroChasis));
    }
    
    @GetMapping("/buscar/rango-precios")
    public ResponseEntity<List<Vehiculo>> buscarPorRangoPrecios(
            @RequestParam BigDecimal precioMin,
            @RequestParam BigDecimal precioMax) {
        log.info("GET /api/vehiculos/buscar/rango-precios - Buscando por rango de precios: {} - {}", precioMin, precioMax);
        List<Vehiculo> vehiculos = vehiculoService.buscarPorRangoPrecios(precioMin, precioMax);
        return ResponseEntity.ok(vehiculos);
    }
    
    @GetMapping("/buscar/precio-maximo")
    public ResponseEntity<List<Vehiculo>> buscarPorPrecioMaximo(@RequestParam BigDecimal precioMax) {
        log.info("GET /api/vehiculos/buscar/precio-maximo - Buscando por precio máximo: {}", precioMax);
        List<Vehiculo> vehiculos = vehiculoService.buscarPorPrecioMaximo(precioMax);
        return ResponseEntity.ok(vehiculos);
    }
    
    @GetMapping("/buscar/precio-minimo")
    public ResponseEntity<List<Vehiculo>> buscarPorPrecioMinimo(@RequestParam BigDecimal precioMin) {
        log.info("GET /api/vehiculos/buscar/precio-minimo - Buscando por precio mínimo: {}", precioMin);
        List<Vehiculo> vehiculos = vehiculoService.buscarPorPrecioMinimo(precioMin);
        return ResponseEntity.ok(vehiculos);
    }
    
    @GetMapping("/buscar/marca-modelo")
    public ResponseEntity<List<Vehiculo>> buscarPorMarcaYModelo(
            @RequestParam String marca,
            @RequestParam String modelo) {
        log.info("GET /api/vehiculos/buscar/marca-modelo - Buscando por marca: {} y modelo: {}", marca, modelo);
        List<Vehiculo> vehiculos = vehiculoService.buscarPorMarcaYModelo(marca, modelo);
        return ResponseEntity.ok(vehiculos);
    }
    
    @GetMapping("/buscar/placa-conteniendo")
    public ResponseEntity<List<Vehiculo>> buscarPorPlacaConteniendo(@RequestParam String placa) {
        log.info("GET /api/vehiculos/buscar/placa-conteniendo - Buscando por placa conteniendo: {}", placa);
        List<Vehiculo> vehiculos = vehiculoService.buscarPorPlacaConteniendo(placa);
        return ResponseEntity.ok(vehiculos);
    }
    
    @GetMapping("/buscar/marca-orden-precio")
    public ResponseEntity<List<Vehiculo>> buscarPorMarcaOrdenarPorPrecio(
            @RequestParam String marca,
            @RequestParam(defaultValue = "asc") String orden) {
        log.info("GET /api/vehiculos/buscar/marca-orden-precio - Buscando por marca: {} ordenado por precio: {}", marca, orden);
        List<Vehiculo> vehiculos;
        if ("desc".equalsIgnoreCase(orden)) {
            vehiculos = vehiculoService.buscarPorMarcaOrdenarPorPrecioDesc(marca);
        } else {
            vehiculos = vehiculoService.buscarPorMarcaOrdenarPorPrecioAsc(marca);
        }
        return ResponseEntity.ok(vehiculos);
    }
    
    // Estadísticas
    
    @GetMapping("/estadisticas/existe-placa")
    public ResponseEntity<Map<String, Boolean>> existePorPlaca(@RequestParam String placa) {
        log.info("GET /api/vehiculos/estadisticas/existe-placa - Verificando existencia de placa: {}", placa);
        boolean existe = vehiculoService.existePorPlaca(placa);
        Map<String, Boolean> response = new HashMap<>();
        response.put("existe", existe);
        return ResponseEntity.ok(response);
    }
    
    @GetMapping("/estadisticas/existe-chasis")
    public ResponseEntity<Map<String, Boolean>> existePorNumeroChasis(@RequestParam String numeroChasis) {
        log.info("GET /api/vehiculos/estadisticas/existe-chasis - Verificando existencia de chasis: {}", numeroChasis);
        boolean existe = vehiculoService.existePorNumeroChasis(numeroChasis);
        Map<String, Boolean> response = new HashMap<>();
        response.put("existe", existe);
        return ResponseEntity.ok(response);
    }
    
    @GetMapping("/estadisticas/contar-marca")
    public ResponseEntity<Map<String, Long>> contarPorMarca(@RequestParam String marca) {
        log.info("GET /api/vehiculos/estadisticas/contar-marca - Contando vehículos por marca: {}", marca);
        long cantidad = vehiculoService.contarPorMarca(marca);
        Map<String, Long> response = new HashMap<>();
        response.put("cantidad", cantidad);
        return ResponseEntity.ok(response);
    }
    
    @GetMapping("/estadisticas/contar-disponibilidad")
    public ResponseEntity<Map<String, Long>> contarPorDisponibilidad(@RequestParam Boolean disponible) {
        log.info("GET /api/vehiculos/estadisticas/contar-disponibilidad - Contando vehículos por disponibilidad: {}", disponible);
        long cantidad = vehiculoService.contarPorDisponibilidad(disponible);
        Map<String, Long> response = new HashMap<>();
        response.put("cantidad", cantidad);
        return ResponseEntity.ok(response);
    }
}