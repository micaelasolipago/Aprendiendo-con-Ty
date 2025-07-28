@echo off
echo.
echo ===================================
echo 🐕 Aprendiendo Inglés con Ty
echo ===================================
echo.
echo Iniciando servidor local...
echo.

:: Verificar si Node.js está instalado
where node >nul 2>nul
if %errorlevel% == 0 (
    echo ✅ Node.js encontrado
    echo 🚀 Iniciando con http-server...
    echo.
    echo El juego se abrirá automáticamente en:
    echo http://localhost:3000
    echo.
    echo Para detener el servidor, presiona Ctrl+C
    echo.
    npx http-server . -p 3000 -o
    goto end
)

:: Si no hay Node.js, intentar con Python
echo ❌ Node.js no encontrado
echo.
echo Verificando Python...

where python >nul 2>nul
if %errorlevel% == 0 (
    echo ✅ Python encontrado
    echo 🚀 Iniciando con Python...
    echo.
    echo Abre manualmente en tu navegador:
    echo http://localhost:3000
    echo.
    echo Para detener el servidor, presiona Ctrl+C
    echo.
    python -m http.server 3000
    goto end
)

:: Si no hay ninguno
echo ❌ Ni Node.js ni Python encontrados
echo.
echo Por favor instala uno de estos:
echo.
echo 1. Node.js desde: https://nodejs.org
echo 2. Python desde: https://python.org
echo.
echo Después ejecuta este archivo nuevamente.
echo.
echo Alternativa: Abre index.html directamente,
echo pero puede que no funcione completamente.
echo.
pause

:end
pause 