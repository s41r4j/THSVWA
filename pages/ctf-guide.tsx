import Link from 'next/link';

export default function CTFGuide() {
  const vulnerabilities = [
    {
      name: 'Cross-Site Scripting (XSS)',
      flag: 'FL4G{X55_F0UND}',
      location: 'Search functionality',
      difficulty: 'Medium',
      description: 'JavaScript injection vulnerability that allows execution of malicious scripts in the browser context.',
      hints: [
        'Look for input fields that display user content',
        'Try injecting HTML tags and JavaScript code',
        'Test both stored and reflected XSS vectors',
        'Example payload: <script>alert(\'XSS\')</script>'
      ],
      prevention: [
        'Sanitize and validate all user inputs',
        'Use Content Security Policy (CSP)',
        'Encode output data before rendering',
        'Use secure templating engines'
      ]
    },
    {
      name: 'SQL Injection',
      flag: 'FL4G{5QL_1NJ3CT10N_5UCC355}',
      location: 'Login form',
      difficulty: 'High',
      description: 'Database query manipulation that can lead to unauthorized data access, modification, or deletion.',
      hints: [
        'Examine forms that interact with databases',
        'Try SQL metacharacters in input fields',
        'Test authentication bypass techniques',
        'Example payload: admin\' OR \'1\'=\'1\' --'
      ],
      prevention: [
        'Use parameterized queries/prepared statements',
        'Apply input validation and sanitization',
        'Implement least privilege database access',
        'Use stored procedures with proper validation'
      ]
    },
    {
      name: 'Insecure Direct Object Reference (IDOR)',
      flag: 'FL4G{1D0R_4DM1N_4CC355}',
      location: 'Product pages',
      difficulty: 'Medium',
      description: 'Access control vulnerability allowing unauthorized access to objects by manipulating reference values.',
      hints: [
        'Look for numeric IDs in URLs',
        'Try accessing different object identifiers',
        'Test sequential ID enumeration',
        'Check for admin or hidden resources'
      ],
      prevention: [
        'Implement proper access controls',
        'Use indirect object references (UUIDs)',
        'Validate user authorization for each request',
        'Apply role-based access control'
      ]
    },
    {
      name: 'Local File Inclusion (LFI)',
      flag: 'FL4G{LF1_*}',
      location: 'Product file viewer',
      difficulty: 'High',
      description: 'File system access vulnerability that allows reading of local server files through path manipulation.',
      hints: [
        'Look for file parameter inputs',
        'Try directory traversal sequences',
        'Test relative and absolute paths',
        'Example payload: ../../../etc/passwd'
      ],
      prevention: [
        'Validate and sanitize file paths',
        'Use whitelists for allowed files',
        'Implement proper access controls',
        'Avoid user input in file operations'
      ]
    },
    {
      name: 'File Upload Vulnerabilities',
      flag: 'FL4G{*UPL04D*}',
      location: 'Profile page',
      difficulty: 'High',
      description: 'Insecure file upload that can lead to remote code execution or system compromise.',
      hints: [
        'Look for file upload functionality',
        'Try uploading different file types',
        'Test executable file extensions',
        'Examine file validation mechanisms'
      ],
      prevention: [
        'Validate file types and extensions',
        'Scan uploaded files for malware',
        'Store uploads outside web root',
        'Implement file size restrictions'
      ]
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-hacksmith-dark via-hacksmith-gray to-hacksmith-dark py-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold text-hacksmith-orange mb-4">
            CTF Challenge Guide
          </h1>
          <p className="text-xl text-gray-300">
            Complete walkthrough of all vulnerability challenges
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Overview */}
        <div className="card mb-8">
          <h2 className="text-2xl font-bold text-hacksmith-orange mb-6">Challenge Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-hacksmith-orange">{vulnerabilities.length}</div>
              <div className="text-gray-400">Total Challenges</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400">100-150</div>
              <div className="text-gray-400">Points per Flag</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400">5</div>
              <div className="text-gray-400">Vulnerability Types</div>
            </div>
          </div>
          
          <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-blue-400 mb-3">How to Play</h3>
            <ol className="list-decimal list-inside space-y-2 text-blue-300">
              <li>Explore the application and identify security vulnerabilities</li>
              <li>Exploit the vulnerabilities to discover hidden flags</li>
              <li>Submit flags on the Flag Submission page for points</li>
              <li>Use hint mode for guided learning (reduces points by 50%)</li>
              <li>Learn about prevention techniques and security best practices</li>
            </ol>
          </div>
        </div>

        {/* Vulnerability Challenges */}
        <div className="space-y-8">
          {vulnerabilities.map((vuln, index) => (
            <div key={index} className="card border-hacksmith-orange/30">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-hacksmith-orange">{vuln.name}</h3>
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                  vuln.difficulty === 'High' ? 'bg-red-500 text-white' :
                  vuln.difficulty === 'Medium' ? 'bg-yellow-500 text-black' :
                  'bg-green-500 text-white'
                }`}>
                  {vuln.difficulty}
                </span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-white mb-2">Description</h4>
                    <p className="text-gray-300 text-sm">{vuln.description}</p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-white mb-2">Target Location</h4>
                    <p className="text-hacksmith-orange font-mono text-sm">{vuln.location}</p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-white mb-2">Flag Format</h4>
                    <code className="bg-hacksmith-dark px-2 py-1 rounded text-hacksmith-orange text-sm">
                      {vuln.flag}
                    </code>
                  </div>

                  <div>
                    <h4 className="font-semibold text-white mb-2">💡 Hints</h4>
                    <ul className="space-y-1">
                      {vuln.hints.map((hint, hintIndex) => (
                        <li key={hintIndex} className="text-gray-300 text-sm flex items-start">
                          <span className="text-hacksmith-orange mr-2 flex-shrink-0">•</span>
                          {hint}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-white mb-2">🛡️ Prevention Techniques</h4>
                  <ul className="space-y-1">
                    {vuln.prevention.map((prevention, prevIndex) => (
                      <li key={prevIndex} className="text-gray-300 text-sm flex items-start">
                        <span className="text-green-400 mr-2 flex-shrink-0">✓</span>
                        {prevention}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Resources */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="card bg-green-900/20 border-green-500/30">
            <h3 className="text-lg font-semibold text-green-400 mb-4">Learning Resources</h3>
            <div className="space-y-2 text-sm">
              <a href="https://owasp.org/www-project-top-ten/" target="_blank" rel="noopener noreferrer" 
                 className="block text-green-300 hover:text-green-200 transition-colors">
                → OWASP Top 10 ↗
              </a>
              <a href="https://portswigger.net/web-security" target="_blank" rel="noopener noreferrer"
                 className="block text-green-300 hover:text-green-200 transition-colors">
                → PortSwigger Web Security Academy ↗
              </a>
              <a href="https://cheatsheetseries.owasp.org/" target="_blank" rel="noopener noreferrer"
                 className="block text-green-300 hover:text-green-200 transition-colors">
                → OWASP Cheat Sheet Series ↗
              </a>
            </div>
          </div>

          <div className="card bg-yellow-900/20 border-yellow-500/30">
            <h3 className="text-lg font-semibold text-yellow-400 mb-4">⚠️ Ethical Guidelines</h3>
            <div className="text-sm text-yellow-300 space-y-2">
              <p>• Only test on systems you own or have explicit permission to test</p>
              <p>• Never use these techniques on unauthorized systems</p>
              <p>• Respect responsible disclosure practices</p>
              <p>• Use knowledge for defensive purposes</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-12 text-center space-x-4">
          <Link href="/flag" className="btn-primary">
            Submit Flags
          </Link>
          <Link href="/" className="text-hacksmith-orange hover:underline">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
