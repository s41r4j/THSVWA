import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useHints } from '../contexts/HintContext';
import { useNotifications } from '../contexts/NotificationContext';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState('');
  const [loginAttempts, setLoginAttempts] = useState<{username: string, timestamp: string, status: string}[]>([]);
  const router = useRouter();
  const { hintsVisible } = useHints();
  const { showFlagNotification } = useNotifications();

  // Check if user is already logged in and redirect to profile
  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      router.push('/profile');
    }
  }, [router]);

  // Only admin user exists - vulnerable to SQL injection
  const ADMIN_PASSWORD = '4dm1n';

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const timestamp = new Date().toLocaleString();
    
    // XSS Vulnerability - Direct HTML injection in error messages
    if (!username || !password) {
      setMessage(`<div style="color: red;">Error: Please enter both username and password for user: <strong>${username}</strong></div>`);
      setLoginAttempts(prev => [{
        username: username || 'empty',
        timestamp,
        status: 'failed'
      }, ...prev.slice(0, 4)]);
      return;
    }

    // SQL Injection Vulnerability - Simulated vulnerable SQL query
    // This simulates: SELECT * FROM users WHERE username = '$username' AND password = '$password'
    
    // Check for valid admin login first
    if (username === 'admin' && password === ADMIN_PASSWORD) {
      // Successful admin login
      setMessage(`<div style="color: green;">Welcome back, Administrator! Redirecting to profile...</div>`);
      setLoginAttempts(prev => [{
        username,
        timestamp,
        status: 'success'
      }, ...prev.slice(0, 4)]);
      
      // Store admin session
      localStorage.setItem('user', JSON.stringify({ username: 'admin', isAdmin: true }));
      
      setTimeout(() => {
        router.push('/profile');
      }, 1500);
      return;
    }

    // SQL Injection vulnerability - check for bypass attempts
    if (username.includes("'") || username.includes('"') || username.includes(';') || 
        username.toLowerCase().includes('or') || username.includes('--') || 
        username.includes('union') || username.includes('/*')) {
      
      // Simulate successful SQL injection bypass
      if (username.toLowerCase().includes("'") && (
          username.toLowerCase().includes('or') || 
          username.toLowerCase().includes('1=1') ||
          username.toLowerCase().includes('admin'))) {
        
        setMessage(`<div style="color: orange;">SQL Injection bypass successful!<br><strong>FL4G{5QL_1NJ3CT10N_5UCC355}</strong><br>Simulated Query: SELECT * FROM users WHERE username = '${username}' AND password = '${password}'<br>Admin access granted through SQL injection!</div>`);
        setLoginAttempts(prev => [{
          username,
          timestamp,
          status: 'sqli'
        }, ...prev.slice(0, 4)]);
        
        // Show SQL injection notification
        showFlagNotification('FL4G{5QL_1NJ3CT10N_5UCC355}', 'SQL Injection', 'SQL Injection Successful!');
        
        // Grant admin access through SQL injection
        localStorage.setItem('user', JSON.stringify({ username: 'admin', isAdmin: true }));
        
        setTimeout(() => {
          router.push('/profile');
        }, 2000);
        return;
      } else {
        setMessage(`<div style="color: orange;">SQL Injection detected but bypass failed.<br>Query: SELECT * FROM users WHERE username = '${username}' AND password = '${password}'</div>`);
        setLoginAttempts(prev => [{
          username,
          timestamp,
          status: 'sqli'
        }, ...prev.slice(0, 4)]);
        return;
      }
    }

    // Normal failed login
    setMessage(`<div style="color: red;">Invalid credentials. User <strong>${username}</strong> not found or wrong password.</div>`);
    setLoginAttempts(prev => [{
      username,
      timestamp,
      status: 'failed'
    }, ...prev.slice(0, 4)]);
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-hacksmith-dark via-hacksmith-gray to-hacksmith-dark py-16">
        <div className="max-w-md mx-auto px-6 text-center">
          <div className="w-16 h-16 bg-hacksmith-orange rounded-full flex items-center justify-center text-3xl text-black font-bold mx-auto mb-4">
            ◈
          </div>
          <h1 className="text-4xl font-bold text-hacksmith-orange mb-4">
            Login
          </h1>
          <p className="text-xl text-gray-300">
            Access your Hacksmith Tools account
          </p>
        </div>
      </div>

      <div className="max-w-md mx-auto px-6 py-8">
        {/* Login Form */}
        <div className="card">
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                className={`input-field ${hintsVisible ? 'border-orange-500/30 focus:border-orange-500' : ''}`}
              />
              {hintsVisible && (
                <div className="mt-1 text-xs text-orange-400 opacity-75">
                  SQL queries not sanitized
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="input-field pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-hacksmith-orange transition-colors"
                >
                  {showPassword ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
              {hintsVisible && (
                <div className="mt-1 text-xs text-yellow-400 opacity-75">
                  Password visible - Brute force protection minimal
                </div>
              )}
            </div>

            <button type="submit" className="btn-primary w-full">
              Login
            </button>
          </form>

          {/* XSS Vulnerability - Display message with dangerouslySetInnerHTML */}
          {message && (
            <div 
              className={`mt-4 p-3 rounded border bg-hacksmith-light-gray border-gray-600 ${hintsVisible ? 'border-red-500/30' : ''}`}
              dangerouslySetInnerHTML={{ __html: message }}
            />
          )}
          
          {hintsVisible && message && (
            <div className="mt-2 text-xs text-red-400 opacity-75">
              Output not escaped
            </div>
          )}
        </div>

        {/* Login Attempts History */}
        {loginAttempts.length > 0 && (
          <div className="mt-6 card">
            <h3 className="text-lg font-semibold text-hacksmith-orange mb-3">Recent Login Attempts</h3>
            <div className="space-y-2">
              {loginAttempts.map((attempt, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-hacksmith-light-gray rounded text-sm">
                  <span className="font-mono text-gray-300">{attempt.username}</span>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${
                      attempt.status === 'success' ? 'bg-green-500 text-white' :
                      attempt.status === 'sqli' ? 'bg-orange-500 text-white' :
                      'bg-red-500 text-white'
                    }`}>
                      {attempt.status === 'sqli' ? 'SQL INJECTION' : attempt.status.toUpperCase()}
                    </span>
                    <span className="text-gray-500 text-xs">{attempt.timestamp}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Hardcoded Credentials - Always visible, but vulnerability status only in hint mode */}
        <div className="mt-8 card bg-gray-800/50">
          <h3 className="text-lg font-semibold text-gray-400 mb-3">📋 Test Credentials</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between items-center p-2 bg-hacksmith-light-gray rounded">
              <div>
                <div className="font-semibold text-white">Admin User</div>
                <div className="text-gray-400">Username: <code>admin</code></div>
                <div className="text-gray-400">Password: <code>4dm1n</code></div>
              </div>
              {hintsVisible && (
                <span className="text-red-400 text-xs">SQL Vulnerable</span>
              )}
            </div>
          </div>
        </div>

        {/* Back to Home */}
        <div className="mt-6 text-center">
          <Link href="/" className="text-hacksmith-orange hover:underline">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
