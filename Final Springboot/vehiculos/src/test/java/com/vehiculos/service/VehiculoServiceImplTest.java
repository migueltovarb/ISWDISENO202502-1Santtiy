package com.vehiculos.service;

import com.vehiculos.entity.Vehiculo;
import com.vehiculos.exception.DuplicateResourceException;
import com.vehiculos.exception.ResourceNotFoundException;
import com.vehiculos.repository.VehiculoRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class VehiculoServiceImplTest {

    @Mock
    private VehiculoRepository vehiculoRepository;

    @InjectMocks
    private VehiculoServiceImpl vehiculoService;

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
    void obtenerTodosVehiculos_ShouldReturnListOfVehiculos() {
        // Given
        List<Vehiculo> vehiculos = Arrays.asList(vehiculo);
        when(vehiculoRepository.findAll()).thenReturn(vehiculos);

        // When
        List<Vehiculo> result = vehiculoService.obtenerTodosVehiculos();

        // Then
        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals(vehiculo.getMarca(), result.get(0).getMarca());
        verify(vehiculoRepository, times(1)).findAll();
    }

    @Test
    void obtenerVehiculoPorId_ShouldReturnVehiculo() {
        // Given
        when(vehiculoRepository.findById(vehiculoId)).thenReturn(Optional.of(vehiculo));

        // When
        Optional<Vehiculo> result = vehiculoService.obtenerVehiculoPorId(vehiculoId);

        // Then
        assertTrue(result.isPresent());
        assertEquals(vehiculo.getMarca(), result.get().getMarca());
        verify(vehiculoRepository, times(1)).findById(vehiculoId);
    }

    @Test
    void guardarVehiculo_ShouldSaveVehiculo() {
        // Given
        when(vehiculoRepository.existsByPlaca(anyString())).thenReturn(false);
        when(vehiculoRepository.existsByNumeroChasis(anyString())).thenReturn(false);
        when(vehiculoRepository.save(any(Vehiculo.class))).thenReturn(vehiculo);

        // When
        Vehiculo result = vehiculoService.guardarVehiculo(vehiculo);

        // Then
        assertNotNull(result);
        assertEquals(vehiculo.getMarca(), result.getMarca());
        verify(vehiculoRepository, times(1)).save(any(Vehiculo.class));
    }

    @Test
    void guardarVehiculo_WithDuplicatePlaca_ShouldThrowException() {
        // Given
        when(vehiculoRepository.existsByPlaca(anyString())).thenReturn(true);

        // When & Then
        assertThrows(DuplicateResourceException.class, () -> {
            vehiculoService.guardarVehiculo(vehiculo);
        });
        verify(vehiculoRepository, never()).save(any(Vehiculo.class));
    }

    @Test
    void actualizarVehiculo_ShouldUpdateVehiculo() {
        // Given
        Vehiculo vehiculoActualizado = new Vehiculo();
        vehiculoActualizado.setMarca("Honda");
        vehiculoActualizado.setModelo("Civic");
        vehiculoActualizado.setAnio(2023);
        vehiculoActualizado.setNumeroChasis("DEF12345678901234");
        vehiculoActualizado.setColor("Negro");
        vehiculoActualizado.setTipoCombustible("Gasolina");
        vehiculoActualizado.setPrecio(new BigDecimal("30000.00"));
        vehiculoActualizado.setPlaca("XYZ-789");
        vehiculoActualizado.setDisponible(true);

        when(vehiculoRepository.findById(vehiculoId)).thenReturn(Optional.of(vehiculo));
        when(vehiculoRepository.existsByPlaca(anyString())).thenReturn(false);
        when(vehiculoRepository.existsByNumeroChasis(anyString())).thenReturn(false);
        when(vehiculoRepository.save(any(Vehiculo.class))).thenReturn(vehiculo);

        // When
        Vehiculo result = vehiculoService.actualizarVehiculo(vehiculoId, vehiculoActualizado);

        // Then
        assertNotNull(result);
        verify(vehiculoRepository, times(1)).findById(vehiculoId);
        verify(vehiculoRepository, times(1)).save(any(Vehiculo.class));
    }

    @Test
    void actualizarVehiculo_WithNonExistingId_ShouldThrowException() {
        // Given
        when(vehiculoRepository.findById(vehiculoId)).thenReturn(Optional.empty());

        // When & Then
        assertThrows(ResourceNotFoundException.class, () -> {
            vehiculoService.actualizarVehiculo(vehiculoId, vehiculo);
        });
        verify(vehiculoRepository, never()).save(any(Vehiculo.class));
    }

    @Test
    void eliminarVehiculo_ShouldDeleteVehiculo() {
        // Given
        when(vehiculoRepository.existsById(vehiculoId)).thenReturn(true);
        doNothing().when(vehiculoRepository).deleteById(vehiculoId);

        // When
        assertDoesNotThrow(() -> vehiculoService.eliminarVehiculo(vehiculoId));

        // Then
        verify(vehiculoRepository, times(1)).existsById(vehiculoId);
        verify(vehiculoRepository, times(1)).deleteById(vehiculoId);
    }

    @Test
    void eliminarVehiculo_WithNonExistingId_ShouldThrowException() {
        // Given
        when(vehiculoRepository.existsById(vehiculoId)).thenReturn(false);

        // When & Then
        assertThrows(ResourceNotFoundException.class, () -> {
            vehiculoService.eliminarVehiculo(vehiculoId);
        });
        verify(vehiculoRepository, never()).deleteById(anyString());
    }

    @Test
    void buscarPorMarca_ShouldReturnListOfVehiculos() {
        // Given
        String marca = "Toyota";
        List<Vehiculo> vehiculos = Arrays.asList(vehiculo);
        when(vehiculoRepository.findByMarcaContainingIgnoreCase(marca)).thenReturn(vehiculos);

        // When
        List<Vehiculo> result = vehiculoService.buscarPorMarca(marca);

        // Then
        assertNotNull(result);
        assertEquals(1, result.size());
        verify(vehiculoRepository, times(1)).findByMarcaContainingIgnoreCase(marca);
    }

    @Test
    void buscarPorDisponibilidad_ShouldReturnListOfVehiculos() {
        // Given
        List<Vehiculo> vehiculos = Arrays.asList(vehiculo);
        when(vehiculoRepository.findByDisponible(true)).thenReturn(vehiculos);

        // When
        List<Vehiculo> result = vehiculoService.buscarPorDisponibilidad(true);

        // Then
        assertNotNull(result);
        assertEquals(1, result.size());
        verify(vehiculoRepository, times(1)).findByDisponible(true);
    }

    @Test
    void existePorPlaca_ShouldReturnTrue() {
        // Given
        when(vehiculoRepository.existsByPlaca("ABC-123")).thenReturn(true);

        // When
        boolean result = vehiculoService.existePorPlaca("ABC-123");

        // Then
        assertTrue(result);
        verify(vehiculoRepository, times(1)).existsByPlaca("ABC-123");
    }

    @Test
    void contarPorMarca_ShouldReturnCount() {
        // Given
        when(vehiculoRepository.countByMarca("Toyota")).thenReturn(5L);

        // When
        long result = vehiculoService.contarPorMarca("Toyota");

        // Then
        assertEquals(5L, result);
        verify(vehiculoRepository, times(1)).countByMarca("Toyota");
    }
}