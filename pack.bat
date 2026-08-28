@echo off
setlocal
cd /d "%~dp0"

set OUT=release\nanoSecretary-win32-x64

echo [1/3] Cleaning old release folder...
if exist release rmdir /s /q release

echo [2/3] Copying local Electron runtime...
mkdir "%OUT%"
xcopy node_modules\electron\dist\* "%OUT%\" /E /I /Y >nul
if errorlevel 1 (
    echo [ERROR] Failed to copy Electron runtime. Check node_modules\electron.
    pause
    exit /b 1
)

echo [3/3] Adding app code...
mkdir "%OUT%\resources\app"
copy /Y main.js preload.js ollama.js index.js homepage.js history.js index.html homepage.html history.html icon.png nanoSecretary.ico package.json "%OUT%\resources\app\" >nul

if exist "%OUT%\resources\default_app.asar" del /q "%OUT%\resources\default_app.asar"

if exist "%OUT%\electron.exe" ren "%OUT%\electron.exe" nanoSecretary.exe

echo.
echo Done!
echo Executable: %OUT%\nanoSecretary.exe
echo.
pause
