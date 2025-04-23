@echo off
echo Stopping any running server (if any)...
taskkill /F /IM python.exe /T
echo.

echo Adding files to git...
git add .
echo.

echo Committing changes...
for /f "tokens=2-4 delims=/ " %%a in ('date /t') do (set date=%%c-%%a-%%b)
for /f "tokens=1-2 delims=: " %%a in ('time /t') do (set time=%%a%%b)
git commit -m "Portfolio update - %date% %time%"
echo.

echo Pushing to GitHub...
git push origin main
echo.

echo Process completed. Press any key to exit.
pause > nul 