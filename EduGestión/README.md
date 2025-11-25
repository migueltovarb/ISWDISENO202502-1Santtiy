# EduGestión

Sistema de gestión educativa con frontend en React/Vite y backend en Spring Boot (MongoDB + JWT).

## Estructura

- `src/`, `public/`, `index.html`: Frontend React + TypeScript con Vite
- `EduGestiónBackend/`: Backend Spring Boot
  - `src/main/java/com/edugestion/`: código fuente (controllers, services, security, etc.)
  - `src/main/resources/application.yml`: configuración (puerto, JWT, MongoDB)
  - `pom.xml`: dependencias y plugins Maven

## Requisitos

- Node.js 18+ y npm
- Java 17+
- Maven 3.9+
- MongoDB (instancia local o Atlas)

## Configuración Backend

Variables de entorno requeridas:

- `MONGODB_URI`: cadena de conexión a MongoDB
- `JWT_SECRET`: secreto para firmar tokens JWT

Archivo `application.yml` relevante:

```yaml
server:
  port: 8080
security:
  jwt:
    secret: ${JWT_SECRET:CHANGE_ME}
    expiration: 3600000
spring:
  data:
    mongodb:
      uri: ${MONGODB_URI:}
springdoc:
  api-docs:
    enabled: true
  swagger-ui:
    enabled: true
```

## Ejecutar Backend

```bash
cd EduGestiónBackend
mvn spring-boot:run
```

- API disponible en `http://localhost:8080`
- Swagger UI: `http://localhost:8080/swagger-ui/index.html`
- Compilar JAR:

```bash
mvn clean package
# target/backend-0.0.1-SNAPSHOT.jar
```

## Ejecutar Frontend

```bash
npm install
npm run dev
```

- Frontend en `http://localhost:5173` (por defecto Vite)
- Compilar producción: `npm run build`
- Previsualizar build: `npm run preview`

## Endpoints principales (resumen)

- Autenticación
  - `POST /api/auth/login`
- Admin (`/api/admin`)
  - Usuarios: `GET/POST/PUT/DELETE /users`, `DELETE /users/{id}`
  - Talleres: `GET/POST/PUT/DELETE /workshops`, `DELETE /workshops/{id}`
  - Materiales: `GET /materials/{workshopId}`
  - Pagos: `GET /payments/students/{studentId}`, `GET /payments/workshops/{workshopId}`
  - Certificados: `POST /certificates/issue`
- Instructor (`/api/instructor`)
  - `POST /materials`
  - `GET /workshops/{id}/students`
- Estudiante (`/api/student`)
  - `GET /workshops`
  - `POST /enroll`
  - `POST /payments`
  - `POST /certificates/issue`

Nota: la mayoría de endpoints requieren autenticación JWT (obtener token con `POST /api/auth/login`).

## Desarrollo

- Frontend usa React 19, MUI y Vite 7
- Backend usa Spring Boot 3.3, Spring Data MongoDB, Spring Security, JJWT y Springdoc OpenAPI

## Problemas comunes

- 401/403 al acceder a endpoints protegidos: verificar `Authorization: Bearer <token>`
- Error de conexión a MongoDB: revisar `MONGODB_URI`
- Swagger no carga: confirmar backend en `:8080` y `springdoc` habilitado

