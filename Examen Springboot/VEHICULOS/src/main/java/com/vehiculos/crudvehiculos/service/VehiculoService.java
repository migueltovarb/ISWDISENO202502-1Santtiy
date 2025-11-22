package com.vehiculos.crudvehiculos.service;

import com.vehiculos.crudvehiculos.model.Vehiculo;
import com.vehiculos.crudvehiculos.repository.VehiculoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class VehiculoService {

    @Autowired
    private VehiculoRepository vehiculoRepository;

    public List<Vehiculo> getAllVehiculos() {
        return vehiculoRepository.findAll();
    }

    public Optional<Vehiculo> getVehiculoById(String id) {
        return vehiculoRepository.findById(id);
    }

    public Optional<Vehiculo> getVehiculoByPlaca(String placa) {
        return vehiculoRepository.findByPlaca(placa);
    }

    public List<Vehiculo> getVehiculosByMarca(String marca) {
        return vehiculoRepository.findByMarca(marca);
    }

    public Vehiculo createVehiculo(Vehiculo vehiculo) {
        return vehiculoRepository.save(vehiculo);
    }

    public Optional<Vehiculo> updateVehiculo(String id, Vehiculo vehiculoDetails) {
        return vehiculoRepository.findById(id).map(vehiculo -> {
            vehiculo.setMarca(vehiculoDetails.getMarca());
            vehiculo.setModelo(vehiculoDetails.getModelo());
            vehiculo.setAnio(vehiculoDetails.getAnio());
            vehiculo.setColor(vehiculoDetails.getColor());
            vehiculo.setPlaca(vehiculoDetails.getPlaca());
            return vehiculoRepository.save(vehiculo);
        });
    }

    public boolean deleteVehiculo(String id) {
        return vehiculoRepository.findById(id).map(vehiculo -> {
            vehiculoRepository.delete(vehiculo);
            return true;
        }).orElse(false);
    }

}
