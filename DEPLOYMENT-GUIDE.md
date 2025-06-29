# 🚀 GQ Cars Website - Deployment Guide

This guide covers everything needed to deploy the GQ Cars website to production.

## 📋 Pre-Deployment Checklist

### ✅ **Completed Automatically:**
- [x] Google Analytics integration
- [x] Error tracking and monitoring
- [x] Email notification system
- [x] Stripe webhook configuration
- [x] Performance optimizations
- [x] Security headers and CSP
- [x] Favicon and manifest files
- [x] Environment variables template

### 🔄 **Manual Steps Required:**

#### **1. Install Dependencies**
```bash
cd /mnt/c/Users/Student/Documents/Development_Projects/gqcars-main-production/apps/web
npm install
```

#### **2. Test Local Development**
```bash
npm run dev
```
Expected: Website runs on `http://localhost:3000`

#### **3. Push to GitHub**
```bash
git push origin main
```
Requires: Your GitHub authentication

---

## 🌐 **Vercel Deployment**

### **Step 1: Connect Repository**
1. Go to [vercel.com](https://vercel.com)
2. Sign in with GitHub
3. Click "Import Project"
4. Select `gqcars-main-production` repository
5. Set build settings:
   - **Framework**: Next.js
   - **Root Directory**: `apps/web`
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`

### **Step 2: Environment Variables**
Add these in Vercel dashboard under "Settings > Environment Variables":

```bash
# Authentication
NEXTAUTH_URL=https://your-vercel-domain.vercel.app
NEXTAUTH_SECRET=your-nextauth-secret-here

# Database (for production, use PostgreSQL)
DATABASE_URL=your-production-database-url

# Stripe
STRIPE_PUBLIC_KEY=pk_live_...  # Use live keys for production
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Google Services
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=AIzaSyDGz8TAQuQeLePTBdXdqODfFEQ0Nm9gjPU
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://atjiphyvxzsdpmsguvoo.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Email (SendGrid recommended)
SENDGRID_API_KEY=SG.your-sendgrid-key
FROM_EMAIL=noreply@gqsecurity.co.uk
COMPANY_EMAIL=bookings@gqsecurity.co.uk

# App Configuration
APP_NAME="GQ Cars LTD"
COMPANY_PHONE=07407655203
```

### **Step 3: Deploy**
1. Click "Deploy"
2. Wait for build to complete
3. Test your live website

---

## 🔧 **Post-Deployment Configuration**

### **Google Analytics Setup**
1. Create Google Analytics account
2. Create property for your website
3. Copy Measurement ID (G-XXXXXXXXXX)
4. Add to Vercel environment variables as `NEXT_PUBLIC_GA_MEASUREMENT_ID`

### **Stripe Webhook Configuration**
1. Go to Stripe Dashboard > Webhooks
2. Add endpoint: `https://your-domain.vercel.app/api/webhooks/stripe`
3. Select events:
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
   - `checkout.session.completed`
4. Copy webhook secret to `STRIPE_WEBHOOK_SECRET`

### **Email Service Setup (SendGrid)**
1. Create SendGrid account
2. Verify sender identity
3. Create API key
4. Add to environment variables
5. Test email functionality

---

## 🌍 **Custom Domain Setup**

### **Step 1: Add Domain in Vercel**
1. Go to Vercel dashboard > Project > Settings > Domains
2. Add `gqsecurity.co.uk`
3. Add `www.gqsecurity.co.uk`

### **Step 2: Configure DNS**
Add these records with your domain provider:

```
Type: A
Name: @
Value: 76.76.19.61

Type: CNAME  
Name: www
Value: cname.vercel-dns.com
```

### **Step 3: Update Environment Variables**
Change `NEXTAUTH_URL` to `https://gqsecurity.co.uk`

---

## 📊 **Monitoring & Analytics**

### **Performance Monitoring**
- Core Web Vitals automatically tracked
- Performance metrics in Vercel dashboard
- Google Analytics for user behavior

### **Error Tracking**
- Built-in error logging to `/api/errors`
- Console errors captured in production
- Consider adding Sentry for advanced tracking

### **Uptime Monitoring**
Consider adding:
- Pingdom
- UptimeRobot  
- StatusPage.io

---

## 🔒 **Security Checklist**

### ✅ **Implemented:**
- [x] HTTPS enforced
- [x] Security headers (HSTS, CSP, etc.)
- [x] XSS protection
- [x] CSRF protection
- [x] SQL injection prevention (Prisma ORM)
- [x] Input validation
- [x] Environment variable security

### **Additional Recommendations:**
- [ ] Rate limiting for APIs
- [ ] DDoS protection (Cloudflare)
- [ ] Regular security audits
- [ ] Dependency vulnerability scanning

---

## 📱 **Testing Checklist**

### **Functionality Testing**
- [ ] Homepage loads correctly
- [ ] All service pages accessible
- [ ] Booking form works
- [ ] Payment processing functional
- [ ] Email notifications sent
- [ ] Authentication works
- [ ] Dashboard accessible

### **Performance Testing**
- [ ] Page load speed < 3 seconds
- [ ] Core Web Vitals in green
- [ ] Mobile performance optimized
- [ ] Images loading properly

### **Cross-Browser Testing**
- [ ] Chrome
- [ ] Firefox  
- [ ] Safari
- [ ] Edge
- [ ] Mobile browsers

---

## 🚨 **Emergency Procedures**

### **Rollback Process**
1. Go to Vercel dashboard
2. Find previous deployment
3. Click "Promote to Production"

### **Quick Fixes**
- Environment variables: Update in Vercel dashboard
- Code issues: Push fix to GitHub (auto-deploys)
- DNS issues: Check domain provider settings

### **Support Contacts**
- Vercel Support: [vercel.com/help](https://vercel.com/help)
- Domain Provider: Check your registrar
- Email Service: SendGrid support

---

## 📈 **Success Metrics**

### **Week 1 Targets:**
- [ ] Website loading in < 2 seconds
- [ ] 95%+ uptime
- [ ] All contact forms working
- [ ] Payment processing functional

### **Month 1 Targets:**
- [ ] Google Analytics tracking 100+ visitors
- [ ] At least 5 booking inquiries
- [ ] Mobile traffic > 60%
- [ ] Core Web Vitals all green

---

**Your GQ Cars website is now ready for professional deployment! 🎉**

*Generated automatically by Claude Code - All configurations optimized for production*