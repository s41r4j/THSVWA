import { FormEvent, useState, useEffect } from 'react';
import { useHints } from '../contexts/HintContext';
import Link from 'next/link';

interface VulnerabilityInfo {
  name: string;
  format: string;
  hint: string;
  severity: 'Critical' | 'High' | 'Medium' | 'Low';
  description: string;
  resources: { title: string; url: string; type: 'OWASP' | 'CWE' | 'Guide' | 'Tool' }[];
  mitigation: string[];
}

export default function FlagSubmit() {
  const [flag, setFlag] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedVuln, setSelectedVuln] = useState<VulnerabilityInfo | null>(null);
  const [submissionHistory, setSubmissionHistory] = useState<{flag: string, timestamp: string, status: string, points?: number}[]>([]);
  const [foundFlags, setFoundFlags] = useState<Set<string>>(new Set());
  const { hintsVisible } = useHints();

  // Cookie utility functions
  const setCookie = (name: string, value: string, hours: number = 24) => {
    const expires = new Date();
    expires.setTime(expires.getTime() + (hours * 60 * 60 * 1000));
    document.cookie = `${name}=${encodeURIComponent(value)};expires=${expires.toUTCString()};path=/;SameSite=Strict`;
  };

  const getCookie = (name: string): string | null => {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return decodeURIComponent(c.substring(nameEQ.length, c.length));
    }
    return null;
  };

  const deleteCookie = (name: string) => {
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
  };

  // Load session data on component mount from cookies and sessionStorage
  useEffect(() => {
    // Load submission history from sessionStorage (clears when browser tab closes)
    const savedHistory = sessionStorage.getItem('thsvwa_submission_history');
    if (savedHistory) {
      try {
        setSubmissionHistory(JSON.parse(savedHistory));
      } catch (e) {
        console.error('Failed to load submission history:', e);
        sessionStorage.removeItem('thsvwa_submission_history');
      }
    }
    
    // Load found flags from cookie with fallback to sessionStorage
    let flagsLoaded = false;
    const savedFlags = getCookie('thsvwa_found_flags');
    if (savedFlags) {
      try {
        const flagsArray = JSON.parse(savedFlags);
        setFoundFlags(new Set(flagsArray));
        flagsLoaded = true;
      } catch (e) {
        console.error('Failed to load found flags from cookie:', e);
        deleteCookie('thsvwa_found_flags');
      }
    }
    
    // Fallback to sessionStorage if cookie failed
    if (!flagsLoaded) {
      const sessionFlags = sessionStorage.getItem('thsvwa_found_flags');
      if (sessionFlags) {
        try {
          const flagsArray = JSON.parse(sessionFlags);
          setFoundFlags(new Set(flagsArray));
        } catch (e) {
          console.error('Failed to load found flags from sessionStorage:', e);
          sessionStorage.removeItem('thsvwa_found_flags');
        }
      }
    }
  }, []);

  // Save to sessionStorage and cookies whenever data changes
  useEffect(() => {
    if (submissionHistory.length > 0) {
      sessionStorage.setItem('thsvwa_submission_history', JSON.stringify(submissionHistory));
    }
  }, [submissionHistory]);

  useEffect(() => {
    if (foundFlags.size > 0) {
      const flagsArray = Array.from(foundFlags);
      // Save to sessionStorage for immediate backup
      sessionStorage.setItem('thsvwa_found_flags', JSON.stringify(flagsArray));
      
      // Set cookie that expires in 8 hours (reasonable session time)
      setCookie('thsvwa_found_flags', JSON.stringify(flagsArray), 8);
    } else {
      // Clear both storage types when no flags
      sessionStorage.removeItem('thsvwa_found_flags');
      deleteCookie('thsvwa_found_flags');
    }
  }, [foundFlags]);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    
    try {
      // Check if hint mode is currently enabled
      const hintModeUsed = document.querySelector('[data-hints-visible="true"]') !== null;
      
      const res = await fetch('/api/flag', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ flag, hintModeUsed }),
      });
      const data = await res.json();
      const resultMessage = data.message || 'Unknown response';
      setMessage(resultMessage);
      
      // Extract points from message
      const pointsMatch = resultMessage.match(/Score \+(\d+)/);
      const points = pointsMatch ? parseInt(pointsMatch[1]) : 0;
      
      // Add to submission history
      const newSubmission = {
        flag: flag,
        timestamp: new Date().toLocaleString(),
        status: res.ok ? 'success' : 'failed',
        points: res.ok ? points : 0
      };
      setSubmissionHistory(prev => [newSubmission, ...prev.slice(0, 9)]);
      
      if (res.ok) {
        setFlag('');
        // Add to found flags set for session persistence
        if (flag.startsWith('FL4G{')) {
          setFoundFlags(prev => {
            const newSet = new Set(prev);
            newSet.add(flag);
            return newSet;
          });
        }
        // Show vulnerability info for successful submission
        const vulnType = flag.match(/FL4G\{([^_]+)/)?.[1];
        if (vulnType) {
          const vuln = vulnerabilities.find(v => v.format.includes(vulnType));
          if (vuln) setSelectedVuln(vuln);
        }
      }
    } catch (err) {
      setMessage('Something went wrong');
      const newSubmission = {
        flag: flag,
        timestamp: new Date().toLocaleString(),
        status: 'error',
        points: 0
      };
      setSubmissionHistory(prev => [newSubmission, ...prev.slice(0, 9)]);
    } finally {
      setLoading(false);
    }
  };

  const vulnerabilities: VulnerabilityInfo[] = [
    {
      name: 'Cross-Site Scripting (XSS)',
      format: 'FL4G{X55_*}',
      hint: 'Try JavaScript injection in the search functionality or login form',
      severity: 'High',
      description: 'XSS attacks inject malicious scripts into web pages viewed by other users. This can lead to session hijacking, data theft, and site defacement.',
      resources: [
        { title: 'OWASP XSS Prevention Cheat Sheet', url: 'https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html', type: 'OWASP' },
        { title: 'CWE-79: Cross-site Scripting', url: 'https://cwe.mitre.org/data/definitions/79.html', type: 'CWE' },
        { title: 'XSS Hunter', url: 'https://xsshunter.com/', type: 'Tool' },
        { title: 'PortSwigger XSS Guide', url: 'https://portswigger.net/web-security/cross-site-scripting', type: 'Guide' }
      ],
      mitigation: [
        'Sanitize and validate all user inputs',
        'Use Content Security Policy (CSP) headers',
        'Encode output data before rendering',
        'Use secure frameworks that auto-escape by default'
      ]
    },
    {
      name: 'SQL Injection',
      format: 'FL4G{5QL_*}',
      hint: 'Try SQL injection payloads in the login form',
      severity: 'Critical',
      description: 'SQL injection allows attackers to interfere with database queries, potentially accessing, modifying, or deleting sensitive data.',
      resources: [
        { title: 'OWASP SQL Injection Prevention', url: 'https://cheatsheetseries.owasp.org/cheatsheets/SQL_Injection_Prevention_Cheat_Sheet.html', type: 'OWASP' },
        { title: 'CWE-89: SQL Injection', url: 'https://cwe.mitre.org/data/definitions/89.html', type: 'CWE' },
        { title: 'SQLMap Tool', url: 'https://sqlmap.org/', type: 'Tool' },
        { title: 'PortSwigger SQL Injection Guide', url: 'https://portswigger.net/web-security/sql-injection', type: 'Guide' }
      ],
      mitigation: [
        'Use parameterized queries/prepared statements',
        'Apply input validation and sanitization',
        'Use stored procedures with proper input validation',
        'Implement least privilege database access'
      ]
    },
    {
      name: 'Insecure Direct Object Reference (IDOR)',
      format: 'FL4G{1D0R_*}',
      hint: 'Try accessing product IDs you should not have access to',
      severity: 'High',
      description: 'IDOR occurs when applications provide direct access to objects based on user input without proper authorization checks.',
      resources: [
        { title: 'OWASP IDOR Testing Guide', url: 'https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/05-Authorization_Testing/04-Testing_for_Insecure_Direct_Object_References', type: 'OWASP' },
        { title: 'CWE-639: Access Control Bypass', url: 'https://cwe.mitre.org/data/definitions/639.html', type: 'CWE' },
        { title: 'Burp Suite', url: 'https://portswigger.net/burp', type: 'Tool' },
        { title: 'Authorization Testing Guide', url: 'https://portswigger.net/web-security/access-control', type: 'Guide' }
      ],
      mitigation: [
        'Implement proper access controls for each object',
        'Use indirect object references (UUIDs)',
        'Validate user authorization for each request',
        'Apply role-based access control (RBAC)'
      ]
    },
    {
      name: 'Local File Inclusion (LFI)',
      format: 'FL4G{LF1_*}',
      hint: 'Try accessing system files through directory traversal',
      severity: 'High',
      description: 'LFI allows attackers to include local files on the server, potentially exposing sensitive information or executing malicious code.',
      resources: [
        { title: 'OWASP Path Traversal', url: 'https://owasp.org/www-community/attacks/Path_Traversal', type: 'OWASP' },
        { title: 'CWE-22: Path Traversal', url: 'https://cwe.mitre.org/data/definitions/22.html', type: 'CWE' },
        { title: 'LFI Testing Guide', url: 'https://book.hacktricks.xyz/pentesting-web/file-inclusion', type: 'Guide' },
        { title: 'DirBuster', url: 'https://sourceforge.net/projects/dirbuster/', type: 'Tool' }
      ],
      mitigation: [
        'Validate and sanitize file paths',
        'Use whitelists for allowed files',
        'Implement proper access controls',
        'Avoid user input in file operations'
      ]
    },
    {
      name: 'File Upload Vulnerabilities',
      format: 'FL4G{*UPL04D*}',
      hint: 'Try uploading files with malicious extensions or content',
      severity: 'High',
      description: 'Insecure file upload can lead to remote code execution, stored XSS, or server compromise through malicious file uploads.',
      resources: [
        { title: 'OWASP File Upload Cheat Sheet', url: 'https://cheatsheetseries.owasp.org/cheatsheets/File_Upload_Cheat_Sheet.html', type: 'OWASP' },
        { title: 'CWE-434: Unrestricted Upload', url: 'https://cwe.mitre.org/data/definitions/434.html', type: 'CWE' },
        { title: 'File Upload Testing', url: 'https://portswigger.net/web-security/file-upload', type: 'Guide' },
        { title: 'Upload Scanner', url: 'https://github.com/modzero/mod0BurpUploadScanner', type: 'Tool' }
      ],
      mitigation: [
        'Validate file types and extensions',
        'Scan uploaded files for malware',
        'Store uploads outside web root',
        'Implement file size restrictions'
      ]
    }
  ];

  const totalPoints = submissionHistory.reduce((sum, sub) => sum + (sub.points || 0), 0);
  const successfulSubmissions = submissionHistory.filter(sub => sub.status === 'success').length;
  const uniqueFlags = foundFlags.size;

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-hacksmith-dark via-hacksmith-gray to-hacksmith-dark py-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="w-16 h-16 bg-hacksmith-orange rounded-full flex items-center justify-center text-3xl text-black font-bold mx-auto mb-4">
            <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14.4 6L14 4H5v17h2v-7h5.6l.4 2h7V6h-5.6z"/>
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-hacksmith-orange mb-4">
            Vulnerability Discovery Center
          </h1>
          <p className="text-xl text-gray-300 mb-6">
            Submit flags and learn about web application security vulnerabilities
          </p>
          
          {/* Stats */}
          <div className="flex justify-center space-x-8 text-sm">
            <div className="text-center">
              <div className="text-2xl font-bold text-hacksmith-orange">{totalPoints}</div>
              <div className="text-gray-400">Total Points</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">{uniqueFlags}</div>
              <div className="text-gray-400">Unique Flags</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">{vulnerabilities.length}</div>
              <div className="text-gray-400">Total Challenges</div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Flag Submission Form */}
          <div className="lg:col-span-1 space-y-6">
            <div className="card">
              <h2 className="text-xl font-bold text-hacksmith-orange mb-4 flex items-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.4 6L14 4H5v17h2v-7h5.6l.4 2h7V6h-5.6z"/>
                </svg>
                Submit Flag
              </h2>
              
              <form onSubmit={onSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Flag Value
                  </label>
                  <input
                    type="text"
                    value={flag}
                    onChange={(e) => setFlag(e.target.value)}
                    placeholder="FL4G{YOUR_FLAG_HERE}"
                    className="input-field font-mono text-sm"
                    disabled={loading}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Format: FL4G{'{'}VULNERABILITY_TYPE{'}'}
                  </p>
                </div>
                
                <button
                  type="submit"
                  disabled={loading || !flag.trim()}
                  className="btn-primary w-full"
                >
                  {loading ? 'Validating...' : 'Submit Flag'}
                </button>
              </form>

              {/* Result Message */}
              {message && (
                <div className={`mt-4 p-3 rounded-lg border text-sm ${
                  message.includes('accepted') || message.includes('Exploited') 
                    ? 'bg-green-900/20 border-green-500 text-green-400'
                    : 'bg-red-900/20 border-red-500 text-red-400'
                }`}>
                  {message}
                </div>
              )}
            </div>

            {/* Recent Submissions */}
            {submissionHistory.length > 0 && (
              <div className="card">
                <h3 className="text-lg font-semibold text-hacksmith-orange mb-3 flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/>
                  </svg>
                  Recent Activity
                </h3>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {submissionHistory.map((submission, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-hacksmith-light-gray rounded text-xs">
                      <span className="font-mono text-gray-300 truncate mr-2 flex-1">
                        {submission.flag}
                      </span>
                      <div className="flex items-center space-x-2">
                        {submission.points && submission.points > 0 && (
                          <span className="text-hacksmith-orange font-bold">+{submission.points}</span>
                        )}
                        <span className={`px-2 py-1 rounded text-xs ${
                          submission.status === 'success' ? 'bg-green-500 text-white' :
                          submission.status === 'failed' ? 'bg-red-500 text-white' :
                          'bg-gray-500 text-white'
                        }`}>
                          {submission.status.toUpperCase()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Found Flags Collection */}
            {foundFlags.size > 0 && (
              <div className="card">
                <h3 className="text-lg font-semibold text-green-400 mb-3 flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.4 6L14 4H5v17h2v-7h5.6l.4 2h7V6h-5.6z"/>
                  </svg>
                  Discovered Flags ({foundFlags.size})
                </h3>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {Array.from(foundFlags).map((discoveredFlag, index) => (
                    <div key={index} className="p-2 bg-green-900/20 border border-green-500/30 rounded">
                      <code className="text-xs text-green-400 break-all">
                        {discoveredFlag}
                      </code>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Vulnerability Database */}
          <div className="lg:col-span-2 space-y-6">
            <div className="card">
              <h3 className="text-xl font-bold text-hacksmith-orange mb-4 flex items-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
                Vulnerability Challenges
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {vulnerabilities.map((vuln, index) => (
                  <div 
                    key={index} 
                    className="border border-gray-600 rounded-lg p-4 hover:border-hacksmith-orange transition-all cursor-pointer group"
                    onClick={() => setSelectedVuln(selectedVuln?.name === vuln.name ? null : vuln)}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold text-white group-hover:text-hacksmith-orange transition-colors">
                        {vuln.name}
                      </h4>
                      <span className={`text-xs px-2 py-1 rounded font-bold ${
                        vuln.severity === 'Critical' ? 'bg-red-500 text-white' :
                        vuln.severity === 'High' ? 'bg-orange-500 text-white' :
                        vuln.severity === 'Medium' ? 'bg-yellow-500 text-black' :
                        'bg-green-500 text-white'
                      }`}>
                        {vuln.severity}
                      </span>
                    </div>
                    <code className="text-xs text-hacksmith-orange bg-hacksmith-light-gray px-2 py-1 rounded mb-2 block">
                      {vuln.format}
                    </code>
                    <p className="text-sm text-gray-400">
                      {vuln.hint}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Detailed Vulnerability Info */}
            {selectedVuln && (
              <div className="card border-hacksmith-orange">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-hacksmith-orange">{selectedVuln.name}</h3>
                  <button 
                    onClick={() => setSelectedVuln(null)}
                    className="text-gray-400 hover:text-white"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-white mb-2 flex items-center">
                      <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z"/>
                        <polyline points="14,2 14,8 20,8"/>
                      </svg>
                      Description
                    </h4>
                    <p className="text-gray-300 text-sm">{selectedVuln.description}</p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-white mb-2 flex items-center">
                      <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M12,7C13.4,7 14.8,8.6 14.8,10V11H16V18H8V11H9.2V10C9.2,8.6 10.6,7 12,7M12,8.2C11.2,8.2 10.4,8.7 10.4,10V11H13.6V10C13.6,8.7 12.8,8.2 12,8.2Z"/>
                      </svg>
                      Mitigation Strategies
                    </h4>
                    <ul className="space-y-1">
                      {selectedVuln.mitigation.map((item, idx) => (
                        <li key={idx} className="text-gray-300 text-sm flex items-start">
                          <span className="text-hacksmith-orange mr-2">•</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-white mb-2 flex items-center">
                      <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
                      </svg>
                      Learning Resources
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {selectedVuln.resources.map((resource, idx) => (
                        <a 
                          key={idx} 
                          href={resource.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center space-x-2 p-2 bg-hacksmith-light-gray rounded hover:bg-hacksmith-orange/20 transition-colors text-sm"
                        >
                          <span className={`px-2 py-1 rounded text-xs font-bold ${
                            resource.type === 'OWASP' ? 'bg-blue-500 text-white' :
                            resource.type === 'CWE' ? 'bg-purple-500 text-white' :
                            resource.type === 'Tool' ? 'bg-green-500 text-white' :
                            'bg-orange-500 text-white'
                          }`}>
                            {resource.type}
                          </span>
                          <span className="text-gray-300 hover:text-white truncate">
                            {resource.title}
                          </span>
                          <span className="text-hacksmith-orange">↗</span>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Educational Notice */}
            <div className="card bg-yellow-900/10 border-yellow-500/30">
              <h3 className="text-lg font-semibold text-yellow-400 mb-3 flex items-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/>
                </svg>
                Ethical Hacking Notice
              </h3>
              <div className="text-sm text-yellow-300 space-y-2">
                <p>
                  This platform contains <strong>intentional vulnerabilities</strong> for educational purposes. 
                  All techniques demonstrated here should only be used in:
                </p>
                <ul className="list-disc pl-4 space-y-1">
                  <li>Authorized penetration testing environments</li>
                  <li>Your own applications and systems</li>
                  <li>Educational labs and CTF competitions</li>
                  <li>Bug bounty programs with explicit permission</li>
                </ul>
                <p className="font-semibold flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h2v2h-2v-2zm0-8h2v6h-2V9z"/>
                  </svg>
                  Never attempt these techniques on systems you don't own or lack explicit permission to test.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-8 text-center">
          <Link href="/" className="text-hacksmith-orange hover:underline">
            ← Back to Vulnerability Testing Lab
          </Link>
        </div>
      </div>
    </div>
  );
}
