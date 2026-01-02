@echo off
REM Task Tracker - Full Stack Startup Script for Windows
REM This script starts both backend and frontend servers

echo.
echo =========================================================
echo.
echo   ^<color green^>Task Tracker - Starting Full Stack Application^</color^>
echo.
echo =========================================================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Node.js is not installed
    pause
    exit /b 1
)

for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
echo [OK] Node.js found: %NODE_VERSION%
echo.

REM Start Backend
echo [INFO] Starting Backend Server...
cd backend

REM Check if node_modules exists
if not exist "node_modules" (
    echo [INFO] Installing backend dependencies...
    call npm install
)

REM Check if .env exists
if not exist ".env" (
    echo [ERROR] Backend .env file not found!
    echo Please create backend\.env with your MongoDB URI:
    echo   MONGODB_URI=your_mongodb_uri
    echo   PORT=5000
    echo   NODE_ENV=development
    pause
    exit /b 1
)

start "Task Tracker Backend" cmd /k npm run dev
echo [OK] Backend started
timeout /t 2 /nobreak

REM Start Frontend
echo.
echo [INFO] Starting Frontend Development Server...
cd ..\frontend

REM Check if node_modules exists
if not exist "node_modules" (
    echo [INFO] Installing frontend dependencies...
    call npm install
)

start "Task Tracker Frontend" cmd /k npm run dev
echo [OK] Frontend started
timeout /t 2 /nobreak

REM Print URLs
echo.
echo =========================================================
echo [OK] Application Started Successfully!
echo =========================================================
echo.
echo Frontend URL:  http://localhost:5173
echo Backend URL:   http://localhost:5000
echo API Base URL:  http://localhost:5000/api
echo.
echo Two terminal windows have been opened for Backend and Frontend
echo Close both windows to stop the application
echo.
pause
