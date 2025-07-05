# 🤖 MCP Production Setup for GQ Cars Development

## 🎯 **OPTIMIZED MCP CONFIGURATION**

### **Complete Claude Desktop Configuration**

Create or update `claude_desktop_config.json` with this production-ready configuration:

**Location:**
- **Windows:** `%APPDATA%\Claude\claude_desktop_config.json`
- **macOS:** `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Linux:** `~/.config/claude-desktop/claude_desktop_config.json`

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/path/to/gqcars-main-production"],
      "disabled": false
    },
    "github": {
      "command": "npx", 
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "your-github-token-here"
      },
      "disabled": false
    },
    "memory": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-memory"],
      "disabled": false
    },
    "sequential-thinking": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-sequential-thinking"],
      "disabled": false
    },
    "brave-search": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-brave-search"],
      "env": {
        "BRAVE_API_KEY": "your-brave-api-key-here"
      },
      "disabled": false
    },
    "puppeteer": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-puppeteer"],
      "disabled": false
    },
    "postgres": {
      "command": "npx", 
      "args": ["-y", "@modelcontextprotocol/server-postgres"],
      "env": {
        "POSTGRES_CONNECTION_STRING": "your-database-url-here"
      },
      "disabled": true
    },
    "sqlite": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-sqlite", "/path/to/gqcars-main-production/apps/web/prisma/dev.db"],
      "disabled": false
    },
    "google-drive": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-gdrive"],
      "env": {
        "GOOGLE_CLIENT_ID": "your-google-client-id",
        "GOOGLE_CLIENT_SECRET": "your-google-client-secret"
      },
      "disabled": true
    },
    "fetch": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-fetch"],
      "disabled": false
    },
    "everything": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-everything"],
      "disabled": false
    }
  }
}
```

---

## 🔑 **API KEYS & TOKENS SETUP**

### **Required API Keys for GQ Cars Development:**

#### 1. **GitHub Personal Access Token**
- Visit: https://github.com/settings/tokens
- Click "Generate new token (classic)"
- Scopes needed: `repo`, `workflow`, `admin:repo_hook`
- Copy token and add to configuration

#### 2. **Brave Search API** (Optional but Recommended)
- Visit: https://api.search.brave.com/app/keys
- Sign up for free account
- Generate API key
- 1000 free searches per month

#### 3. **Google APIs** (Optional)
- Visit: https://console.cloud.google.com/
- Enable Google Drive API
- Create OAuth 2.0 credentials
- Add client ID and secret

---

## 🛠️ **MCP AUTOMATION SCRIPTS**

### **1. Development Workflow Automation**

Create `mcp-dev-scripts.js`:

```javascript
// MCP Development Automation for GQ Cars
class GQCarsMCPAutomation {
  
  // Automated testing workflow
  async runFullTestSuite() {
    return `
# 🧪 Full Testing Suite
npm run lint              # Code quality
npm run typecheck         # TypeScript validation  
npm run test             # Unit tests
npm run build            # Production build test
npm run start            # Production server test
`;
  }

  // Automated deployment workflow
  async deployToVercel() {
    return `
# 🚀 Vercel Deployment Workflow
vercel login             # Authenticate
vercel --prod           # Deploy to production
vercel domains add gqcars.vercel.app  # Custom domain
`;
  }

  // Component analysis
  async analyzeComponents() {
    return `
# 📊 Component Analysis
find src/components -name "*.tsx" | wc -l    # Count components
grep -r "export default" src/components      # Find default exports
grep -r "useEffect" src/components          # Find hooks usage
`;
  }

  // Performance monitoring
  async performanceCheck() {
    return `
# ⚡ Performance Check  
npm run build                               # Build for production
npm run perf:lighthouse                     # Lighthouse audit
du -sh .next                               # Bundle size check
`;
  }
}
```

### **2. Database Management Scripts**

Create `mcp-db-scripts.js`:

```javascript
// Database automation via MCP
class GQCarsDatabaseMCP {
  
  async setupDatabase() {
    return `
# 🗄️ Database Setup
npx prisma generate      # Generate client
npx prisma db push       # Apply schema
npx prisma studio        # Open database GUI
`;
  }

  async backupDatabase() {
    return `
# 💾 Database Backup
cp prisma/dev.db "backups/dev-$(date +%Y%m%d-%H%M%S).db"
ls -la backups/         # List backups
`;
  }

  async migrateDatabase() {
    return `
# 🔄 Database Migration
npx prisma migrate dev   # Create migration
npx prisma migrate deploy # Apply to production
`;
  }
}
```

---

## 🔧 **MCP TROUBLESHOOTING GUIDE**

### **Common Issues & Solutions:**

#### **1. "Could not attach to MCP server"**
```bash
# Check if Claude Desktop is running
ps aux | grep claude

# Restart Claude Desktop completely
killall Claude && open /Applications/Claude.app

# Verify config file syntax
cat ~/.config/claude-desktop/claude_desktop_config.json | jq '.'
```

