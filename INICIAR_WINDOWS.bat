@echo off
cd /d "%~dp0"
where node >nul 2>nul
if errorlevel 1 (
 echo Primero instala Node.js 20 o superior desde https://nodejs.org/
 pause
 exit /b 1
)
start "" "http://localhost:3000"
node database\server.js
pause
