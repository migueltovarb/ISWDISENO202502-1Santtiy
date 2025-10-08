package paqueteSistema_Seguimiento_Mascotas_Veterinaria;

import java.time.LocalDate;
import java.util.Objects;

public class ControlVeterinario {
    private LocalDate fecha;
    private TipoControl tipo;
    private String observaciones;

    public ControlVeterinario(LocalDate fecha, TipoControl tipo, String observaciones) {
        this.fecha = Objects.requireNonNull(fecha);
        this.tipo = Objects.requireNonNull(tipo);
        this.observaciones = observaciones == null ? "" : observaciones;
    }

    public LocalDate getFecha() { return fecha; }
    public void setFecha(LocalDate fecha) { this.fecha = Objects.requireNonNull(fecha); }
    public TipoControl getTipo() { return tipo; }
    public void setTipo(TipoControl tipo) { this.tipo = Objects.requireNonNull(tipo); }
    public String getObservaciones() { return observaciones; }
    public void setObservaciones(String observaciones) { this.observaciones = observaciones == null ? "" : observaciones; }

    @Override
    public String toString() { return "Control{fecha=%s, tipo=%s}".formatted(fecha, tipo); }
}