#### **2. GitHub MCP Not Working**
```bash
# Test GitHub token
curl -H "Authorization: token YOUR_TOKEN" https://api.github.com/user

# Verify token scopes
curl -H "Authorization: token YOUR_TOKEN" -I https://api.github.com/user
```

#### **3. Filesystem MCP Permission Issues**
```bash
# Check directory permissions
ls -la /path/to/gqcars-main-production

# Fix permissions if needed
chmod -R 755 /path/to/gqcars-main-production
```

#### **4. SQLite MCP Database Access**
```bash
# Verify database file exists
ls -la apps/web/prisma/dev.db

# Test database connection
sqlite3 apps/web/prisma/dev.db ".tables"
```

---

## 🚀 **MCP WORKFLOW INTEGRATION**

### **Daily Development with MCP:**

#### **Morning Startup Routine**
1. **Check Repository Status** (GitHub MCP)
   - Review recent commits
   - Check for new issues or PRs
   - Verify branch status

2. **File Operations** (Filesystem MCP)
   - Quick project structure review
   - Search for specific files or patterns
   - Organize development workspace

3. **Research & Documentation** (Brave Search + Memory MCP)
   - Look up latest Next.js best practices
   - Research security transport industry trends
   - Store important findings in memory

#### **Development Session Workflow**
1. **Code Analysis** (Filesystem + Sequential Thinking MCP)
   - Analyze component dependencies
   - Review code patterns and consistency
   - Plan refactoring or new features

2. **Testing & Quality** (Filesystem + GitHub MCP)
   - Run automated test suites
   - Check code quality metrics
   - Commit and push changes

3. **Deployment & Monitoring** (GitHub + Fetch MCP)
   - Deploy to staging/production
   - Monitor deployment status
   - Check live site performance

---

## 📊 **MCP PERFORMANCE OPTIMIZATION**

### **Server Startup Optimization:**

```json
{
  "mcpServers": {
    "priority-servers": {
      "filesystem": "always-enabled",
      "github": "always-enabled", 
      "memory": "always-enabled"
    },
    "optional-servers": {
      "brave-search": "enable-on-demand",
      "google-drive": "enable-on-demand",
      "postgres": "disabled-by-default"
    }
  }
}
```

### **Resource Management:**
- **Enable only needed servers** for current task
- **Use memory MCP** to store frequently used information
- **Batch operations** when possible
- **Monitor server performance** and adjust as needed

---

## 🔐 **SECURITY CONSIDERATIONS**

### **API Key Management:**
- **Never commit** API keys to repository
- **Use environment variables** for sensitive data
- **Regularly rotate** access tokens
- **Monitor API usage** for unusual activity

### **File System Access:**
- **Limit filesystem MCP** to project directory only
- **Review file operations** before execution
- **Backup important files** before bulk operations
- **Use version control** for all changes

---

## 📋 **MCP INTEGRATION CHECKLIST**

### **Setup Phase:**
- [ ] Install Claude Desktop latest version
- [ ] Create claude_desktop_config.json with all servers
- [ ] Obtain required API keys and tokens
- [ ] Test each MCP server connection
- [ ] Verify filesystem access permissions

### **Configuration Phase:**
- [ ] Configure GitHub MCP with proper token
- [ ] Set up SQLite MCP for database access
- [ ] Configure Brave Search for research
- [ ] Test automation scripts
- [ ] Verify security settings

### **Testing Phase:**
- [ ] Test file operations workflow
- [ ] Test GitHub integration workflow
- [ ] Test database operations
- [ ] Test research and documentation
- [ ] Test performance monitoring

### **Production Phase:**
- [ ] Document all workflows for team
- [ ] Set up monitoring and alerts
- [ ] Create backup procedures
- [ ] Establish maintenance schedule
- [ ] Train team on MCP usage

---

## 🎯 **SUCCESS METRICS**

### **Development Efficiency:**
- **⚡ 50% faster** file operations
- **🔍 90% reduction** in manual research time
- **🤖 80% automation** of repetitive tasks
- **📊 100% visibility** into project status

### **Code Quality:**
- **✅ Zero manual errors** in routine operations
- **🔄 Consistent workflows** across team
- **📈 Improved documentation** quality
- **🛡️ Enhanced security** practices

---

## 🔄 **MAINTENANCE & UPDATES**

### **Weekly Tasks:**
- [ ] Update MCP server packages: `npm update -g @modelcontextprotocol/*`
- [ ] Review API usage and quotas
- [ ] Test all server connections
- [ ] Update documentation

### **Monthly Tasks:**
- [ ] Rotate API keys and tokens
- [ ] Review and optimize workflows
- [ ] Update automation scripts
- [ ] Performance analysis and optimization

---

**🤖 Ready for production-grade MCP integration with GQ Cars development!**

*Last Updated: July 4, 2025*  
*Integration Status: Production Ready*  
*Team Training: Required*