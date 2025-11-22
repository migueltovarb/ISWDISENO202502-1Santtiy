package com.vehiculos.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.vehiculos.entity.Vehiculo;
import com.vehiculos.exception.ResourceNotFoundException;
import com.vehiculos.service.VehiculoService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.context.annotation.Import;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(VehiculoController.class)
@Import(VehiculoController.class)
class VehiculoControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private VehiculoService vehiculoService;

    @Autowired
    private ObjectMapper objectMapper;

    private Vehiculo vehiculo;
    private String vehiculoId = "12345";

    @BeforeEach
    void setUp() {
        vehiculo = new Vehiculo();
        vehiculo.setId(vehiculoId);
        vehiculo.setMarca("Toyota");
        vehiculo.setModelo("Corolla");
        vehiculo.setAnio(2022);
        vehiculo.setNumeroChasis("ABC12345678901234");
        vehiculo.setColor("Blanco");
        vehiculo.setTipoCombustible("Gasolina");
        vehiculo.setPrecio(new BigDecimal("25000.00"));
        vehiculo.setPlaca("ABC-123");
        vehiculo.setDisponible(true);
    }

    @Test
    void obtenerTodosVehiculos_ShouldReturnListOfVehiculos() throws Exception {
        // Given
        List<Vehiculo> vehiculos = Arrays.asList(vehiculo);
        when(vehiculoService.obtenerTodosVehiculos()).thenReturn(vehiculos);

        // When & Then
        mockMvc.perform(get("/api/vehiculos"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$[0].marca").value("Toyota"))
                .andExpect(jsonPath("$[0].modelo").value("Corolla"));

        verify(vehiculoService, times(1)).obtenerTodosVehiculos();
    }

    @Test
    void obtenerVehiculoPorId_ShouldReturnVehiculo() throws Exception {
        // Given
        when(vehiculoService.obtenerVehiculoPorId(vehiculoId)).thenReturn(Optional.of(vehiculo));

        // When & Then
        mockMvc.perform(get("/api/vehiculos/{id}", vehiculoId))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.marca").value("Toyota"))
                .andExpect(jsonPath("$.modelo").value("Corolla"));

        verify(vehiculoService, times(1)).obtenerVehiculoPorId(vehiculoId);
    }

    @Test
    void obtenerVehiculoPorId_WithNonExistingId_ShouldReturn404() throws Exception {
        // Given
        when(vehiculoService.obtenerVehiculoPorId(vehiculoId)).thenReturn(Optional.empty());

        // When & Then
        mockMvc.perform(get("/api/vehiculos/{id}", vehiculoId))
                .andExpect(status().isNotFound());

        verify(vehiculoService, times(1)).obtenerVehiculoPorId(vehiculoId);
    }

    @Test
    void guardarVehiculo_ShouldCreateVehiculo() throws Exception {
        // Given
        when(vehiculoService.guardarVehiculo(any(Vehiculo.class))).thenReturn(vehiculo);

        // When & Then
        mockMvc.perform(post("/api/vehiculos")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(vehiculo)))
                .andExpect(status().isCreated())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.marca").value("Toyota"))
                .andExpect(jsonPath("$.modelo").value("Corolla"));

        verify(vehiculoService, times(1)).guardarVehiculo(any(Vehiculo.class));
    }

    @Test
    void guardarVehiculo_WithInvalidData_ShouldReturn400() throws Exception {
        // Given
        Vehiculo vehiculoInvalido = new Vehiculo();
        vehiculoInvalido.setMarca(""); // Marca vacía

        // When & Then
        mockMvc.perform(post("/api/vehiculos")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(vehiculoInvalido)))
                .andExpect(status().isBadRequest());
    }

    @Test
    void actualizarVehiculo_ShouldUpdateVehiculo() throws Exception {
        // Given
        when(vehiculoService.actualizarVehiculo(eq(vehiculoId), any(Vehiculo.class))).thenReturn(vehiculo);

        // When & Then
        mockMvc.perform(put("/api/vehiculos/{id}", vehiculoId)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(vehiculo)))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.marca").value("Toyota"));

        verify(vehiculoService, times(1)).actualizarVehiculo(eq(vehiculoId), any(Vehiculo.class));
    }

    @Test
    void eliminarVehiculo_ShouldDeleteVehiculo() throws Exception {
        // Given
        doNothing().when(vehiculoService).eliminarVehiculo(vehiculoId);

        // When & Then
        mockMvc.perform(delete("/api/vehiculos/{id}", vehiculoId))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.mensaje").value("Vehículo eliminado exitosamente"));

        verify(vehiculoService, times(1)).eliminarVehiculo(vehiculoId);
    }

    @Test
    void buscarPorMarca_ShouldReturnListOfVehiculos() throws Exception {
        // Given
        String marca = "Toyota";
        List<Vehiculo> vehiculos = Arrays.asList(vehiculo);
        when(vehiculoService.buscarPorMarca(marca)).thenReturn(vehiculos);

        // When & Then
        mockMvc.perform(get("/api/vehiculos/buscar/marca/{marca}", marca))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$[0].marca").value("Toyota"));

        verify(vehiculoService, times(1)).buscarPorMarca(marca);
    }

    @Test
    void buscarPorDisponibilidad_ShouldReturnListOfVehiculos() throws Exception {
        // Given
        List<Vehiculo> vehiculos = Arrays.asList(vehiculo);
        when(vehiculoService.buscarPorDisponibilidad(true)).thenReturn(vehiculos);

        // When & Then
        mockMvc.perform(get("/api/vehiculos/buscar/disponibilidad/{disponible}", true))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$[0].disponible").value(true));

        verify(vehiculoService, times(1)).buscarPorDisponibilidad(true);
    }

    @Test
    void buscarPorPlaca_ShouldReturnVehiculo() throws Exception {
        // Given
        String placa = "ABC-123";
        when(vehiculoService.buscarPorPlaca(placa)).thenReturn(Optional.of(vehiculo));

        // When & Then
        mockMvc.perform(get("/api/vehiculos/buscar/placa/{placa}", placa))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.placa").value("ABC-123"));

        verify(vehiculoService, times(1)).buscarPorPlaca(placa);
    }

    @Test
    void buscarPorRangoPrecios_ShouldReturnListOfVehiculos() throws Exception {
        // Given
        BigDecimal precioMin = new BigDecimal("20000.00");
        BigDecimal precioMax = new BigDecimal("30000.00");
        List<Vehiculo> vehiculos = Arrays.asList(vehiculo);
        when(vehiculoService.buscarPorRangoPrecios(precioMin, precioMax)).thenReturn(vehiculos);

        // When & Then
        mockMvc.perform(get("/api/vehiculos/buscar/rango-precios")
                        .param("precioMin", precioMin.toString())
                        .param("precioMax", precioMax.toString()))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON));

        verify(vehiculoService, times(1)).buscarPorRangoPrecios(precioMin, precioMax);
    }

    @Test
    void existePorPlaca_ShouldReturnTrue() throws Exception {
        // Given
        String placa = "ABC-123";
        when(vehiculoService.existePorPlaca(placa)).thenReturn(true);

        // When & Then
        mockMvc.perform(get("/api/vehiculos/estadisticas/existe-placa")
                        .param("placa", placa))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.existe").value(true));

        verify(vehiculoService, times(1)).existePorPlaca(placa);
    }

    @Test
    void contarPorMarca_ShouldReturnCount() throws Exception {
        // Given
        String marca = "Toyota";
        when(vehiculoService.contarPorMarca(marca)).thenReturn(5L);

        // When & Then
        mockMvc.perform(get("/api/vehiculos/estadisticas/contar-marca")
                        .param("marca", marca))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.cantidad").value(5));

        verify(vehiculoService, times(1)).contarPorMarca(marca);
    }
}