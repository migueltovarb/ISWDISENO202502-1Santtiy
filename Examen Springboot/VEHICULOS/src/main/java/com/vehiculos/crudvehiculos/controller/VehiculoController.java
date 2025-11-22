package com.vehiculos.crudvehiculos.controller;

import com.vehiculos.crudvehiculos.model.Vehiculo;
import com.vehiculos.crudvehiculos.service.VehiculoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/vehiculos")
@CrossOrigin(origins = "*")
public class VehiculoController {

    @Autowired
    private VehiculoService vehiculoService;

    @GetMapping
    public ResponseEntity<List<Vehiculo>> getAllVehiculos() {
        return ResponseEntity.ok(vehiculoService.getAllVehiculos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Vehiculo> getVehiculoById(@PathVariable String id) {
        return vehiculoService.getVehiculoById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/placa/{placa}")
    public ResponseEntity<Vehiculo> getVehiculoByPlaca(@PathVariable String placa) {
        return vehiculoService.getVehiculoByPlaca(placa)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/marca/{marca}")
    public ResponseEntity<List<Vehiculo>> getVehiculosByMarca(@PathVariable String marca) {
        return ResponseEntity.ok(vehiculoService.getVehiculosByMarca(marca));
    }

    @PostMapping
    public ResponseEntity<Vehiculo> createVehiculo(@Valid @RequestBody Vehiculo vehiculo) {
        Vehiculo newVehiculo = vehiculoService.createVehiculo(vehiculo);
        return ResponseEntity.status(HttpStatus.CREATED).body(newVehiculo);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Vehiculo> updateVehiculo(
            @PathVariable String id, 
            @Valid @RequestBody Vehiculo vehiculoDetails) {
        return vehiculoService.updateVehiculo(id, vehiculoDetails)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteVehiculo(@PathVariable String id) {
        if (vehiculoService.deleteVehiculo(id)) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

}
