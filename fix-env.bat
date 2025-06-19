@echo off
echo 🔧 Fixing GQ Security Environment...

REM Navigate to the project directory
cd /d "%~dp0"

echo 📁 Current directory: %CD%

REM Clean up existing files that might cause conflicts
echo 🧹 Cleaning up existing files...
if exist package-lock.json del package-lock.json
if exist node_modules rmdir /s /q node_modules
if exist .next rmdir /s /q .next

REM Update package.json with all required dependencies
echo 📦 Updating package.json...
(
echo {
echo   "name": "gq-security",
echo   "version": "0.1.0",
echo   "private": true,
echo   "scripts": {
echo     "dev": "next dev -p 3000",
echo     "build": "next build",
echo     "start": "next start -p 3000",
echo     "lint": "next lint"
echo   },
echo   "dependencies": {
echo     "next": "^14.0.3",
echo     "react": "^18.2.0",
echo     "react-dom": "^18.2.0",
echo     "typescript": "^5.2.2",
echo     "@types/node": "^20.8.7",
echo     "@types/react": "^18.2.31",
echo     "@types/react-dom": "^18.2.14",
echo     "tailwindcss": "^3.3.5",
echo     "autoprefixer": "^10.4.16",
echo     "postcss": "^8.4.31",
echo     "clsx": "^2.0.0",
echo     "lucide-react": "^0.290.0",
echo     "framer-motion": "^10.16.4",
echo     "@radix-ui/react-slot": "^1.0.2",
echo     "class-variance-authority": "^0.7.0"
echo   },
echo   "devDependencies": {
echo     "eslint": "^8.52.0",
echo     "eslint-config-next": "^14.0.3"
echo   }
echo }
) > package.json

REM Install dependencies
echo ⬇️  Installing dependencies...
npm install

REM Create or update next.config.js
echo ⚙️  Updating Next.js config...
(
echo /** @type {import('next'^}.NextConfig} */
echo const nextConfig = {
echo   output: 'standalone',
echo   experimental: {
echo     serverActions: {
echo       allowedOrigins: ['localhost:3000', 'localhost:3001']
echo     }
echo   },
echo   env: {
echo     CUSTOM_KEY: process.env.CUSTOM_KEY ^|^| 'default-value'
echo   }
echo }
echo.
echo module.exports = nextConfig
) > next.config.js

REM Create .env.local if it doesn't exist
if not exist .env.local (
  echo 🔐 Creating .env.local...
  (
  echo # Development environment variables
  echo NEXT_PUBLIC_APP_NAME="GQ Security Services"
  echo NEXT_PUBLIC_APP_URL="http://localhost:3000"
  echo.
  echo # Add your environment variables here
  echo # DATABASE_URL=your_database_url
  echo # API_KEY=your_api_key
  ) > .env.local
)

echo ✅ Environment fixed successfully!
echo.
echo 🚀 Now, please do the following:
echo 1. Keep this command prompt open
echo 2. Run: npm run dev
echo 3. Visit: http://localhost:3000
echo.

pause
