Write-Host $Env:APPVEYOR_BUILD_VERSION

$ReleaseFilename = "plumber-sc.$Env:APPVEYOR_BUILD_VERSION.zip"

npm install
npm run build

Copy-Item .\install\iis\web.config -Destination .\dist\

Push-Location

cd .\dist
Compress-Archive -Path . -DestinationPath ../$ReleaseFilename 

Pop-Location