# CRUD de Vehículos - Spring Boot + MongoDB Atlas

API RESTful para la gestión de vehículos desarrollada con Spring Boot y MongoDB Atlas.

## Requisitos

- Java 17 o superior
- Maven 3.6 o superior
- MongoDB Atlas (base de datos en la nube)

## Configuración

### 1. Clonar el repositorio
```bash
git clone https://github.com/migueltovarb/ISWDISENO202502-1SamuelMenan.git
cd CRUDVEHICULOS
```

### 2. Configurar MongoDB Atlas
Este proyecto utiliza MongoDB Atlas (base de datos en la nube). La conexión ya está configurada en `src/main/resources/application.properties`:

```properties
# Configuración de MongoDB Atlas
spring.application.name=crud-vehiculos
server.port=8080

# URI de conexión a MongoDB Atlas
spring.data.mongodb.uri=mongodb+srv://sam100uel_db_user:PASSWORD@vehiculos-crud.ijj6dvv.mongodb.net/vehiculos_db?retryWrites=true&w=majority
```

**Nota:** Asegúrate de reemplazar `PASSWORD` con tu contraseña de MongoDB Atlas.

### 3. Construir y ejecutar la aplicación
```bash
# Construir el proyecto
mvn clean install

# Ejecutar la aplicación
mvn spring-boot:run

# O ejecutar el JAR generado
java -jar target/crud-vehiculos-0.0.1-SNAPSHOT.jar
```

La aplicación estará disponible en: `http://localhost:8080`

## Estructura del Proyecto

```
CRUDVEHICULOS/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/vehiculos/crudvehiculos/
│   │   │       ├── CrudVehiculosApplication.java
│   │   │       ├── controller/
│   │   │       │   └── VehiculoController.java
│   │   │       ├── model/
│   │   │       │   └── Vehiculo.java
│   │   │       ├── repository/
│   │   │       │   └── VehiculoRepository.java
│   │   │       └── service/
│   │   │           └── VehiculoService.java
│   │   └── resources/
│   │       └── application.properties
├── pom.xml
└── README.md
```

## Endpoints de la API

### CRUD Básico

#### Obtener todos los vehículos
```http
GET /api/vehiculos
```

#### Obtener vehículo por ID
```http
GET /api/vehiculos/{id}
```

#### Crear nuevo vehículo
```http
POST /api/vehiculos
Content-Type: application/json

{
  "marca": "Toyota",
  "modelo": "Corolla",
  "anio": 2023,
  "color": "Blanco",
  "placa": "ABC-123"
}
```

#### Actualizar vehículo
```http
PUT /api/vehiculos/{id}
Content-Type: application/json

{
  "marca": "Toyota",
  "modelo": "Corolla",
  "anio": 2024,
  "color": "Negro",
  "placa": "ABC-123"
}
```

#### Eliminar vehículo
```http
DELETE /api/vehiculos/{id}
```

### Búsquedas Personalizadas

#### Buscar por placa
```http
GET /api/vehiculos/buscar/placa/{placa}
```

#### Buscar por marca
```http
GET /api/vehiculos/buscar/marca/{marca}
```

#### Buscar por año
```http
GET /api/vehiculos/buscar/anio/{anio}
```

## Validaciones

La API incluye las siguientes validaciones:

- **marca**: Obligatoria, no puede estar vacía
- **modelo**: Obligatorio, no puede estar vacío
- **anio**: Obligatorio, debe ser un número positivo
- **color**: Obligatorio, no puede estar vacío
- **placa**: Obligatoria, no puede estar vacía

## Ejemplos de Uso con PowerShell

### Crear un vehículo
```powershell
Invoke-RestMethod -Uri "http://localhost:8080/api/vehiculos" -Method POST -ContentType "application/json" -Body '{
  "marca": "Honda",
  "modelo": "Civic",
  "anio": 2024,
  "color": "Rojo",
  "placa": "XYZ-789"
}'
```

### Obtener todos los vehículos
```powershell
Invoke-RestMethod -Uri "http://localhost:8080/api/vehiculos" -Method GET
```

### Buscar vehículos por marca
```powershell
Invoke-RestMethod -Uri "http://localhost:8080/api/vehiculos/buscar/marca/Toyota" -Method GET
```

### Actualizar un vehículo
```powershell
Invoke-RestMethod -Uri "http://localhost:8080/api/vehiculos/{id}" -Method PUT -ContentType "application/json" -Body '{
  "marca": "Toyota",
  "modelo": "Corolla",
  "anio": 2024,
  "color": "Negro",
  "placa": "ABC-123"
}'
```

### Eliminar un vehículo
```powershell
Invoke-RestMethod -Uri "http://localhost:8080/api/vehiculos/{id}" -Method DELETE
```

### Crear múltiples vehículos
```powershell
$vehicles = @(
    '{"marca":"Honda","modelo":"Civic","anio":2024,"color":"Rojo","placa":"XYZ-789"}',
    '{"marca":"Ford","modelo":"Mustang","anio":2023,"color":"Negro","placa":"DEF-456"}',
    '{"marca":"Chevrolet","modelo":"Camaro","anio":2022,"color":"Amarillo","placa":"GHI-321"}'
)

foreach ($v in $vehicles) {
    Invoke-RestMethod -Uri "http://localhost:8080/api/vehiculos" -Method POST -ContentType "application/json" -Body $v
    Start-Sleep -Milliseconds 500
}
```

## Tecnologías utilizadas

- **Spring Boot 3.2.0** - Framework principal
- **Spring Data MongoDB** - Integración con MongoDB
- **Spring Validation** - Validación de datos
- **Lombok** - Reducción de código boilerplate
- **Maven** - Gestión de dependencias
- **Java 17** - Lenguaje de programación
- **MongoDB Atlas** - Base de datos en la nube

## Modelo de Datos

### Entidad Vehiculo
```java
{
  "id": "String (generado automáticamente por MongoDB)",
  "marca": "String (obligatorio)",
  "modelo": "String (obligatorio)",
  "anio": "Integer (obligatorio, positivo)",
  "color": "String (obligatorio)",
  "placa": "String (obligatorio)"
}
```

## Estado del Proyecto

✅ **Proyecto completado y funcional**

- API RESTful implementada con todos los endpoints CRUD
- Conexión exitosa a MongoDB Atlas
- Validaciones de datos implementadas
- Pruebas realizadas con éxito
- Documentación completa

## Autor

Proyecto desarrollado como parte del curso ISW DISEÑO 202502-1 por Samuel Menan.

## Repositorio

[https://github.com/migueltovarb/ISWDISENO202502-1SamuelMenan](https://github.com/migueltovarb/ISWDISENO202502-1SamuelMenan)

