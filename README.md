# THSVWA 🛡️
> **T**he **H**acksmith **S**hop **V**ulnerable **W**eb **A**pplication

[![Next.js](https://img.shields.io/badge/Next.js-14.2.31-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6.3-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Docker](https://img.shields.io/badge/Docker-Ready-blue?logo=docker)](https://www.docker.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.13-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)

## 🎯 Project Overview

THSVWA is a deliberately vulnerable web application designed as an interactive cybersecurity education platform. Built with modern web technologies, it simulates a realistic e-commerce environment while containing intentional security vulnerabilities for Capture The Flag (CTF) challenges and penetration testing practice.

## ✨ Key Features

### 🛍️ Modern E-commerce Interface
- **Responsive Design**: Mobile-first layout with professional UI/UX
- **Product Catalog**: Interactive blacksmithing tools showcase
- **Search Functionality**: Real-time product search with XSS vulnerabilities
- **Dynamic Routing**: Individual product pages with IDOR/LFI challenges
- **Professional Navigation**: Clean header with hint mode toggle

### 🔐 Security Education Platform
- **Hint Mode System**: Toggle button to show/hide vulnerability indicators
- **Real Vulnerabilities**: Authentic security flaws, not simulated
- **CTF Challenges**: Multiple vulnerability types with hidden flags
- **Educational Warnings**: Context-aware security indicators
- **Progress Tracking**: Flag submission and discovery system

### 🐳 Production-Ready Deployment
- **Docker Containerization**: Optimized multi-stage builds
- **Port 80 Configuration**: Standard web server setup
- **Security Hardening**: Non-root user, minimal attack surface
- **SEO Optimization**: Sitemap, robots.txt, and meta tags

## 🚀 Quick Start

### Using Docker (Recommended)

```bash
# Clone the repository
git clone https://github.com/s41r4j/THSVWA.git
cd THSVWA

# Build and run with Docker
docker build -t thsvwa .
docker run -d -p 80:80 --name thsvwa-container thsvwa

# Access the application
open http://localhost
```

### Development Setup

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
npm start
```

## 🗺️ Application Structure

### Pages & Routes
- **`/`** - Homepage with product catalog and search
- **`/login`** - Authentication with SQL injection vulnerabilities
- **`/profile`** - User profile management (requires login)
- **`/flag`** - CTF flag submission endpoint
- **`/product/[id]`** - Dynamic product pages with IDOR/LFI

### API Endpoints
- **`/api/flag`** - Flag submission and validation
- **`/api/sitemap`** - Dynamic sitemap generation
- **`/api/robots`** - Robots.txt configuration

## 🎮 Included Vulnerabilities

| Vulnerability | Location | Description | Educational Value |
|---------------|----------|-------------|-------------------|
| **Cross-Site Scripting (XSS)** | Homepage Search | Real JavaScript execution via `useEffect` | Learn DOM manipulation attacks |
| **SQL Injection (SQLi)** | Login Form | Unsanitized database queries | Understand database security |
| **Insecure Direct Object Reference (IDOR)** | Product Pages | Access control bypass via URL manipulation | Authorization flaw exploitation |
| **Local File Inclusion (LFI)** | Product Pages | File system access simulation | Path traversal understanding |

## 🔑 Default Credentials

| Username | Password | Role |
|----------|----------|------|
| `user` | `u53r` | Regular User |
| `admin` | `4dm1n` | Administrator |

## 🎛️ Hint Mode System

The application features a professional hint toggle system:

- **Toggle Button**: Click the hint icon (◉/◎) in the navigation
- **Visual Indicators**: Shows vulnerability warnings when enabled
- **Educational Context**: Provides learning guidance without spoiling challenges
- **Smooth Animations**: Professional hover effects and transitions

## 🐳 Docker Configuration

### Container Details
- **Base Image**: `node:20-alpine`
- **Port**: 80 (standard HTTP)
- **User**: Non-root (`nextjs:nodejs`)
- **Environment**: Production optimized

### Container Management
```bash
# View running containers
docker ps

# Check container logs
docker logs thsvwa-container

# Stop container
docker stop thsvwa-container

# Remove container
docker rm thsvwa-container

# Restart container
docker start thsvwa-container
```

## 🔍 CTF Challenge Hints

### 🔓 Getting Started
1. **Enable Hint Mode**: Toggle the hint button to see vulnerability indicators
2. **Explore Pages**: Each page contains different vulnerability types
3. **Test Input Fields**: Try various payloads in search, login, and forms
4. **Check URLs**: Manipulate parameters in product pages

### 🎯 Specific Challenges
- **XSS**: Use the homepage search to inject and execute JavaScript
- **SQLi**: Test login form with SQL injection payloads
- **IDOR**: Modify product IDs to access unauthorized resources
- **LFI**: Explore file inclusion in product detail pages

## 🛡️ Security Notes

⚠️ **Educational Use Only**: This application contains intentional vulnerabilities
- Deploy only in isolated, controlled environments
- Never expose to public networks
- Use for learning and authorized testing only
- Regular security assessments recommended for educational environments

## 🏗️ Technology Stack

- **Framework**: Next.js 14.2.31 with TypeScript
- **Styling**: Tailwind CSS 3.4.13
- **Runtime**: Node.js 20 (Alpine Linux)
- **Containerization**: Docker with multi-stage builds
- **State Management**: React Context API

## 📊 SEO & Crawling

- **Sitemap**: Available at `/sitemap.xml` and `/api/sitemap`
- **Robots.txt**: Available at `/robots.txt` and `/api/robots`
- **Meta Tags**: Optimized for search engines
- **Structured Data**: Educational content markup

## 📚 Additional Resources

- **[Help Center](/help)** - Complete setup instructions and system requirements
- **[CTF Guide](/ctf-guide)** - Detailed vulnerability walkthroughs with hints
- **[Security Documentation](/security-docs)** - Comprehensive security reference
- **[Contact & Support](/contact)** - Get help and report issues

## 🤝 Contributing

We welcome contributions to improve THSVWA! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-vulnerability`)
3. Commit changes (`git commit -am 'Add new vulnerability'`)
4. Push to branch (`git push origin feature/new-vulnerability`)
5. Create a Pull Request

For questions or support, visit our [Contact Page](/contact) or check the [Help Center](/help).

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built for cybersecurity education and CTF challenges
- Inspired by real-world security vulnerabilities
- Designed for safe, controlled learning environments

---

**⚡ Ready to learn? Start your security journey at `http://localhost` after running the Docker container!**
