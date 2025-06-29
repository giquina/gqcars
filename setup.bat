@echo off
echo 🚀 Setting up GQ Security Platform (Web ^& Mobile)

:: Create project structure
mkdir GQSecurity\web GQSecurity\mobile GQSecurity\shared

:: Set up web project
cd GQSecurity\web
call npx create-next-app@latest . --typescript --tailwind --app --src-dir --router --eslint --import-alias "@/*" --no-git

:: Copy web dependencies
copy ..\..\web-config.json package.json
call npm install

:: Set up mobile project
cd ..\mobile
call npx react-native init GQSecurityApp --template react-native-template-typescript --skip-git

:: Copy mobile dependencies
copy ..\..\mobile-config.json package.json
call npm install

:: Set up shared code
cd ..\shared
call npm init -y
call npm install typescript @types/node --save-dev

:: Create directories
mkdir src\types src\utils src\constants src\api

echo ✅ Project setup complete!
echo.
echo To start the web app:
echo cd GQSecurity\web
echo npm run dev
echo.
echo To start the mobile app:
echo cd GQSecurity\mobile
echo npm start