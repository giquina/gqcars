# 🤖 CLAUDE CODE DEVELOPMENT INSTRUCTIONS

## 🎯 **TOKEN-EFFICIENT CORE PRINCIPLES**

### **⚡ SMART CHECK STRATEGY - AVOID TOKEN WASTE**

**Instead of checking everything for every task, use these efficient approaches:**

#### **🔍 QUICK CHECKS (Low Token Cost):**
```bash
# Only when genuinely uncertain about existing work
ls [specific-target] 2>/dev/null || echo "safe to create"
find . -name "*[exact-keyword]*" -maxdepth 2 -type f | head -3
```

#### **🚫 AVOID EXCESSIVE CHECKING:**
- ❌ Don't run full directory scans for simple tasks
- ❌ Don't grep entire codebase for minor additions
- ❌ Don't check every file before creating new ones
- ❌ Don't verify existing work for obviously new features

#### **✅ WHEN TO CHECK (Token-Worth It):**
- 🔍 Creating files with common names (config.js, utils.js, etc.)
- 🔍 Major structural changes or refactoring
- 🔍 When explicitly unsure if feature exists
- 🔍 Before creating duplicate-prone components

#### **⚡ WHEN TO SKIP CHECKS (Save Tokens):**
- ✅ Obviously new/unique features
- ✅ Files with specific descriptive names
- ✅ Small utility functions or components
- ✅ Documentation or config updates

---

## 📁 **EFFICIENT NAMING CONVENTIONS**

### **Files (Use Descriptive Names to Avoid Duplicates):**
```bash
✅ TOKEN-EFFICIENT NAMING:
- user-profile-card.tsx (specific, unlikely to exist)
- booking-confirmation-email.ts (descriptive, unique)
- admin-dashboard-metrics.js (clear purpose)
- whatsapp-integration-widget.tsx (specific feature)

❌ TOKEN-WASTING GENERIC NAMES:
- component.tsx (requires checking for duplicates)
- utils.js (very likely to exist already)
- helpers.ts (probably already exists)
- index.js (definitely needs checking)
```

### **Directories:**
```bash
✅ EFFICIENT STRUCTURE:
src/
├── components/
│   ├── booking/     # Feature-specific
│   ├── admin/       # Role-specific
│   └── shared/      # Clearly shared
├── services/
│   ├── api/
│   └── integrations/
└── utils/
    ├── validation/  # Purpose-specific
    └── formatting/  # Purpose-specific
```

---

## 🚀 **TOKEN-EFFICIENT WORKFLOW**

### **⚡ FAST EXECUTION APPROACH:**

#### **For 90% of Tasks (Skip Extensive Checks):**
```bash
1. 🎯 READ TASK REQUIREMENTS
2. 🏗️ PLAN IMPLEMENTATION with unique names
3. 🚀 CREATE/IMPLEMENT directly
4. ✅ VERIFY FUNCTIONALITY works
```

#### **For 10% of Tasks (Quick Check Needed):**
```bash
1. 🔍 QUICK CHECK: ls [target-dir] | grep [keyword]
2. 🎯 ASSESS: If similar exists, modify approach
3. 🚀 IMPLEMENT with differentiation
4. ✅ VERIFY no conflicts
```

---

## 🧠 **SMART DECISION MATRIX**

### **When to Check vs Skip:**

| Task Type | Check? | Reason |
|-----------|--------|---------|
| New unique component | ❌ Skip | Descriptive name makes duplicates unlikely |
| Generic utility function | ✅ Quick check | High chance of existing |
| Specific feature implementation | ❌ Skip | Feature-specific, unlikely duplicate |
| Config file modification | ✅ Quick check | Config files commonly exist |
| Documentation update | ❌ Skip | Low risk, easy to merge if needed |
| Database schema change | ✅ Check | High impact if duplicated |

---

## 📋 **EFFICIENT TODO EXECUTION**

### **✅ STREAMLINED PROCESS:**

