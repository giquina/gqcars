#!/bin/bash
# 🛡️ GQ Cars Daily Backup Script

BACKUP_DIR="/mnt/c/Users/Student/Backups/gqcars-daily"
PROJECT_DIR="/mnt/c/Users/Student/Documents/Development_Projects/gqcars-main-production"
DATE=$(date +%Y%m%d_%H%M%S)

echo "🛡️ Starting daily backup: $DATE"

# Create backup directory
mkdir -p "$BACKUP_DIR/$DATE"

# 1. Agent System (Critical)
echo "📁 Backing up agent system..."
cp -r "$PROJECT_DIR/.agents" "$BACKUP_DIR/$DATE/" 2>/dev/null || echo "⚠️ Agent system not found"

# 2. Documentation (Critical)  
echo "📚 Backing up documentation..."
cp "$PROJECT_DIR"/*.md "$BACKUP_DIR/$DATE/" 2>/dev/null || echo "⚠️ No markdown files found"

# 3. Startup Scripts (Critical)
echo "🚀 Backing up startup scripts..."
cp "$PROJECT_DIR"/*.ps1 "$PROJECT_DIR"/*.sh "$BACKUP_DIR/$DATE/" 2>/dev/null || echo "⚠️ Some scripts not found"

# 4. Configuration Files
echo "⚙️ Backing up configurations..."
cp "$PROJECT_DIR/package.json" "$BACKUP_DIR/$DATE/" 2>/dev/null || true
cp "$PROJECT_DIR/apps/web/package.json" "$BACKUP_DIR/$DATE/web-package.json" 2>/dev/null || true

# 5. Git commit info
echo "📝 Saving git state..."
cd "$PROJECT_DIR"
git log --oneline -10 > "$BACKUP_DIR/$DATE/git-recent-commits.txt" 2>/dev/null || echo "Git info unavailable"
git status > "$BACKUP_DIR/$DATE/git-status.txt" 2>/dev/null || echo "Git status unavailable"

# 6. System state
echo "📊 Saving system state..."
if [ -f "$PROJECT_DIR/status-check.sh" ]; then
    "$PROJECT_DIR/status-check.sh" > "$BACKUP_DIR/$DATE/system-status.txt" 2>&1
else
    echo "Status check script not found" > "$BACKUP_DIR/$DATE/system-status.txt"
fi

# 7. Cleanup old backups (keep 7 days)
find "$BACKUP_DIR" -maxdepth 1 -type d -name "20*" -mtime +7 -exec rm -rf {} \; 2>/dev/null

# 8. Create backup summary
echo "📋 Creating backup summary..."
{
    echo "=== GQ Cars Daily Backup Summary ==="
    echo "Date: $DATE"
    echo "Backup Location: $BACKUP_DIR/$DATE"
    echo ""
    echo "Files backed up:"
    ls -la "$BACKUP_DIR/$DATE"
    echo ""
    echo "Backup size: $(du -sh "$BACKUP_DIR/$DATE" | cut -f1)"
} > "$BACKUP_DIR/$DATE/backup-summary.txt"

echo "✅ Daily backup complete: $BACKUP_DIR/$DATE"
echo "📊 Backup size: $(du -sh "$BACKUP_DIR/$DATE" | cut -f1)"
ls -la "$BACKUP_DIR/$DATE"