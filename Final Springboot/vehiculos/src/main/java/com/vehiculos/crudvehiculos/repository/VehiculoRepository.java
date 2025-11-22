package com.vehiculos.crudvehiculos.repository;

import com.vehiculos.crudvehiculos.model.Vehiculo;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface VehiculoRepository extends MongoRepository<Vehiculo, String> {
    
    Optional<Vehiculo> findByPlaca(String placa);
    
    List<Vehiculo> findByMarca(String marca);
    
    List<Vehiculo> findByAnio(Integer anio);
    
}
