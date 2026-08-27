@echo off
REM ============================================
REM  nanoSecretary 打包脚本
REM  从本地 node_modules\electron\dist 构建可分发的 exe 程序
REM  不联网、不下载，直接可用
REM ============================================
setlocal
cd /d "%~dp0"

set OUT=release\nanoSecretary-win32-x64

echo [1/3] 清理旧的打包目录...
if exist release rmdir /s /q release

echo [2/3] 拷贝本地 Electron 运行时...
mkdir "%OUT%"
xcopy node_modules\electron\dist\* "%OUT%\" /E /I /Y >nul
if errorlevel 1 (
    echo [错误] 拷贝 Electron 运行时失败，请确认 node_modules\electron 存在
    pause
    exit /b 1
)

echo [3/3] 放入应用代码...
mkdir "%OUT%\resources\app"
copy /Y main.js preload.js ollama.js index.html homepage.html history.html icon.png nanoSecretary.ico package.json "%OUT%\resources\app\" >nul

REM 移除默认 app，改用我们的应用
if exist "%OUT%\resources\default_app.asar" del /q "%OUT%\resources\default_app.asar"

REM 重命名主程序
if exist "%OUT%\electron.exe" ren "%OUT%\electron.exe" nanoSecretary.exe

echo.
echo 打包完成！
echo 可执行文件: %OUT%\nanoSecretary.exe
echo.
pause
