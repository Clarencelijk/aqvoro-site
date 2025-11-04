@echo off
REM Start local HTTP server for the website
REM This script requires Python 3 to be installed

echo ============================================================
echo Starting Local Web Server...
echo ============================================================

REM Check if Python is installed
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo Error: Python is not installed or not in PATH
    echo Please install Python 3 from https://www.python.org/
    pause
    exit /b 1
)

REM Change to the directory where this script is located
cd /d "%~dp0"

REM Start the Python server
echo.
echo Starting server on http://localhost:8000
echo Press Ctrl+C to stop the server
echo.
python server.py

pause
