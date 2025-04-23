# Create placeholder for the UnwrapLater project image
$sourcePath = "portfolio-project.jpg"
$outputPath = "assets/projects/unwraplater-project.jpg"

# Create directory if it doesn't exist
$directory = Split-Path $outputPath -Parent
if (!(Test-Path $directory)) {
    New-Item -ItemType Directory -Path $directory -Force
}

# Copy the image as a placeholder
Copy-Item -Path $sourcePath -Destination $outputPath -Force
Write-Host "Created placeholder image at $outputPath"
Write-Host "Please replace this with the actual UnwrapLater project image." 