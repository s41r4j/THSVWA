# THSVWA 🛡️
> **T**he **H**acksmith **S**hop **V**ulnerable **W**eb **A**pplication

[![Next.js](https://img.shields.io/badge/Next.js-14.2.31-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6.3-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Docker](https://img.shields.io/badge/Docker-Ready-blue?logo=docker)](https://www.docker.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.13-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)

## 🎯 Overview

A modern, deliberately vulnerable web application designed for cybersecurity education and CTF challenges. Features a professional blacksmithing e-commerce theme with realistic security vulnerabilities for hands-on learning.

## 🚀 Quick Start

```bash
# Using Docker (Recommended)
git clone https://github.com/s41r4j/THSVWA.git
cd THSVWA
docker build -t thsvwa .
docker run -d -p 80:80 --name thsvwa-container thsvwa
open http://localhost

# Development Setup
npm install && npm run dev
```

## 🔐 Vulnerabilities & Features

| Type | Location | Educational Focus |
|------|----------|-------------------|
| **XSS** | Homepage Search | DOM manipulation, script injection |
| **SQL Injection** | Login Form | Database security, authentication bypass |
| **IDOR** | Product Pages | Access control, URL manipulation |
| **LFI** | Purchase Flow | File inclusion, path traversal |
| **Price Manipulation** | Purchase Page | Business logic flaws |

## 🗺️ Application Structure

### Core Pages
- **`/`** - Homepage with 8-product catalog and search
- **`/login`** - Authentication with SQL injection
- **`/profile`** - User dashboard (auth required)
- **`/flag`** - CTF flag submission system
- **`/terms`** - Legal framework and guidelines
- **`/purchase`** - Checkout with LFI and price manipulation
- **`/product/[id]`** - Product details with IDOR (IDs 1-8, hidden: 0, 999)

### Key Features
- **Professional UI**: Dark theme with hacksmith branding
- **Hint System**: Toggle hints with ◉/◎ button
- **Flag Tracking**: Cookie-based progress with 8-hour expiration
- **Notification System**: Professional SVG-based alerts
- **Terms & Conditions**: Comprehensive educational permissions

## 🎮 Getting Started

### Default Credentials
- **User**: `user` / `u53r`
- **Admin**: `admin` / `4dm1n`

### CTF Exploration
1. **Enable Hints**: Click the hint toggle (◉) in navigation
2. **Test Search**: Try XSS payloads in homepage search
3. **Login Bypass**: Attempt SQL injection on login form
4. **Product Access**: Change product IDs (try 0, 999, negative numbers)
5. **File Inclusion**: Explore `?file=` parameter in purchase flow
6. **Price Manipulation**: Modify prices during checkout

## 🔑 Hidden Flags & Challenges

- **XSS Flags**: Search-based script execution
- **SQL Flags**: Authentication bypass techniques  
- **IDOR Flags**: Unauthorized product access
- **LFI Flags**: File system exploration
- **Price Manipulation**: Business logic exploitation

## 🐳 Docker Details

- **Port**: 80 (standard HTTP)
- **Base**: `node:20-alpine`
- **User**: Non-root security
- **Build**: Multi-stage optimization

## 🛡️ Security Notes

⚠️ **Educational Use Only**
- Contains intentional vulnerabilities
- Deploy in isolated environments only
- Never expose to public networks
- For authorized learning/testing only

## 📊 Technical Stack

- **Next.js 14** with TypeScript
- **Tailwind CSS** for styling
- **React Context** for state management
- **Cookie-based** session persistence
- **SVG icons** with professional animations

## 🤝 Contributing

1. Fork repository
2. Create feature branch
3. Implement security challenges
4. Submit pull request

## 📄 License

MIT License - Educational use encouraged

---

**🔥 Start your security journey at `http://localhost` after Docker deployment!**
