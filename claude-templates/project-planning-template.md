# TaskMaster AI Project Plan Template
*Universal template for Claude to create professional, dependency-aware project plans*

## 📋 Template Instructions for Claude

**When a user provides a project idea, use this template to create a comprehensive TaskMaster-style project plan:**

### 🎯 Project Setup Framework

**1. PROJECT DISCOVERY PHASE**
```
- Analyze user's project type and requirements
- Identify tech stack and platform needs
- Determine target audience and business goals
- Map out core MVP features vs. nice-to-have features
```

**2. PRD (Project Requirements Document) Structure**
```markdown
# [PROJECT NAME] - Project Requirements Document

## Business Overview
- **Project Type**: [Web App/Mobile App/SaaS/E-commerce/etc.]
- **Target Market**: [Demographics, geography, industry]
- **Primary Goal**: [Lead generation/Sales/Information/etc.]
- **Success Metrics**: [Specific, measurable outcomes]

## Technical Architecture
- **Frontend**: [Framework, styling, components]
- **Backend**: [API, database, authentication]
- **Hosting**: [Platform, CDN, domain strategy]
- **Integrations**: [Third-party services, APIs]

## User Stories & Features
[Detailed feature breakdown with acceptance criteria]
```

**3. TASK MANAGEMENT SYSTEM**

Create tasks using this structure:
```
| Task ID | Title | Status | Priority | Dependencies | Complexity | Estimate | Phase |
|---------|-------|--------|----------|--------------|------------|----------|-------|
| T001    | Setup | 🔄     | Critical | None         | Simple     | 2h       | 1     |
```

**Status Options**: 🔄 In Progress, ✅ Complete, ⏸️ Blocked, 📝 Not Started, ⚠️ Review Needed

**Priority Levels**: 🔴 Critical, 🟠 High, 🟡 Medium, 🟢 Low

**Complexity Scale**: 
- 🟢 Simple (< 4 hours)
- 🟡 Medium (4-8 hours) 
- 🟠 Complex (8-16 hours)
- 🔴 Expert (16+ hours, requires research)

### 🏗️ Phase Structure Template

**PHASE 1: Foundation & Setup**
- Project initialization and configuration
- Basic structure and core dependencies
- Development environment setup

**PHASE 2: Core Features Development**
- Primary user-facing features
- Essential business logic
- Core user flows

**PHASE 3: Enhancement & Integration**
- Advanced features and integrations
- Third-party service connections
- Performance optimization

**PHASE 4: Launch Preparation**
- Testing, security, and quality assurance
- Deployment and production setup
- Marketing and analytics implementation

**PHASE 5: Post-Launch & Growth**
- Monitoring and maintenance
- User feedback integration
- Scaling and optimization

### 📊 Quality Framework

**Quality Gates for Each Phase:**
- [ ] Code review completed
- [ ] Performance benchmarks met
- [ ] Security scan passed
- [ ] Mobile responsiveness verified
- [ ] Accessibility standards met
- [ ] SEO optimization implemented

**Testing Requirements:**
- Unit tests for critical functions
- Integration tests for user flows
- Performance testing (Core Web Vitals)
- Cross-browser compatibility
- Mobile device testing

### 🎨 Visual Presentation Standards

**Use these formatting elements:**
- **Progress bars**: `████████░░ 80%`
- **Status badges**: `🔄 IN PROGRESS` `✅ COMPLETE`
- **Priority indicators**: `🔴 CRITICAL` `🟠 HIGH`
- **Time estimates**: `⏱️ 2-4 hours` `📅 Due: [Date]`
- **Dependencies**: `⚡ Depends on: T001, T003`

### 🔄 Dependency Mapping Rules

**Always include dependency chains:**
- Database setup → API endpoints → Frontend integration
- Authentication → User management → Protected routes
- Design system → Components → Page implementation
- Content strategy → SEO setup → Analytics

### 📈 Success Metrics Template

**Technical KPIs:**
- Page load speed: < 3 seconds
- Mobile performance: > 90 Lighthouse score
- Uptime: > 99.9%
- Security: A+ SSL rating

**Business KPIs:**
- [Project-specific metrics based on goals]
- Conversion rates, user engagement, etc.

### 🛠️ Cursor Rules Integration

**Automatically generate Cursor rules for:**
- Code style and formatting standards
- Error handling patterns
- Security best practices
- Performance optimization guidelines
- Project-specific conventions

---

## 🚀 Usage Instructions

**To use this template, simply say:**
*"Create a TaskMaster project plan using the template for: [YOUR PROJECT DESCRIPTION]"*

**Claude will then:**
1. Analyze your project requirements
2. Create a customized PRD
3. Generate phase-based task breakdown
4. Map dependencies and complexity
5. Set up quality gates and success metrics
6. Provide Cursor rules and development guidelines

**The output will be a professional, stakeholder-ready project plan that can be used with TaskMaster AI or any project management system.**

# Additional Templates

## 📁 Template Library Structure
```
claude-templates/
├── project-planning-template.md
├── business-plan-template.md
├── technical-spec-template.md
├── marketing-strategy-template.md
└── README.md
```

## 🔄 Version Control
- **Version**: 1.0
- **Last Updated**: December 2024
- **Compatibility**: Claude Sonnet 4, TaskMaster AI, Cursor IDE
