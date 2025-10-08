package paqueteSistema_Seguimiento_Mascotas_Veterinaria;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.NoSuchElementException;

public class ClinicaVeterinaria {
    private final List<Mascota> pacientes = new ArrayList<>();
    private final List<Dueño> dueños = new ArrayList<>();
    private int seqDueño = 1;

    public List<Mascota> getPacientes() { return Collections.unmodifiableList(pacientes); }
    public List<Dueño> getDueños() { return Collections.unmodifiableList(dueños); }

    public Dueño registrarDueño(String nombre, String documento, String telefono) {
        Dueño d = new Dueño(seqDueño++, nombre, documento, telefono);
        dueños.add(d);
        return d;
    }

    public Mascota registrarMascota(Dueño dueño, String nombre, String especie, int edad) {
        boolean existe = pacientes.stream().anyMatch(m ->
                m.getDueño().getId() == dueño.getId() &&
                m.getNombre().equalsIgnoreCase(nombre));
        if (existe) throw new IllegalArgumentException("Mascota duplicada para ese dueño");
        Mascota m = new Mascota(nombre, especie, edad, dueño);
        pacientes.add(m);
        return m;
    }

    public ControlVeterinario registrarControl(Mascota mascota, LocalDate fecha, TipoControl tipo, String obs) {
        if (!pacientes.contains(mascota)) throw new NoSuchElementException("Mascota no registrada");
        ControlVeterinario c = new ControlVeterinario(fecha, tipo, obs);
        mascota.agregarControl(c);
        return c;
    }

    public List<ControlVeterinario> historial(Mascota mascota) {
        if (!pacientes.contains(mascota)) throw new NoSuchElementException("Mascota no registrada");
        List<ControlVeterinario> r = new ArrayList<>(mascota.getControles());
        r.sort(Comparator.comparing(ControlVeterinario::getFecha));
        return r;
    }

    public String generarResumen(Mascota mascota) {
        return "Resumen{nombre='%s', especie='%s', controles=%d}"
                .formatted(mascota.getNombre(), mascota.getEspecie(), mascota.getControles().size());
    }
}
