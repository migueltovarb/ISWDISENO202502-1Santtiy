package paqueteSistema_Seguimiento_Mascotas_Veterinaria;

public class Dueño {
	private String nombre;
	private int documento;
	private String telefono;
	
	public Dueño(String nombre, int documento, String telefono) {
		this.nombre = nombre;
		this.documento = documento;
		this.telefono = telefono;
	}
	public String getNombre() {
		return nombre;
	}
	public int getDocumento() {
		return documento;
	}

	public String getTelefono() {
		return telefono;
	}

}
