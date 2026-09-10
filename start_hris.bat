@echo off
TITLE HRIS Portal Launcher
COLOR 0A
CLS

echo =========================================================================
echo                   HRIS FULL STACK SYSTEM LAUNCHER                       
echo =========================================================================
echo.
echo [1/3] Checking MySQL Database Service on Port 3306...
netstat -ano | findstr ":3306" > nul
if %errorlevel% equ 0 (
    echo [SUCCESS] MySQL Server is active on port 3306.
) else (
    echo [WARNING] MySQL on port 3306 is not detected. Please ensure MySQL Server 8.0 is running.
)

echo.
echo [2/3] Launching Spring Boot Backend Service (Port 8080)...
start "HRIS Backend - Spring Boot" /D "%~dp0backend" cmd /k "echo Starting Spring Boot Backend... & mvn spring-boot:run"

echo.
echo [3/3] Launching React Vite Frontend Service (Port 8081)...
start "HRIS Frontend - React Vite" /D "%~dp0frontend" cmd /k "echo Starting React Vite Frontend... & npm run dev"

echo.
echo =========================================================================
echo All services launched!
echo.
echo   - Backend REST API:  http://localhost:8080
echo   - Swagger UI:        http://localhost:8080/swagger-ui/index.html
echo   - Frontend Portal:   http://localhost:8081
echo =========================================================================
echo.
echo Opening HRIS Frontend in browser...
timeout /t 5 > nul
start http://localhost:8081

pause
