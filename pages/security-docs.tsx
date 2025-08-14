import Link from 'next/link';

export default function SecurityDocs() {
  const categories = [
    {
      title: 'Injection Vulnerabilities',
      description: 'Code injection attacks that exploit poor input validation',
      vulnerabilities: [
        {
          name: 'SQL Injection',
          risk: 'Critical',
          description: 'Malicious SQL code injection into application queries',
          impact: 'Data breach, authentication bypass, data manipulation',
          mitigation: 'Parameterized queries, input validation, least privilege'
        },
        {
          name: 'Cross-Site Scripting (XSS)',
          risk: 'High',
          description: 'Client-side script injection in web applications',
          impact: 'Session hijacking, data theft, site defacement',
          mitigation: 'Input sanitization, output encoding, CSP headers'
        }
      ]
    },
    {
      title: 'Access Control Flaws',
      description: 'Improper restrictions on authenticated users',
      vulnerabilities: [
        {
          name: 'Insecure Direct Object Reference (IDOR)',
          risk: 'High',
          description: 'Direct access to objects without proper authorization',
          impact: 'Unauthorized data access, privacy violations',
          mitigation: 'Access control checks, indirect references, session validation'
        }
      ]
    },
    {
      title: 'File System Vulnerabilities',
      description: 'Improper handling of file operations and uploads',
      vulnerabilities: [
        {
          name: 'Local File Inclusion (LFI)',
          risk: 'High',
          description: 'Unauthorized access to local server files',
          impact: 'Source code disclosure, configuration exposure',
          mitigation: 'Path validation, file whitelisting, access restrictions'
        },
        {
          name: 'Unrestricted File Upload',
          risk: 'Critical',
          description: 'Upload of malicious files without proper validation',
          impact: 'Remote code execution, system compromise',
          mitigation: 'File type validation, sandboxing, malware scanning'
        }
      ]
    }
  ];

  const securityPrinciples = [
    {
      principle: 'Defense in Depth',
      description: 'Multiple layers of security controls to protect against failures',
      examples: ['Network firewalls', 'Application firewalls', 'Input validation', 'Access controls']
    },
    {
      principle: 'Least Privilege',
      description: 'Users and processes should have minimum necessary permissions',
      examples: ['Role-based access', 'Database permissions', 'File system access', 'API limitations']
    },
    {
      principle: 'Fail Securely',
      description: 'System should fail to a secure state when errors occur',
      examples: ['Error handling', 'Default deny policies', 'Session timeouts', 'Graceful degradation']
    },
    {
      principle: 'Input Validation',
      description: 'All input should be validated, sanitized, and verified',
      examples: ['Whitelist validation', 'Data type checking', 'Length limits', 'Character encoding']
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-hacksmith-dark via-hacksmith-gray to-hacksmith-dark py-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold text-hacksmith-orange mb-4">
            Security Documentation
          </h1>
          <p className="text-xl text-gray-300">
            Comprehensive security reference and best practices
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Security Overview */}
        <div className="card mb-8">
          <h2 className="text-2xl font-bold text-hacksmith-orange mb-6">Security Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Application Security</h3>
              <p className="text-gray-300 text-sm mb-4">
                This vulnerable web application demonstrates common security flaws found in modern web applications.
                Each vulnerability represents real-world attack vectors that security professionals should understand.
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center text-gray-300">
                  <span className="text-red-400 mr-2">●</span>
                  <strong>Critical:</strong> SQL Injection, File Upload
                </li>
                <li className="flex items-center text-gray-300">
                  <span className="text-orange-400 mr-2">●</span>
                  <strong>High:</strong> XSS, IDOR, LFI
                </li>
                <li className="flex items-center text-gray-300">
                  <span className="text-yellow-400 mr-2">●</span>
                  <strong>Medium:</strong> Information Disclosure
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Learning Objectives</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li className="flex items-start">
                  <span className="text-hacksmith-orange mr-2 flex-shrink-0">✓</span>
                  Identify common web application vulnerabilities
                </li>
                <li className="flex items-start">
                  <span className="text-hacksmith-orange mr-2 flex-shrink-0">✓</span>
                  Understand attack vectors and exploitation techniques
                </li>
                <li className="flex items-start">
                  <span className="text-hacksmith-orange mr-2 flex-shrink-0">✓</span>
                  Learn effective mitigation strategies
                </li>
                <li className="flex items-start">
                  <span className="text-hacksmith-orange mr-2 flex-shrink-0">✓</span>
                  Apply security best practices in development
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Vulnerability Categories */}
        <div className="space-y-8 mb-12">
          <h2 className="text-2xl font-bold text-hacksmith-orange">Vulnerability Categories</h2>
          {categories.map((category, index) => (
            <div key={index} className="card border-hacksmith-orange/20">
              <h3 className="text-xl font-semibold text-hacksmith-orange mb-2">{category.title}</h3>
              <p className="text-gray-300 text-sm mb-6">{category.description}</p>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {category.vulnerabilities.map((vuln, vulnIndex) => (
                  <div key={vulnIndex} className="bg-hacksmith-dark rounded-lg p-4 border border-gray-700">
                    <div className="flex justify-between items-start mb-3">
                      <h4 className="font-semibold text-white">{vuln.name}</h4>
                      <span className={`px-2 py-1 rounded text-xs font-bold ${
                        vuln.risk === 'Critical' ? 'bg-red-500 text-white' :
                        vuln.risk === 'High' ? 'bg-orange-500 text-white' :
                        'bg-yellow-500 text-black'
                      }`}>
                        {vuln.risk}
                      </span>
                    </div>
                    
                    <div className="space-y-3 text-sm">
                      <div>
                        <strong className="text-gray-300">Description:</strong>
                        <p className="text-gray-400">{vuln.description}</p>
                      </div>
                      
                      <div>
                        <strong className="text-gray-300">Impact:</strong>
                        <p className="text-red-300">{vuln.impact}</p>
                      </div>
                      
                      <div>
                        <strong className="text-gray-300">Mitigation:</strong>
                        <p className="text-green-300">{vuln.mitigation}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Security Principles */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-hacksmith-orange mb-6">Security Principles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {securityPrinciples.map((principle, index) => (
              <div key={index} className="card bg-blue-900/20 border-blue-500/30">
                <h3 className="text-lg font-semibold text-blue-400 mb-3">{principle.principle}</h3>
                <p className="text-blue-300 text-sm mb-4">{principle.description}</p>
                
                <div>
                  <strong className="text-blue-300 text-sm">Examples:</strong>
                  <ul className="mt-2 space-y-1">
                    {principle.examples.map((example, exampleIndex) => (
                      <li key={exampleIndex} className="text-blue-200 text-sm flex items-center">
                        <span className="text-blue-400 mr-2">•</span>
                        {example}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* External Resources */}
        <div className="card bg-green-900/20 border-green-500/30 mb-8">
          <h2 className="text-2xl font-bold text-green-400 mb-6">External Security Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-green-300 mb-3">Standards & Guidelines</h3>
              <div className="space-y-2 text-sm">
                <a href="https://owasp.org/www-project-top-ten/" target="_blank" rel="noopener noreferrer"
                   className="block text-green-200 hover:text-green-100 transition-colors">
                  → OWASP Top 10 ↗
                </a>
                <a href="https://cwe.mitre.org/" target="_blank" rel="noopener noreferrer"
                   className="block text-green-200 hover:text-green-100 transition-colors">
                  → CWE Database ↗
                </a>
                <a href="https://cheatsheetseries.owasp.org/" target="_blank" rel="noopener noreferrer"
                   className="block text-green-200 hover:text-green-100 transition-colors">
                  → OWASP Cheat Sheets ↗
                </a>
                <a href="https://www.sans.org/top25-software-errors/" target="_blank" rel="noopener noreferrer"
                   className="block text-green-200 hover:text-green-100 transition-colors">
                  → SANS Top 25 ↗
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-green-300 mb-3">Learning Platforms</h3>
              <div className="space-y-2 text-sm">
                <a href="https://portswigger.net/web-security" target="_blank" rel="noopener noreferrer"
                   className="block text-green-200 hover:text-green-100 transition-colors">
                  → Web Security Academy ↗
                </a>
                <a href="https://owasp.org/www-project-webgoat/" target="_blank" rel="noopener noreferrer"
                   className="block text-green-200 hover:text-green-100 transition-colors">
                  → OWASP WebGoat ↗
                </a>
                <a href="https://www.vulnhub.com/" target="_blank" rel="noopener noreferrer"
                   className="block text-green-200 hover:text-green-100 transition-colors">
                  → VulnHub ↗
                </a>
                <a href="https://tryhackme.com/" target="_blank" rel="noopener noreferrer"
                   className="block text-green-200 hover:text-green-100 transition-colors">
                  → TryHackMe ↗
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Security Testing Tools */}
        <div className="card bg-purple-900/20 border-purple-500/30">
          <h2 className="text-2xl font-bold text-purple-400 mb-6">Recommended Security Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-purple-300 mb-3">Web Application Scanners</h3>
              <ul className="space-y-2 text-sm text-purple-200">
                <li>• Burp Suite Professional</li>
                <li>• OWASP ZAP</li>
                <li>• Nikto</li>
                <li>• SQLMap</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-purple-300 mb-3">Static Analysis</h3>
              <ul className="space-y-2 text-sm text-purple-200">
                <li>• SonarQube</li>
                <li>• ESLint Security Plugin</li>
                <li>• Bandit (Python)</li>
                <li>• Semgrep</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-purple-300 mb-3">Network Tools</h3>
              <ul className="space-y-2 text-sm text-purple-200">
                <li>• Nmap</li>
                <li>• Wireshark</li>
                <li>• Metasploit</li>
                <li>• Nessus</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-12 text-center">
          <Link href="/" className="text-hacksmith-orange hover:underline">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
