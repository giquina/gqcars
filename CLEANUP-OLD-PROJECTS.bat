@echo off
echo.
echo ========================================
echo   CLEANING UP OLD GQ CARS PROJECTS
echo ========================================
echo.
echo This will remove old/duplicate GQ Cars folders
echo to prevent confusion.
echo.
echo KEEPING: gqcars-main-production (THE MAIN PROJECT)
echo.
echo The following folders will be DELETED:
echo - gqcars-latest
echo - gqcars-backups  
echo - gqcars-frontend-backup
echo - GQ-CARS-ARCHIVE
echo.
set /p confirm="Are you sure? Type 'YES' to continue: "

if /i "%confirm%"=="YES" (
    echo.
    echo Cleaning up old projects...
    
    cd /d "C:\Users\Student\Documents\Development_Projects"
    
    if exist "gqcars-latest" (
        echo Removing gqcars-latest...
        rmdir /s /q "gqcars-latest"
    )
    
    if exist "gqcars-backups" (
        echo Removing gqcars-backups...
        rmdir /s /q "gqcars-backups"
    )
    
    if exist "gqcars-frontend-backup" (
        echo Removing gqcars-frontend-backup...
        rmdir /s /q "gqcars-frontend-backup"
    )
    
    if exist "GQ-CARS-ARCHIVE" (
        echo Removing GQ-CARS-ARCHIVE...
        rmdir /s /q "GQ-CARS-ARCHIVE"
    )
    
    echo.
    echo ========================================
    echo   CLEANUP COMPLETE!
    echo ========================================
    echo.
    echo Only the main project remains:
    echo - gqcars-main-production
    echo.
    echo Use START-GQCARS-MAIN.bat to run the website.
    echo.
) else (
    echo.
    echo Cleanup cancelled.
    echo.
)

pause
