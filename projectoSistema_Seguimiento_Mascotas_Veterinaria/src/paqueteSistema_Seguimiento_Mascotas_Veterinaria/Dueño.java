package paqueteSistema_Seguimiento_Mascotas_Veterinaria;

import java.util.Objects;

public class Dueño {
    private int id;
    private String nombre;
    private String documento;
    private String telefono;

    public Dueño(int id, String nombre, String documento, String telefono) {
        this.id = id;
        this.nombre = Objects.requireNonNull(nombre);
        this.documento = Objects.requireNonNull(documento);
        this.telefono = Objects.requireNonNull(telefono);
    }

    public int getId() { return id; }
    public void setId(int id) { this.id = id; }
    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = Objects.requireNonNull(nombre); }
    public String getDocumento() { return documento; }
    public void setDocumento(String documento) { this.documento = Objects.requireNonNull(documento); }
    public String getTelefono() { return telefono; }
    public void setTelefono(String telefono) { this.telefono = Objects.requireNonNull(telefono); }

    @Override
    public String toString() { return "Dueño{id=%d, nombre='%s'}".formatted(id, nombre); }
}
