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

    public List<Mascota> getPacientes() {
        return Collections.unmodifiableList(pacientes);
    }

    public List<Dueño> getDueños() {
        return Collections.unmodifiableList(dueños);
    }

    public Dueño registrarDueño(String nombre, String documento, String telefono) {
        boolean existeDoc = dueños.stream()
                .anyMatch(d -> d.getDocumento().equalsIgnoreCase(documento));
        if (existeDoc) {
            throw new IllegalArgumentException("Documento ya registrado: " + documento);
        }
        Dueño d = new Dueño(nombre, documento, telefono);
        dueños.add(d);
        return d;
    }

    public Mascota registrarMascota(Dueño dueño, String nombre, String especie, int edad) {
        boolean existe = pacientes.stream().anyMatch(m ->
                m.getDueño().getDocumento().equalsIgnoreCase(dueño.getDocumento())
                        && m.getNombre().equalsIgnoreCase(nombre));
        if (existe) {
            throw new IllegalArgumentException("Mascota duplicada para ese dueño");
        }
        Mascota m = new Mascota(nombre, especie, edad, dueño);
        pacientes.add(m);
        return m;
    }

    public ControlVeterinario registrarControl(Mascota mascota, LocalDate fecha,
                                               TipoControl tipo, String obs) {
        if (!pacientes.contains(mascota)) {
            throw new NoSuchElementException("Mascota no registrada");
        }
        ControlVeterinario c = new ControlVeterinario(fecha, tipo, obs);
        mascota.agregarControl(c);
        return c;
    }

    public List<ControlVeterinario> historial(Mascota mascota) {
        if (!pacientes.contains(mascota)) {
            throw new NoSuchElementException("Mascota no registrada");
        }

        // Copiamos la lista de controles de la mascota
        List<ControlVeterinario> r = new ArrayList<>(mascota.getControles());

        // Ordenar por fecha de control
        r.sort(Comparator.comparing(ControlVeterinario::getFecha));

        // Lista inmodificable hacia afuera
        return Collections.unmodifiableList(r);
    }

    // NUEVO: método generarResumen que usas en el main
    public String generarResumen(Mascota mascota) {
        if (!pacientes.contains(mascota)) {
            throw new NoSuchElementException("Mascota no registrada");
        }

        StringBuilder sb = new StringBuilder();

        // Datos básicos de la mascota
        sb.append("=== Resumen de Mascota ===\n");
        sb.append("Nombre: ").append(mascota.getNombre()).append("\n");
        sb.append("Especie: ").append(mascota.getEspecie()).append("\n");
        sb.append("Edad: ").append(mascota.getEdad()).append(" años\n\n");

        // Datos del dueño
        Dueño d = mascota.getDueño();
        sb.append("=== Dueño ===\n");
        sb.append("Nombre: ").append(d.getNombre()).append("\n");
        sb.append("Documento: ").append(d.getDocumento()).append("\n");
        sb.append("Teléfono: ").append(d.getTelefono()).append("\n\n");

        // Historial de controles (aprovechamos el método historial)
        sb.append("=== Controles Veterinarios ===\n");
        List<ControlVeterinario> controlesOrdenados = historial(mascota);

        if (controlesOrdenados.isEmpty()) {
            sb.append("No hay controles registrados.\n");
        } else {
            for (ControlVeterinario c : controlesOrdenados) {
                sb.append("- ")
                  .append(c.getFecha())
                  .append(" | ")
                  .append(c.getTipo());

                if (c.getObservaciones() != null && !c.getObservaciones().isBlank()) {
                    sb.append(" | Obs: ").append(c.getObservaciones());
                }
                sb.append("\n");
            }
        }

        return sb.toString();
    }
}
