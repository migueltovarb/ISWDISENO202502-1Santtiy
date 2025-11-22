package com.vehiculos.crudvehiculos.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.Data;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "vehiculos")
public class Vehiculo {

    @Id
    private String id;

    @NotBlank(message = "La marca es obligatoria")
    private String marca;

    @NotBlank(message = "El modelo es obligatorio")
    private String modelo;

    @NotNull(message = "El año es obligatorio")
    @Positive(message = "El año debe ser positivo")
    private Integer anio;

    @NotBlank(message = "El color es obligatorio")
    private String color;

    @NotBlank(message = "La placa es obligatoria")
    private String placa;

}
