package com.vehiculos.entity;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Pattern;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
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
    
    @NotBlank(message = "El número de chasis es obligatorio")
    @Pattern(regexp = "^[A-HJ-NPR-Z0-9]{17}$", message = "El número de chasis debe tener 17 caracteres alfanuméricos")
    private String numeroChasis;
    
    @NotBlank(message = "El color es obligatorio")
    private String color;
    
    @NotBlank(message = "El tipo de combustible es obligatorio")
    private String tipoCombustible;
    
    @NotNull(message = "El precio es obligatorio")
    @Positive(message = "El precio debe ser positivo")
    private BigDecimal precio;
    
    @NotBlank(message = "La placa es obligatoria")
    @Pattern(regexp = "^[A-Z]{3}-[0-9]{3,4}$", message = "La placa debe tener formato ABC-123 o ABC-1234")
    private String placa;
    
    private Boolean disponible;
    
    private String descripcion;
    
    private LocalDateTime fechaCreacion;
    
    private LocalDateTime fechaActualizacion;
    
    public Vehiculo(String marca, String modelo, Integer anio, String numeroChasis, 
                     String color, String tipoCombustible, BigDecimal precio, String placa) {
        this.marca = marca;
        this.modelo = modelo;
        this.anio = anio;
        this.numeroChasis = numeroChasis;
        this.color = color;
        this.tipoCombustible = tipoCombustible;
        this.precio = precio;
        this.placa = placa;
        this.disponible = true;
        this.fechaCreacion = LocalDateTime.now();
        this.fechaActualizacion = LocalDateTime.now();
    }
}