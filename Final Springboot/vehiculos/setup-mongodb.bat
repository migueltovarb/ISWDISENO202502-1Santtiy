@echo off
echo ========================================
echo 🚀 CONFIGURACIÓN RÁPIDA DE MONGODB
echo ========================================
echo.
echo Por favor, elige una opción:
echo.
echo [1] Configurar MongoDB Atlas (Recomendado - Cloud)
echo [2] Configurar MongoDB Local
echo [3] Ver instrucciones detalladas
echo [4] Salir
echo.
set /p opcion=Selecciona una opción (1-4): 

if "%opcion%"=="1" goto atlas
if "%opcion%"=="2" goto local
if "%opcion%"=="3" goto instrucciones
if "%opcion%"=="4" goto salir
echo Opción inválida
pause
goto inicio

:atlas
echo.
echo ========================================
echo ☁️ CONFIGURACIÓN MONGODB ATLAS
echo ========================================
echo.
echo 1. Abre tu navegador y ve a: https://www.mongodb.com/cloud/atlas
echo 2. Crea una cuenta gratuita
echo 3. Crea un nuevo proyecto llamado "vehiculos-crud"
echo 4. Crea un cluster gratuito (M0)
echo 5. En "Database Access", crea un usuario con contraseña
echo 6. En "Network Access", agrega tu IP (o 0.0.0.0/0 para todas)
echo 7. Obtén la cadena de conexión desde "Connect" -
echo 8. Reemplaza en application-prod.properties:
echo    spring.data.mongodb.uri=mongodb+srv://TU_USUARIO:TU_CONTRASENA@cluster.mongodb.net/vehiculos_db?retryWrites=true&w=majority
echo.
pause
goto fin

:local
echo.
echo ========================================
echo 💻 CONFIGURACIÓN MONGODB LOCAL
echo ========================================
echo.
echo 1. Descarga MongoDB desde: https://www.mongodb.com/try/download/community
echo 2. Instala MongoDB Community Server
echo 3. Asegúrate de que MongoDB esté ejecutándose como servicio
echo 4. En application.properties, descomenta:
echo    spring.data.mongodb.host=localhost
echo    spring.data.mongodb.port=27017
echo    spring.data.mongodb.database=vehiculos_db
echo.
pause
goto fin

:instrucciones
echo.
echo ========================================
echo 📖 INSTRUCCIONES DETALLADAS
echo ========================================
echo.
echo Lee el archivo MONGODB_SETUP_GUIDE.md para instrucciones completas
echo.
pause
goto fin

:salir
echo.
echo Saliendo...
goto fin

:fin
echo.
echo ========================================
echo ✅ ¡LISTO! Tu API CRUD está configurada.
echo ========================================
echo.
echo Para ejecutar la aplicación:
echo mvn spring-boot:run
echo.
echo Para probar la API:
echo curl http://localhost:8080/api/vehiculos
echo.
pause