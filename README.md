# THSVWA
> **T**he **H**acksmith **S**hop **V**ulnerable **W**eb **A**pplication

## Project Overview

Hacksmith Shop is a deliberately vulnerable web application designed as a simple e-commerce-style platform for educational Capture The Flag (CTF) challenges. Built to simulate real-world web security flaws, it provides a safe environment to explore and understand common vulnerabilities.

### Features

- **Simple E-commerce UI**: Clean, responsive design with black and orange Hacksmith branding
- **Three Core Pages**: Focused structure with main page, tools, and user management
- **Interactive CTF Challenges**: Multiple vulnerability types with educational context
- **Authentication System**: Login functionality with hardcoded test users
- **Educational Content**: Built-in security warnings and vulnerability explanations

### Application Structure

The application consists of three main pages:

1. **Main Page (/)**: Landing page displaying a list of blacksmithing tools with search functionality
2. **Tools Page (/tools)**: Detailed tool information with product specifications
3. **Login Page (/login)**: User authentication that redirects to profile
4. **Profile Page (/profile)**: Simple user profile management (requires login)

### Development Workflow

- Develop a simple, interactive "Hacksmith Shop" web application
- Embed intentional security vulnerabilities for learning purposes
- Maintain clean, minimal design while preserving educational value
- Containerize the application using Docker for isolated, reproducible deployment

## Included Vulnerabilities

The application contains the following vulnerabilities, each hiding a flag for CTF participants:

- **SQL Injection (SQLi)**: Exploit unsanitized database queries to manipulate data or uncover flags.
- **Cross-Site Scripting (XSS)**: Inject malicious scripts to steal data or reveal hidden flags.
- **Command Injection**: Execute arbitrary system commands through improper input handling.
- **Insecure File Upload**: Upload malicious files to access restricted areas or flags.
- **Insecure Direct Object Reference (IDOR)**: Access unauthorized resources by manipulating identifiers.
- **Local File Inclusion (LFI)**: Exploit file inclusion to read sensitive files containing flags.

## UI Features

### Modern E-commerce Design
- **Responsive Layout**: Mobile-first design that works on all device sizes
- **Professional Navigation**: Sticky header with smooth navigation and mobile menu
- **Product Showcase**: Featured products carousel with ratings, pricing, and stock status
- **Interactive Elements**: Hover effects, animations, and smooth transitions

### Enhanced User Experience
- **Search & Filter**: Advanced product filtering with category selection and sorting
- **Product Details**: Comprehensive product pages with specifications and related items
- **User Profile**: Complete profile management with real-time preview
- **File Operations**: Professional file upload interface with drag-and-drop support
- **Terminal Interface**: Realistic command execution terminal with syntax highlighting

### Security Education
- **Vulnerability Indicators**: Clear warnings about intentional security flaws
- **CTF Hints**: Built-in hints and guidance for each challenge type
- **Educational Content**: Explanations of vulnerabilities and their implications
- **Progress Tracking**: Submission history and flag discovery tracking

## Setup Instructions

1. **Clone the Repository**:
   - Run: `git clone https://github.com/s41r4j/THSVWA.git`
   - Navigate to the directory: `cd THSVWA`

2. **Build and Run with Docker**:
   - Build: `docker build -t hacksmith-shop .`
   - Run: `docker run -p 8080:80 hacksmith-shop`

3. **Access the Application**:
   - Open `http://localhost:8080` in your browser.

## Challenge Hints

- **SQLi**: Check login or search forms for query manipulation opportunities.
- **XSS**: Experiment with input fields that display user data.
- **Command Injection**: Look for features executing system commands.
- **Insecure File Upload**: Try uploading unexpected file types.
- **IDOR**: Modify URL parameters to access hidden resources.
- **LFI**: Test file inclusion endpoints with path traversal.

## Notes

- This application is for educational use only in a controlled environment.
- Regularly commit changes to the repository to reflect development progress.
- Submit flags via the `/flag` endpoint to score points in the CTF.
