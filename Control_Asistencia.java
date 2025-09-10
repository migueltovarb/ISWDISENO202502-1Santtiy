package paqueteMiPrimerProyecto;
import java.util.Scanner;

public class Control_Asistencia {
	static final int DIAS_SEMANA = 5;
    static final int NUM_ESTUDIANTES = 4;
    
    public static void main(String[] args) {
        Scanner sn = new Scanner(System.in);
        String[] estudiantes = {"Luis", "Carlos", "Santiago", "Pepe"};
        
        char[][] asistencia = new char[NUM_ESTUDIANTES][DIAS_SEMANA];
        
        boolean registroDatos = false;
        int opcion; 

        do {
            System.out.println("Registro De Asistencia");
            System.out.println("1. Registrar asistencia");
            System.out.println("2. Ver asistencia individual");
            System.out.println("3. Ver resumen general");
            System.out.println("4. Salir");
            
            opcion = sn.nextInt();
            
            switch (opcion) {  
            case 1: 
            	for (int i = 0; i < NUM_ESTUDIANTES; i++) {
                    for (int j = 0; j < DIAS_SEMANA; j++) {
                        char valor;
                        do {
                            System.out.print("Ingresa la asistencia de el estudiante " + estudiantes[i] +
                                    " el día " + (j + 1) + "(P/A):");
                            valor = sn.next().toUpperCase().charAt(0);
                        } while (valor != 'P' && valor != 'A');
                        asistencia[i][j] = valor;
                    }
                }
                registroDatos = true;
                break;
           
            case 2:
            	if (!registroDatos) {
                    System.out.println("Primero se debe registrar la asistencia.");
                    break;
                }
                for (int i = 0; i < NUM_ESTUDIANTES; i++) {
                    System.out.print(estudiantes[i] + ": ");
                    for (int j = 0; j < DIAS_SEMANA; j++) {
                        System.out.print(asistencia[i][j] + " ");
                    }
                    System.out.println();
                }
                break;

            case 3:
            	if (!registroDatos) {
                    System.out.println("Primero se debe registrar la asistencia.");
                    break;
                }

                System.out.println("Total de faltas por estudiante");
                for (int i = 0; i < NUM_ESTUDIANTES; i++) {
                    int total = 0;
                    for (int j = 0; j < DIAS_SEMANA; j++) {
                        if (asistencia[i][j] == 'P') total++;
                    }
                    System.out.println(estudiantes[i] + ": " + total + " asistencias");
                }

                System.out.println("Estudiantes que no faltaron ni un dia");
                boolean alguno = false;
                for (int i = 0; i < NUM_ESTUDIANTES; i++) {
                    boolean todos = true;
                    for (int j = 0; j < DIAS_SEMANA; j++) {
                        if (asistencia[i][j] == 'A') {
                            todos = false;
                            break;
                        }
                    }
                    if (todos) {
                        System.out.println(estudiantes[i]);
                        alguno = true;
                    }
                }
                if (!alguno) System.out.println("Ninguno");

                int maxAusencias = -1, diaMayor = -1;
                for (int j = 0; j < DIAS_SEMANA; j++) {
                    int ausencias = 0;
                    for (int i = 0; i < NUM_ESTUDIANTES; i++) {
                        if (asistencia[i][j] == 'A') ausencias++;
                    }
                    if (ausencias > maxAusencias) {
                        maxAusencias = ausencias;
                        diaMayor = j;
                    }
                }
                System.out.println("Día con más ausencias");
                System.out.println("Día " + (diaMayor + 1) + " con " + maxAusencias + " ausencias");
                break;

            case 4:
                System.out.println("Adios");
                break;

            default:
                System.out.println("Opcion no valida");
        }
        
        } while (opcion != 4);
        
        sn.close();
    }
}

        
