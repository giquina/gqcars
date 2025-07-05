# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 📋 **ENHANCED STANDARD WORKFLOW**

### **Phase 1: Enhanced Planning**
1. **Think through the problem, read codebase, estimate time (be realistic!), assess risks, and write detailed plan to tasks/todo.md**
2. **Plan must include: specific todo items, time estimates, dependencies, potential risks, and rollback procedures**
3. **Get explicit approval before starting: present plan and wait for "proceed" confirmation**

### **Phase 2: Safe Execution**
4. **Create safety checkpoint: commit current state or create git branch before any changes**
5. **Work incrementally: complete one small task, test it works, mark as done, then move to next**
6. **Communicate continuously: explain what you're doing and confirm nothing is broken before proceeding**

### **Phase 3: Quality & Simplicity**
7. **Simplicity rule: if any task becomes complex, STOP immediately and break it into smaller tasks**
8. **Test everything: run the application after each change to ensure functionality is preserved**
9. **Fail-safe protocol: if anything breaks, immediately rollback to last working state and reassess**

### **Phase 4: Documentation & Learning**
10. **Comprehensive review: document changes made, lessons learned, what worked/didn't work, and recommended next steps**

---

## 🚨 **CRITICAL PRINCIPLES**

### **Time Management:**
- Set realistic time estimates
- If stuck > 15 minutes, ask for help or step away briefly
- Maximum 30 minutes per individual task
- Take breaks only when frustrated or switching contexts

### **Safety First:**
- Always have a rollback plan
- Test before proceeding
- Never make multiple complex changes simultaneously
- Preserve working state at all times

### **Communication:**
- Explain what you're about to do BEFORE doing it
- Report what you just did AFTER doing it
- Ask permission before major changes
- Escalate immediately if confused

### **Quality Gates:**
- Code must compile/build before proceeding
- App must start successfully after each change
- No broken functionality tolerated
- Performance impact must be considered

---

## 🏗️ **PROJECT CONTEXT**

**Project:** GQ Cars LTD - Premium Security Transport Platform  
**Tech Stack:** Next.js 14, TypeScript, Tailwind, Prisma, Supabase  
**Structure:** Monorepo with apps/web as main application  
**Status:** Production-ready website with 45+ components  

**Key Commands:**
```bash
cd apps/web
npm run dev    # Start development server
npm run build  # Build for production
```

**That's it. Keep it simple.**
