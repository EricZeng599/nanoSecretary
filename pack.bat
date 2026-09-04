@echo off
echo [pack] nanoSecretary v1.3.0
setlocal
cd /d "%~dp0"

set OUT=release\nanoSecretary-win32-x64

echo [1/3] Cleaning old release...
if exist release rmdir /s /q release

echo [2/3] Copying local Electron runtime...
mkdir "%OUT%" 2>nul
xcopy node_modules\electron\dist\* "%OUT%\" /E /I /Y >nul
if errorlevel 1 (
    echo [ERROR] Failed to copy Electron runtime. Check node_modules\electron.
    pause
    exit /b 1
)

echo [3/3] Adding app code...
mkdir "%OUT%\resources\app" 2>nul
for %%f in (main.js preload.js ollama.js index.js homepage.js history.js icons.js date-picker.js date-picker-react.js notes.js index.html homepage.html history.html notes.html tokens.css date-picker.css date-picker-react.css icon.png nanoSecretary.ico package.json) do copy /Y "%%f" "%OUT%\resources\app\%%f" >nul

if exist "%OUT%\resources\default_app.asar" del /q "%OUT%\resources\default_app.asar"
if exist "%OUT%\electron.exe" ren "%OUT%\electron.exe" nanoSecretary.exe

echo.
echo Done!
echo Executable: %OUT%\nanoSecretary.exe
echo.
