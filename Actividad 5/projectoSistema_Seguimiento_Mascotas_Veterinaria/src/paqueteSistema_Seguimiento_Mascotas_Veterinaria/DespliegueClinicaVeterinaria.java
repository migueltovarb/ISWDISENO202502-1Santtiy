package paqueteSistema_Seguimiento_Mascotas_Veterinaria;

import java.time.LocalDate;

public class DespliegueClinicaVeterinaria {
    public static void main(String[] args) {
        ClinicaVeterinaria cl = new ClinicaVeterinaria();

        Dueño a = cl.registrarDueño("Santiago", "DOC-1", "555-1000");
        Dueño b = cl.registrarDueño("Luis", "DOC-2", "555-2000");

        Mascota m1 = cl.registrarMascota(a, "Firulais", "Perro", 4);
        Mascota m2 = cl.registrarMascota(b, "Michi", "Gato", 2);

        cl.registrarControl(m1, LocalDate.of(2025, 3, 10), TipoControl.VACUNA, "Rabia");
        cl.registrarControl(m1, LocalDate.of(2025, 6, 1), TipoControl.CHEQUEO, "General");

        System.out.println(cl.getPacientes());
        System.out.println(cl.historial(m1));
        System.out.println(cl.generarResumen(m1));
    }
}
