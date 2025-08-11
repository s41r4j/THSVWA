import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Include() {
  const router = useRouter();
  const { file } = router.query;
  const [selectedFile, setSelectedFile] = useState('');
  const [fileContent, setFileContent] = useState('');
  const [accessHistory, setAccessHistory] = useState<{file: string, timestamp: string, status: string}[]>([]);

  // Simulated file system with LFI vulnerability
  const files = {
    welcome: 'Welcome to Hacksmith Shop!\n\nThis is the main welcome file for new users. Here you can find basic information about our services and products.',
    about: 'About Hacksmith Shop\n\nWe are a cybersecurity education platform that provides hands-on learning experiences through intentionally vulnerable applications.',
    contact: 'Contact Information\n\nEmail: admin@hacksmith-shop.com\nPhone: +1 (555) 123-4567\nAddress: 123 Cyber Street, Security City, SC 12345',
    terms: 'Terms of Service\n\n1. This application is for educational purposes only\n2. Do not attempt these techniques on real systems\n3. Use responsibly and ethically',
    secret: 'FLAG{LFI_BASIC_ACCESS}\n\nCongratulations! You accessed a restricted file through Local File Inclusion.',
    '../config': 'Database Configuration\n\nHost: localhost\nUsername: hacksmith_user\nPassword: [REDACTED]\nFlag: FLAG{LFI_CONFIG_ACCESS}',
    '../../etc/passwd': 'root:x:0:0:root:/root:/bin/bash\nhacksmith:x:1000:1000:Hacksmith User:/home/hacksmith:/bin/bash\nmysql:x:999:999:MySQL Server:/var/lib/mysql:/bin/false\nFLAG{LFI_SYSTEM_FILE}',
    '../logs/access.log': 'Access Log\n\n2025-08-12 10:30:15 - User accessed /shop\n2025-08-12 10:31:22 - User searched for "SQL injection"\n2025-08-12 10:32:45 - Potential attack detected\nFLAG{LFI_LOG_ACCESS}',
    'flag.txt': 'FLAG{LFI_DIRECT_FLAG}\n\nDirect flag file access successful!',
  } as Record<string, string>;

  const availableFiles = [
    { name: 'welcome', description: 'Welcome message', type: 'public' },
    { name: 'about', description: 'About information', type: 'public' },
    { name: 'contact', description: 'Contact details', type: 'public' },
    { name: 'terms', description: 'Terms of service', type: 'public' },
  ];

  const hiddenFiles = [
    { name: 'secret', description: 'Secret file', type: 'restricted' },
    { name: '../config', description: 'Configuration file', type: 'system' },
    { name: '../../etc/passwd', description: 'System password file', type: 'system' },
    { name: '../logs/access.log', description: 'Access logs', type: 'logs' },
    { name: 'flag.txt', description: 'Flag file', type: 'hidden' },
  ];

  useEffect(() => {
    if (file) {
      setSelectedFile(file as string);
      handleFileLoad(file as string);
    }
  }, [file]);

  const handleFileLoad = (filename: string) => {
    const timestamp = new Date().toLocaleString();
    const content = files[filename];
    
    if (content) {
      setFileContent(content);
      setAccessHistory(prev => [{
        file: filename,
        timestamp,
        status: content.includes('FLAG{') ? 'flag_found' : 'success'
      }, ...prev.slice(0, 9)]); // Keep last 10 accesses
    } else {
      setFileContent('Error: File not found or access denied');
      setAccessHistory(prev => [{
        file: filename,
        timestamp,
        status: 'error'
      }, ...prev.slice(0, 9)]);
    }
  };

  const loadFile = (filename: string) => {
    router.push(`/include?file=${encodeURIComponent(filename)}`);
  };

  const handleManualInput = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedFile) {
      loadFile(selectedFile);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-hacksmith-dark via-hacksmith-gray to-hacksmith-dark py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="w-16 h-16 bg-hacksmith-orange rounded-full flex items-center justify-center text-3xl text-black font-bold mx-auto mb-4">
            📁
          </div>
          <h1 className="text-4xl font-bold text-hacksmith-orange mb-4">
            File Include System
          </h1>
          <p className="text-xl text-gray-300">
            Access and view system files through our include functionality
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* File Viewer */}
          <div className="lg:col-span-2 space-y-6">
            {/* File Selection */}
            <div className="card">
              <h2 className="text-2xl font-bold text-hacksmith-orange mb-6">File Selection</h2>
              
              <form onSubmit={handleManualInput} className="mb-6">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={selectedFile}
                    onChange={(e) => setSelectedFile(e.target.value)}
                    placeholder="Enter filename (e.g., secret, ../config, ../../etc/passwd)"
                    className="input-field flex-1 font-mono"
                  />
                  <button type="submit" className="btn-primary whitespace-nowrap">
                    Load File
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  ⚠️ Vulnerable to Local File Inclusion - try path traversal techniques
                </p>
              </form>

              {/* Quick File Buttons */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-300 mb-3">Available Files:</h3>
                <div className="flex flex-wrap gap-2">
                  {availableFiles.map((fileInfo) => (
                    <button
                      key={fileInfo.name}
                      onClick={() => loadFile(fileInfo.name)}
                      className="px-3 py-2 bg-hacksmith-light-gray rounded-lg text-sm hover:bg-hacksmith-orange hover:text-black transition-colors"
                    >
                      📄 {fileInfo.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* File Content Display */}
            <div className="card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-hacksmith-orange">
                  File Content: {file ? `"${file}"` : 'None selected'}
                </h3>
                {file && (
                  <span className={`px-2 py-1 rounded text-xs font-semibold ${
                    fileContent.includes('FLAG{') ? 'bg-hacksmith-orange text-black' :
                    fileContent.includes('Error:') ? 'bg-red-500 text-white' :
                    'bg-green-500 text-white'
                  }`}>
                    {fileContent.includes('FLAG{') ? 'FLAG FOUND' :
                     fileContent.includes('Error:') ? 'ERROR' : 'SUCCESS'}
                  </span>
                )}
              </div>
              
              <div className="bg-hacksmith-dark rounded-lg p-4 min-h-64">
                {fileContent ? (
                  <pre className={`whitespace-pre-wrap font-mono text-sm ${
                    fileContent.includes('FLAG{') ? 'text-hacksmith-orange' :
                    fileContent.includes('Error:') ? 'text-red-400' :
                    'text-green-400'
                  }`}>
                    {fileContent}
                  </pre>
                ) : (
                  <div className="text-gray-500 italic flex items-center justify-center h-64">
                    Select a file to view its contents
                  </div>
                )}
              </div>
            </div>

            {/* Access History */}
            {accessHistory.length > 0 && (
              <div className="card">
                <h3 className="text-lg font-semibold text-hacksmith-orange mb-4">Access History</h3>
                <div className="space-y-2">
                  {accessHistory.map((access, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-hacksmith-light-gray rounded-lg text-sm">
                      <code className="text-gray-300 font-mono">{access.file}</code>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${
                          access.status === 'flag_found' ? 'bg-hacksmith-orange text-black' :
                          access.status === 'success' ? 'bg-green-500 text-white' :
                          'bg-red-500 text-white'
                        }`}>
                          {access.status === 'flag_found' ? 'FLAG' : access.status.toUpperCase()}
                        </span>
                        <span className="text-gray-500 text-xs">
                          {access.timestamp}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* File System Structure */}
            <div className="card">
              <h3 className="text-lg font-semibold text-hacksmith-orange mb-4">File System</h3>
              <div className="text-sm font-mono">
                <div className="mb-2 text-gray-400">📁 /var/www/hacksmith/</div>
                <div className="ml-4 space-y-1">
                  <div>📄 welcome</div>
                  <div>📄 about</div>
                  <div>📄 contact</div>
                  <div>📄 terms</div>
                  <div className="text-red-400">🔒 secret</div>
                  <div className="text-yellow-400">📄 flag.txt</div>
                </div>
                <div className="mt-2 text-gray-400">📁 ../config/</div>
                <div className="ml-4 text-yellow-400">⚙️ database.conf</div>
                <div className="mt-2 text-gray-400">📁 ../../etc/</div>
                <div className="ml-4 text-red-400">🔐 passwd</div>
              </div>
            </div>

            {/* CTF Hints */}
            <div className="card">
              <h3 className="text-lg font-semibold text-hacksmith-orange mb-3">💡 LFI Techniques</h3>
              <div className="text-sm text-gray-400 space-y-2">
                <p>Try these file inclusion techniques:</p>
                <ul className="list-disc pl-4 space-y-1">
                  <li>Direct file access: <code className="text-hacksmith-orange">secret</code></li>
                  <li>Directory traversal: <code className="text-hacksmith-orange">../config</code></li>
                  <li>Deep traversal: <code className="text-hacksmith-orange">../../etc/passwd</code></li>
                  <li>Log files: <code className="text-hacksmith-orange">../logs/access.log</code></li>
                  <li>Hidden files: <code className="text-hacksmith-orange">flag.txt</code></li>
                </ul>
              </div>
            </div>

            {/* Security Warning */}
            <div className="card bg-red-900/20 border-red-500">
              <h3 className="text-lg font-semibold text-red-400 mb-3">🔒 Security Alert</h3>
              <div className="text-sm text-red-300 space-y-2">
                <p>This system is vulnerable to LFI:</p>
                <ul className="list-disc pl-4 space-y-1">
                  <li>No path sanitization</li>
                  <li>Directory traversal allowed</li>
                  <li>No access controls</li>
                  <li>System file exposure</li>
                </ul>
                <p className="text-xs text-red-400 mt-3">
                  Use ../ to traverse directories
                </p>
              </div>
            </div>

            {/* Hidden Files Hint */}
            <div className="card bg-yellow-900/20 border-yellow-500">
              <h3 className="text-lg font-semibold text-yellow-400 mb-3">🔍 Hidden Files</h3>
              <div className="text-sm text-yellow-300 space-y-1">
                <p>Some files might be hidden:</p>
                {hiddenFiles.map((file, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <code className="text-xs">{file.name}</code>
                    <span className={`text-xs px-1 py-0.5 rounded ${
                      file.type === 'system' ? 'bg-red-500' :
                      file.type === 'logs' ? 'bg-blue-500' :
                      file.type === 'hidden' ? 'bg-purple-500' :
                      'bg-yellow-500'
                    } text-white`}>
                      {file.type}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
