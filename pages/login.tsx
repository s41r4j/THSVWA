import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loginAttempts, setLoginAttempts] = useState<{username: string, timestamp: string, status: string}[]>([]);
  const router = useRouter();

  // Hardcoded users
  const users = {
    'normal': { password: 'password123', isAdmin: false },
    'admin': { password: 'admin456', isAdmin: true }
  };

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

    const user = users[username as keyof typeof users];
    
    if (user && user.password === password) {
      // Successful login
      setMessage(`<div style="color: green;">Welcome back, <strong>${username}</strong>! Redirecting to profile...</div>`);
      setLoginAttempts(prev => [{
        username,
        timestamp,
        status: 'success'
      }, ...prev.slice(0, 4)]);
      
      // Store user session (simplified)
      localStorage.setItem('user', JSON.stringify({ username, isAdmin: user.isAdmin }));
      
      setTimeout(() => {
        router.push('/profile');
      }, 1500);
    } else {
      // SQL Injection vulnerability for normal user, but secured for admin
      if (username === 'admin') {
        // Secured for admin - no SQL injection
        setMessage(`<div style="color: red;">Invalid credentials for admin user.</div>`);
      } else {
        // SQL Injection vulnerability for normal users
        if (username.includes("'") || username.includes('"') || username.includes(';')) {
          setMessage(`<div style="color: orange;">SQL Injection detected for user: <strong>${username}</strong><br>FLAG{SQL_INJECTION_SUCCESS}<br>Query: SELECT * FROM users WHERE username = '${username}' AND password = '${password}'</div>`);
        } else {
          setMessage(`<div style="color: red;">Invalid credentials. User <strong>${username}</strong> not found or wrong password.</div>`);
        }
      }
      
      setLoginAttempts(prev => [{
        username,
        timestamp,
        status: username.includes("'") || username.includes('"') ? 'sqli' : 'failed'
      }, ...prev.slice(0, 4)]);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-hacksmith-dark via-hacksmith-gray to-hacksmith-dark py-16">
        <div className="max-w-md mx-auto px-6 text-center">
          <div className="w-16 h-16 bg-hacksmith-orange rounded-full flex items-center justify-center text-3xl text-black font-bold mx-auto mb-4">
            🔐
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
                className="input-field"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="input-field"
              />
            </div>

            <button type="submit" className="btn-primary w-full">
              Login
            </button>
          </form>

          {/* XSS Vulnerability - Display message with dangerouslySetInnerHTML */}
          {message && (
            <div 
              className="mt-4 p-3 rounded border bg-hacksmith-light-gray border-gray-600"
              dangerouslySetInnerHTML={{ __html: message }}
            />
          )}
        </div>

        {/* Test XSS Section */}
        <div className="mt-6 card bg-red-900/20 border-red-500">
          <h3 className="text-lg font-semibold text-red-400 mb-3">⚠️ XSS Testing</h3>
          <p className="text-sm text-red-300 mb-2">
            This login form is vulnerable to XSS. Try entering:
          </p>
          <ul className="text-sm text-red-300 list-disc pl-4 space-y-1">
            <li><code>&lt;script&gt;alert('XSS')&lt;/script&gt;</code></li>
            <li><code>&lt;img src=x onerror=alert('FLAG&#123;XSS_LOGIN&#125;')&gt;</code></li>
            <li><code>&lt;svg onload=alert('XSS')&gt;</code></li>
          </ul>
          <p className="text-xs text-red-400 mt-2">
            The vulnerability is in the error message display system.
          </p>
        </div>

        {/* SQL Injection Info */}
        <div className="mt-6 card bg-blue-900/20 border-blue-500">
          <h3 className="text-lg font-semibold text-blue-400 mb-3">🔍 SQL Injection Testing</h3>
          <p className="text-sm text-blue-300 mb-2">
            Try SQL injection payloads in the username field:
          </p>
          <ul className="text-sm text-blue-300 list-disc pl-4 space-y-1">
            <li><code>' OR '1'='1</code></li>
            <li><code>admin'; --</code></li>
            <li><code>' UNION SELECT * FROM users; --</code></li>
          </ul>
          <p className="text-xs text-blue-400 mt-2">
            Note: Admin user is protected from SQL injection, normal users are not.
          </p>
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

        {/* Hardcoded Credentials */}
        <div className="mt-8 card bg-gray-800/50">
          <h3 className="text-lg font-semibold text-gray-400 mb-3">📋 Test Credentials</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between items-center p-2 bg-hacksmith-light-gray rounded">
              <div>
                <div className="font-semibold text-white">Normal User</div>
                <div className="text-gray-400">Username: <code>normal</code></div>
                <div className="text-gray-400">Password: <code>password123</code></div>
              </div>
              <span className="text-yellow-400 text-xs">SQL Vulnerable</span>
            </div>
            
            <div className="flex justify-between items-center p-2 bg-hacksmith-light-gray rounded">
              <div>
                <div className="font-semibold text-white">Admin User</div>
                <div className="text-gray-400">Username: <code>admin</code></div>
                <div className="text-gray-400">Password: <code>admin456</code></div>
              </div>
              <span className="text-green-400 text-xs">SQL Protected</span>
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