#### **For Simple Tasks:**
```bash
STEP 1: 📋 Read task
STEP 2: 🚀 Implement with descriptive naming
STEP 3: ✅ Test functionality
DONE ✅
```

#### **For Complex/Uncertain Tasks:**
```bash
STEP 1: 📋 Read task
STEP 2: 🔍 Quick check (1-2 commands max)
STEP 3: 🚀 Implement with adjustments if needed
STEP 4: ✅ Test functionality
DONE ✅
```

---

## 🎯 **TOKEN-SAVING STRATEGIES**

### **🔥 HIGH-IMPACT TOKEN SAVERS:**

#### **1. Use Descriptive, Unique Names:**
```bash
# Instead of checking for "button.tsx"
# Just create "booking-submit-button.tsx"
# Unique name = no check needed = tokens saved
```

#### **2. Batch Related Tasks:**
```bash
# Instead of: check → create → check → create
# Do: plan batch → create all → test batch
```

#### **3. Trust Your Naming:**
```bash
# Good naming conventions eliminate most duplicate risks
# user-authentication-service.ts is unlikely to exist
# No need to check every time
```

#### **4. Use Context Awareness:**
```bash
# If working on NEW feature, components are likely new
# If working on EXISTING feature, check existing patterns
```

---

## 📊 **QUALITY WITHOUT TOKEN WASTE**

### **✅ MAINTAIN QUALITY EFFICIENTLY:**

#### **Code Quality:**
- ✅ Use consistent patterns (follow established style)
- ✅ Meaningful variable/function names
- ✅ Proper error handling
- ✅ Clear, self-documenting code

#### **Structure Quality:**
- ✅ Logical component hierarchy
- ✅ Appropriate separation of concerns
- ✅ Follow established project patterns
- ✅ Use descriptive file/folder names

#### **Integration Quality:**
- ✅ Test functionality after creation
- ✅ Ensure imports/exports work
- ✅ Verify no breaking changes
- ✅ Check console for errors

---

## 🔧 **MINIMAL CHECK COMMANDS**

### **When checks are necessary, keep them minimal:**

```bash
# Quick file existence check
[ -f "target-file.js" ] && echo "exists" || echo "create"

# Fast directory content peek
ls [target-dir] | head -3

# Specific pattern check
find . -name "*auth*" -maxdepth 2 -type f | wc -l

# Quick content search (only when essential)
grep -l "[specific-function]" src/**/*.ts | head -1
```

---

## 🎊 **EFFICIENT SUCCESS CRITERIA**

### **Focus on High-Value Verification:**

#### **✅ Essential Checks:**
- Does the code run without errors?
- Does it fulfill the task requirements?
- Does it follow project naming patterns?
- Is it properly integrated?

#### **⚡ Skip These Token-Heavy Checks:**
- Extensive duplicate searches
- Full codebase consistency audits
- Comprehensive file system scans
- Detailed similarity analysis

---

## 🚀 **IMPLEMENTATION PRIORITY**

### **Token Budget Allocation:**

1. **70% Implementation** - Focus on building features
2. **20% Testing/Verification** - Ensure functionality works
3. **10% Strategic Checking** - Only when genuinely needed

### **Smart Checking Rules:**
- ✅ Check when creating generic/common files
- ✅ Check when modifying existing systems
- ❌ Skip checking for obviously unique features
- ❌ Skip checking for descriptively named files

---

## 🎯 **SUMMARY: EFFICIENT DEVELOPMENT**

**Core Philosophy:**
- **Build first, check only when necessary**
- **Use descriptive naming to prevent duplicates**
- **Focus tokens on implementation, not excessive verification**
- **Trust good naming conventions and project structure**

**Result:**
- **Faster development cycles**
- **Significant token savings**
- **Maintained code quality**
- **Professional, organized output**

---

**🔥 Remember: Smart work over hard work. Good naming and structure eliminate most duplicate risks without expensive checking!**
