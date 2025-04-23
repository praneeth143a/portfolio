@echo off
echo Stopping any running server (if any)...
taskkill /F /IM python.exe /T
echo.

echo Adding files to git...
git add index.html
git add styles/main.css
git add scripts/main.js
echo.

echo Committing changes...
git commit -m "Updated portfolio with responsive design and animations"
echo.

echo Pushing to GitHub...
git push origin main
echo.

echo Process completed. Press any key to exit.
pause > nul 