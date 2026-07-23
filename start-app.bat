@echo off
echo ========================================================
echo   Starting Student AI Mentor & Intelligent Document Analyzer
echo ========================================================

echo.
echo [1/2] Starting Express Backend Server (Port 5002)...
start "Backend Server (Port 5002)" cmd /k "cd backend && npm start"

echo.
echo [2/2] Starting React Frontend Application (Port 3000)...
start "Frontend Application" cmd /k "cd frontend && npm start"

echo.
echo ========================================================
echo ✅ Both Backend and Frontend services have launched!
echo 🌐 Open your browser at: http://localhost:3000
echo ========================================================
