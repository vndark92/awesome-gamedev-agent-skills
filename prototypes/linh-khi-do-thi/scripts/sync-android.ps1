$ErrorActionPreference = 'Stop'
$project = Split-Path $PSScriptRoot -Parent
$destination = Join-Path $project 'android/app/src/main/assets/game'
New-Item -ItemType Directory -Force $destination | Out-Null
Copy-Item -Path (Join-Path $project 'dist/*') -Destination $destination -Recurse -Force
Write-Output 'Android assets synchronized.'
