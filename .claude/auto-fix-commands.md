# 🔧 GQ Cars Auto-Fix Commands for Cursor Claude IDE

## 🚀 QUICK FIX COMMAND (Copy this to Cursor)
```bash
cd "C:\Users\Student\Documents\Development_Projects\gqcars-main-production\apps\web" && taskkill /f /im node.exe 2>nul && rm -rf .next && npm install --legacy-peer-deps && npm run dev
```

## 🎯 TELL CURSOR CLAUDE IDE:
"Run the GQ Cars nuclear reset command to fix the website"

## 📱 TEST URL AFTER FIX:
http://localhost:3000

## 🔍 COMMON ISSUES:
- Internal Server Error → Run nuclear reset
- Port in use → Kill processes first
- Module not found → npm install --legacy-peer-deps
- Blank page → Clear .next cache

## 🚨 EMERGENCY RESET:
```bash
cd "C:\Users\Student\Documents\Development_Projects\gqcars-main-production\apps\web"
taskkill /f /im node.exe 2>nul
rm -rf .next node_modules/.cache
npm install --legacy-peer-deps
npm run dev
```
