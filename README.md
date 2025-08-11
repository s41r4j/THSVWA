# THSVWA
> The Hacksmith Shop Vulnerable Web Application

## Project Overview

Hacksmith Shop is a deliberately vulnerable web application designed as an e-commerce-style platform for educational Capture The Flag (CTF) challenges. Built to simulate real-world web security flaws, it provides a safe environment to explore and understand common vulnerabilities.

### Development Workflow

- Develop a simple, interactive "Hacksmith Shop" web application
- Embed intentional security vulnerabilities for learning purposes
- Provide a `/flag` endpoint for users to submit discovered flags
- Containerize the application using Docker for isolated, reproducible deployment

## Included Vulnerabilities

The application contains the following vulnerabilities, each hiding a flag for CTF participants:

- **SQL Injection (SQLi)**: Exploit unsanitized database queries to manipulate data or uncover flags.
- **Cross-Site Scripting (XSS)**: Inject malicious scripts to steal data or reveal hidden flags.
- **Command Injection**: Execute arbitrary system commands through improper input handling.
- **Insecure File Upload**: Upload malicious files to access restricted areas or flags.
- **Insecure Direct Object Reference (IDOR)**: Access unauthorized resources by manipulating identifiers.
- **Local File Inclusion (LFI)**: Exploit file inclusion to read sensitive files containing flags.

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
