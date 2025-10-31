@echo off
REM Setup script for Fake News Detection Frontend

echo 🚀 Setting up Fake News Detection Frontend...

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Node.js is not installed. Please install Node.js first.
    exit /b 1
)

for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
echo ✅ Node.js version: %NODE_VERSION%

REM Check if npm is installed
where npm >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ npm is not installed. Please install npm first.
    exit /b 1
)

for /f "tokens=*" %%i in ('npm --version') do set NPM_VERSION=%%i
echo ✅ npm version: %NPM_VERSION%

REM Install dependencies
echo 📦 Installing dependencies...
call npm install

REM Create .env file if it doesn't exist
if not exist .env (
    echo 📝 Creating .env file...
    copy .env.example .env
    echo ✅ .env file created. Please update it with your configuration.
) else (
    echo ✅ .env file already exists.
)

echo ✨ Setup complete!
echo.
echo 📚 Next steps:
echo 1. Update .env file with your backend API URL
echo 2. Run 'npm start' to start the development server
echo 3. Open http://localhost:3000 in your browser
echo.
echo 📖 For more information, see README_UI.md
