#!/bin/bash

# GQ Cars Auto Git Push System
echo "🚀 GQ Cars Auto Git Push System"
echo "================================="

# Navigate to project directory
cd "C:\Users\Student\Desktop\gqcars-frontend" || exit

# Check if we're in a git repository
if [ ! -d ".git" ]; then
    echo "❌ Not a Git repository"
    exit 1
fi

# Add all changes
echo "📁 Adding all changes..."
git add .

# Get current timestamp
TIMESTAMP=$(date +"%Y-%m-%d %H:%M:%S")

# Create commit message
COMMIT_MSG="Auto-update: $TIMESTAMP - WhatsApp widget theme fix + automation setup"

# Commit changes
echo "💾 Committing changes..."
git commit -m "$COMMIT_MSG"

# Push to origin
echo "☁️ Pushing to remote repository..."
git push origin main

echo "✅ Git push completed successfully!"
echo "🔄 All changes synced to repository"
echo "================================="

# Also trigger our sync system
echo "🔄 Triggering local sync..."
"C:\Users\Student\Desktop\gqcars-sync-automation\auto-sync.bat"

echo "🎉 Complete automation cycle finished!"
