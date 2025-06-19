@echo off
cd "C:\Users\Student\Desktop\gqcars"
echo ============================================
echo    PUSHING TO GITHUB - GQ CARS UPDATES
echo ============================================
echo 🔧 Adding all changes...
git add .
echo 📝 Committing with updated pricing and mobile fixes...
git commit -m "feat: Updated pricing to premium security rates, fixed mobile design, improved realism"
echo 🚀 Ready to push to GitHub...
echo.
echo CHANGES INCLUDED:
echo ✅ Doubled pricing to reflect premium security service
echo ✅ Fixed mobile alignment and formatting
echo ✅ Updated "0s wait time" to realistic "2min response time"
echo ✅ Improved text alignment across all sections
echo ✅ Enhanced design consistency
echo.
echo To push to GitHub, run: git push origin main
echo (You'll need to set up remote repository first if not done)
echo.
pause
