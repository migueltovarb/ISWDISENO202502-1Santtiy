package paqueteSistema_Seguimiento_Mascotas_Veterinaria;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Objects;

public class Mascota {
    private String nombre;
    private String especie;
    private int edad;
    private Dueño dueño;
    private final List<ControlVeterinario> controles = new ArrayList<>();

    public Mascota(String nombre, String especie, int edad, Dueño dueño) {
        this.nombre = Objects.requireNonNull(nombre);
        this.especie = Objects.requireNonNull(especie);
        this.edad = edad;
        this.dueño = Objects.requireNonNull(dueño);
    }

    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = Objects.requireNonNull(nombre); }

    public String getEspecie() { return especie; }
    public void setEspecie(String especie) { this.especie = Objects.requireNonNull(especie); }

    public int getEdad() { return edad; }
    public void setEdad(int edad) { this.edad = edad; }

    public Dueño getDueño() { return dueño; }
    public void setDueño(Dueño dueño) { this.dueño = Objects.requireNonNull(dueño); }

    public List<ControlVeterinario> getControles() {
        return Collections.unmodifiableList(controles);
    }

    public void agregarControl(ControlVeterinario c) {
        controles.add(Objects.requireNonNull(c));
    }
}
