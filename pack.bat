@echo off
echo [pack] nanoSecretary v2.0.0
setlocal
cd /d "%~dp0"

set OUT=release\nanoSecretary-win32-x64

echo [1/5] Cleaning old release...
if exist "%OUT%" rmdir /s /q "%OUT%"

echo [2/5] Copying local Electron runtime...
mkdir "%OUT%" 2>nul
xcopy node_modules\electron\dist\* "%OUT%\" /E /I /Y >nul
if errorlevel 1 (
    echo [ERROR] Failed to copy Electron runtime. Check node_modules\electron.
    pause
    exit /b 1
)

echo [3/5] Adding app code...
mkdir "%OUT%\resources\app" 2>nul
for %%f in (main.js preload.js ollama.js index.js homepage.js history.js icons.js date-picker.js date-picker-react.js notes.js index.html homepage.html history.html notes.html tokens.css date-picker.css date-picker-react.css icon.png Nanosecretary_256x256.ico package.json) do copy /Y "%%f" "%OUT%\resources\app\%%f" >nul

if exist "%OUT%\resources\default_app.asar" del /q "%OUT%\resources\default_app.asar"
if exist "%OUT%\electron.exe" ren "%OUT%\electron.exe" nanoSecretary.exe

echo [4/5] Embedding icon into EXE...
if exist "tools\rcedit-x64.exe" (
    tools\rcedit-x64.exe "%OUT%\nanoSecretary.exe" --set-icon "Nanosecretary_256x256.ico" --set-version-string "FileDescription" "nanoSecretary 本地 AI 秘书" --set-version-string "ProductName" "nanoSecretary" --set-product-version "2.0.0.0" --set-file-version "2.0.0.0"
    if errorlevel 1 (
        echo [WARN] Failed to embed icon. EXE will show Electron default icon.
    ) else (
        echo [OK] Icon embedded.
    )
) else (
    echo [SKIP] tools\rcedit-x64.exe not found. EXE will show Electron default icon.
)

echo [5/5] Creating zip...
if exist "release\nanoSecretary-v2.0.0-win32-x64.zip" del /q "release\nanoSecretary-v2.0.0-win32-x64.zip"
powershell -NoProfile -Command "Compress-Archive -Path '%OUT%\*' -DestinationPath 'release\nanoSecretary-v2.0.0-win32-x64.zip' -Force"

echo.
echo Done!
echo Executable: %OUT%\nanoSecretary.exe
echo Zip: release\nanoSecretary-v2.0.0-win32-x64.zip
