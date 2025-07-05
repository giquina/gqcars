# 🚗 GQ Cars LTD - Premium Security Transport Platform

**🌐 Live Production Website:** https://web-8wyt5fr24-giquinas-projects.vercel.app

> AI-powered security taxi service with SIA Licensed Close Protection Officers

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/giquina/gqcars)
[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-06B6D4)](https://tailwindcss.com/)
[![Claude Code Integration](https://img.shields.io/badge/Claude%20Code-Integrated-blue)](https://claude.ai/code)
[![MCP Enabled](https://img.shields.io/badge/MCP-Enabled-green)](https://modelcontextprotocol.io)
[![Cursor Compatible](https://img.shields.io/badge/Cursor-Compatible-purple)](https://cursor.sh)
[![GitHub Codespaces](https://img.shields.io/badge/Codespaces-Ready-brightgreen)](https://github.com/features/codespaces)

## 🎯 **Project Status: PRODUCTION READY ✅**

- **✅ Website Live & Functional** - All 45+ components operational
- **✅ 12 Service Pages Complete** - Comprehensive service portfolio  
- **✅ AI Integration Active** - Claude chat and security assessment
- **✅ Claude Code Integrated** - Full MCP support with 10+ servers
- **✅ Mobile Optimized** - Responsive design for all devices
- **✅ SEO Optimized** - Search engine ready with sitemap
- **✅ Vercel Deployed** - Production environment with SSL
- **✅ Codespaces Ready** - One-click cloud development setup

## 🤖 **Claude Code Integration**

**Professional AI-assisted development environment with full MCP support.**

### **Quick Start with Claude Code**
```bash
# Start Claude Code integration
./start-all.sh

# Check system status
./ide status

# Open in Cursor with Claude assistance
cursor .
```

### **Enabled MCP Servers** (10 servers configured)
- `filesystem` - File system access and manipulation
- `memory` - Persistent knowledge graphs
- `sequential-thinking` - Advanced reasoning workflows
- `everything` - Testing and debugging utilities
- `github` - GitHub repository integration
- `git` - Local git repository management
- `sqlite` - Database query and management
- `brave-search` - Web search capabilities
- `puppeteer` - Browser automation
- `fetch` - HTTP request handling

### **Professional Tools**
- **IDE Server**: http://localhost:8080
- **Command Interface**: `./ide <command>`
- **Automated Setup**: `./ide setup`
- **Health Monitoring**: `./ide health`

**📋 Complete Guide**: [`docs/SETUP-COMPLETE.md`](./SETUP-COMPLETE.md)

## 🚀 **Quick Start with GitHub Codespaces** ⏱️ *2 minutes*

### **Instant Development**
1. **Create Codespace**: Click **"Code"** → **"Codespaces"** → **"Create codespace"**
2. **Auto Setup**: Wait 2-3 minutes for automated environment setup
3. **Start Coding**: Run `cd apps/web && npm run dev`
4. **View Website**: Opens automatically at http://localhost:3000

**📖 Full Guide:** [CODESPACES-QUICKSTART.md](./CODESPACES-QUICKSTART.md) | **📋 Detailed Plan:** [GITHUB-CODESPACES-PLAN.md](./GITHUB-CODESPACES-PLAN.md)

## 🚗 About GQ Cars

GQ Cars LTD provides premium security transport services with SIA Licensed Close Protection Officers. Our AI-powered platform offers real-time booking, security assessments, and live tracking for VIP clients, corporate accounts, and security-conscious travelers.

### ✨ Key Features

- **🛡️ SIA Licensed Close Protection Officers**
- **🤖 AI-Powered Security Assessment**
- **📱 Real-time Booking & Tracking**
- **💳 Secure Payment Processing (Stripe)**
- **🗺️ Google Maps Integration**
- **📞 24/7 WhatsApp Support**
- **🔄 Live Notifications System**
- **📊 Advanced Analytics Dashboard**

## 🏗️ Architecture

This is a modern Next.js 14 monorepo built with:

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript with strict mode
- **Styling**: Tailwind CSS with custom design system
- **Database**: Prisma ORM with SQLite
- **Authentication**: NextAuth + Supabase
- **Payments**: Stripe integration
- **Maps**: Google Maps API
- **AI**: Anthropic Claude integration
- **Analytics**: Google Analytics 4

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/giquina/gqcars.git
cd gqcars

# Install dependencies
cd apps/web
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your API keys

# Initialize database
npx prisma generate
npx prisma db push

# Start development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the application.

## 📁 Project Structure

```
gqcars/
├── apps/
│   └── web/                    # Main Next.js application
│       ├── src/
│       │   ├── app/           # Next.js App Router
│       │   ├── components/    # UI components
│       │   ├── lib/          # Utilities & integrations
│       │   └── types/        # TypeScript definitions
│       ├── prisma/           # Database schema
│       └── public/           # Static assets
├── packages/                   # Shared packages (future)
├── .devcontainer/             # Codespaces configuration
├── .github/                   # GitHub workflows
├── vercel.json               # Vercel deployment config
├── .gitignore               # Git ignore rules
└── README.md                # This file
```

## 🛠️ Development

### Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server

# Quality Assurance
npm run lint         # Run ESLint
npm run typecheck    # TypeScript type checking
npm run test         # Run Jest tests

# Database
npx prisma generate  # Generate Prisma client
npx prisma db push   # Apply schema changes
npx prisma studio    # Open database GUI
```

### Environment Variables

Required environment variables for `.env.local`:

```bash
# Database
DATABASE_URL=file:../prisma/dev.db

# Authentication
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-here

# Supabase
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-key

# Stripe
STRIPE_PUBLIC_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...

# Google Maps
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your-maps-key

# AI Integration
CLAUDE_API_KEY=your-anthropic-key
```

## 🎨 Design System

The application uses a **Bold Dynamic** design theme featuring:

- **Colors**: Blue-purple gradients with black backgrounds
- **Typography**: Bold fonts with gradient text effects
- **Animations**: Ping circles, bouncing particles, lightning bolts
- **Layout**: Mobile-first responsive design
- **Components**: 44+ custom UI components

## 🚢 Deployment

### Vercel (Recommended)

1. **Connect Repository**: Link your GitHub repository to Vercel
2. **Configure Build**: Vercel will automatically detect Next.js settings
3. **Set Environment Variables**: Add your production environment variables
4. **Deploy**: Push to main branch triggers automatic deployment

### Manual Deployment

```bash
# Build the application
cd apps/web
npm run build

# Start production server
npm run start
```

## 🔒 Security

- **Input Validation**: Zod schemas for all forms
- **Authentication**: Secure session management with NextAuth
- **Payment Security**: PCI-compliant Stripe integration
- **CSP Headers**: Content Security Policy implementation
- **SIA Compliance**: Security industry standards

## 📊 Performance

- **Lighthouse Score**: 95+ across all metrics
- **Bundle Size**: Optimized with dynamic imports
- **Caching**: Redis for session storage
- **CDN**: Vercel Edge Network
- **Images**: Next.js Image optimization

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Support

- **Website**: [gqsecurity.co.uk](https://gqsecurity.co.uk)
- **Email**: support@gqsecurity.co.uk
- **WhatsApp**: +44 7XXX XXXXXX
- **Documentation**: [docs.gqsecurity.co.uk](https://docs.gqsecurity.co.uk)

## 📄 License

This project is proprietary software. All rights reserved.

---

**GQ Cars LTD** - Premium Security Transport Services