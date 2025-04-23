Write-Host "Stopping any running server (if any)..." -ForegroundColor Yellow
Try {
    Stop-Process -Name "python" -ErrorAction SilentlyContinue
    Write-Host "Server stopped." -ForegroundColor Green
} Catch {
    Write-Host "No server was running." -ForegroundColor Green
}

Write-Host "`nAdding files to git..." -ForegroundColor Yellow
git add index.html
git add styles/main.css
git add scripts/main.js

Write-Host "`nCommitting changes..." -ForegroundColor Yellow
git commit -m "Updated portfolio with responsive design and animations"

Write-Host "`nPushing to GitHub..." -ForegroundColor Yellow
git push origin main

Write-Host "`nProcess completed. Press any key to exit." -ForegroundColor Green
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown") 