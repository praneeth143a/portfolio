Write-Host "Stopping any running server (if any)..." -ForegroundColor Yellow
Try {
    Stop-Process -Name "python" -ErrorAction SilentlyContinue
    Write-Host "Server stopped." -ForegroundColor Green
} Catch {
    Write-Host "No server was running." -ForegroundColor Green
}

Write-Host "`nAdding files to git..." -ForegroundColor Yellow
# Add all changes including deleted files
git add .

Write-Host "`nCommitting changes..." -ForegroundColor Yellow
$date = Get-Date -Format "yyyy-MM-dd HH:mm"
git commit -m "Portfolio update - $date"

Write-Host "`nPushing to GitHub..." -ForegroundColor Yellow
git push origin main

Write-Host "`nProcess completed. Press any key to exit." -ForegroundColor Green
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown") 