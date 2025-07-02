# Quick MCP Setup - Minimal version for testing
# Run this if you already have Docker and Node.js installed

param(
    [string]$NotionToken = "ntn_F20499864643jqMFipY5LNc3nG0FcKkoIUOJviWq8pt13z"
)

Write-Host "🚀 Quick MCP Setup for Claude Desktop" -ForegroundColor Cyan

# Create Claude directory
$claudeDir = "$env:APPDATA\Claude"
if (-not (Test-Path $claudeDir)) {
    New-Item -ItemType Directory -Path $claudeDir -Force | Out-Null
    Write-Host "✅ Created Claude directory" -ForegroundColor Green
}

# Generate config
$config = @{
    mcpServers = @{
        "notion" = @{
            command = "docker"
            args = @("run", "--rm", "-i", "notionhq/notion-mcp-server")
            env = @{
                "NOTION_API_KEY" = $NotionToken
            }
        }
        "playwright" = @{
            command = "npx"
            args = @("-y", "@modelcontextprotocol/server-playwright")
        }
        "docker" = @{
            command = "npx"
            args = @("-y", "@modelcontextprotocol/server-docker")
        }
    }
}

$configPath = "$claudeDir\claude_desktop_config.json"

# Backup existing config
if (Test-Path $configPath) {
    Copy-Item $configPath "$configPath.backup" -Force
    Write-Host "✅ Backed up existing config" -ForegroundColor Green
}

# Write new config
$config | ConvertTo-Json -Depth 10 | Out-File -FilePath $configPath -Encoding UTF8 -Force
Write-Host "✅ Configuration written to: $configPath" -ForegroundColor Green

# Pull Docker image
Write-Host "🐳 Pulling Notion MCP Docker image..." -ForegroundColor Yellow
docker pull notionhq/notion-mcp-server

Write-Host "🎉 Setup complete! Restart Claude Desktop to use MCP servers." -ForegroundColor Green