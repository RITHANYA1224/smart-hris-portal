@echo off
TITLE HRIS Shutdown Utility
COLOR 0C
CLS

echo =========================================================================
echo                   HRIS FULL STACK SHUTDOWN UTILITY                        
echo =========================================================================
echo.
echo Stopping active HRIS backend and frontend processes...

for /f "tokens=5" %%a in ('netstat -aon ^| findstr ":8080"') do taskkill /f /pid %%a 2>nul
for /f "tokens=5" %%a in ('netstat -aon ^| findstr ":8081"') do taskkill /f /pid %%a 2>nul

echo.
echo [SUCCESS] All HRIS services on ports 8080 and 8081 stopped cleanly.
echo.
pause
