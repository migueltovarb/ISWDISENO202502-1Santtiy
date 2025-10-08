import java.util.Objects;

public class Mascota {
    private String nombre;

    // Si por tu diseño necesitas ambos getters:
    public String getNombre1() { return nombre; }
    public String getNombre2() { return nombre; }

    // Getter “normal”
    public String getNombre()  { return nombre; }

    // Setter corregido y con validación
    public void setNombre(String nNombre) {
        String v = Objects.requireNonNull(nNombre, "nombre no puede ser nulo").trim();
        if (v.isEmpty()) {
            throw new IllegalArgumentException("nombre no puede estar vacío");
        }
        this.nombre = v;
    }
}
