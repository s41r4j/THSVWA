import { useState } from 'react';

export default function Execute() {
  const [command, setCommand] = useState('');
  const [output, setOutput] = useState('');
  const [isExecuting, setIsExecuting] = useState(false);
  const [commandHistory, setCommandHistory] = useState<{command: string, output: string, timestamp: string}[]>([]);

  const handleExecute = () => {
    if (!command.trim()) {
      setOutput('Error: Please enter a command');
      return;
    }

    setIsExecuting(true);
    
    // Simulate command execution delay
    setTimeout(() => {
      let result = '';
      const timestamp = new Date().toLocaleString();
      
      // Simulated command injection vulnerability
      if (command.toLowerCase().includes('whoami')) {
        result = 'FLAG{CMD_INJECTION_SUCCESS}\nhacksmith-user\nYou have successfully exploited command injection!';
      } else if (command.toLowerCase().includes('ls') || command.toLowerCase().includes('dir')) {
        result = 'flag.txt\nsecret_data.db\nconfig.ini\nusers.json\nbackup_files/';
      } else if (command.toLowerCase().includes('cat flag.txt') || command.toLowerCase().includes('type flag.txt')) {
        result = 'FLAG{LOCAL_FILE_ACCESS}';
      } else if (command.toLowerCase().includes('ps') || command.toLowerCase().includes('tasklist')) {
        result = 'PID  COMMAND\n1234 nginx\n5678 mysql\n9012 node app.js\n3456 sshd';
      } else if (command.toLowerCase().includes('id')) {
        result = 'uid=1000(hacksmith) gid=1000(hacksmith) groups=1000(hacksmith),4(adm),24(cdrom),27(sudo)';
      } else if (command.toLowerCase().includes('uname')) {
        result = 'Linux hacksmith-server 5.4.0-74-generic #83-Ubuntu SMP x86_64 GNU/Linux';
      } else if (command.toLowerCase().includes('pwd')) {
        result = '/var/www/hacksmith-shop';
      } else if (command.toLowerCase().includes('env')) {
        result = 'HOME=/home/hacksmith\nPATH=/usr/local/bin:/usr/bin:/bin\nUSER=hacksmith\nFLAG_ENV=FLAG{ENV_DISCLOSURE}';
      } else if (command.includes(';') || command.includes('&&') || command.includes('||') || command.includes('|')) {
        result = 'Command chaining detected! Vulnerability exploited.\nFLAG{COMMAND_CHAINING}';
      } else {
        result = `Command '${command}' executed successfully.\nOutput: [Simulated execution - no real commands run]`;
      }
      
      setOutput(result);
      setCommandHistory(prev => [{
        command: command,
        output: result,
        timestamp: timestamp
      }, ...prev.slice(0, 4)]); // Keep last 5 commands
      
      setIsExecuting(false);
    }, 1000 + Math.random() * 1000); // Random delay between 1-2 seconds
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isExecuting) {
      handleExecute();
    }
  };

  const commonCommands = [
    { cmd: 'whoami', desc: 'Display current user' },
    { cmd: 'ls -la', desc: 'List directory contents' },
    { cmd: 'cat /etc/passwd', desc: 'Read system file' },
    { cmd: 'ps aux', desc: 'List running processes' },
    { cmd: 'env', desc: 'Show environment variables' },
    { cmd: 'id', desc: 'Show user/group IDs' },
  ];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-hacksmith-dark via-hacksmith-gray to-hacksmith-dark py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="w-16 h-16 bg-hacksmith-orange rounded-full flex items-center justify-center text-3xl text-black font-bold mx-auto mb-4">
            ⚡
          </div>
          <h1 className="text-4xl font-bold text-hacksmith-orange mb-4">
            Command Execution Terminal
          </h1>
          <p className="text-xl text-gray-300">
            Execute system commands through our web interface
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Terminal Interface */}
          <div className="lg:col-span-2 space-y-6">
            <div className="card bg-black border-hacksmith-orange">
              <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-700">
                <h2 className="text-lg font-bold text-hacksmith-orange flex items-center">
                  <span className="mr-2">💻</span>
                  Terminal
                </h2>
                <div className="flex space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
              </div>
              
              {/* Command Input */}
              <div className="mb-4">
                <div className="flex items-center mb-2">
                  <span className="text-green-400 mr-2">hacksmith@server:~$</span>
                  <input
                    type="text"
                    value={command}
                    onChange={(e) => setCommand(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Enter command here..."
                    className="flex-1 bg-transparent border-none outline-none text-white font-mono"
                    disabled={isExecuting}
                  />
                </div>
                <button
                  onClick={handleExecute}
                  disabled={isExecuting || !command.trim()}
                  className={`btn-primary text-sm ${
                    isExecuting || !command.trim() ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {isExecuting ? (
                    <span className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-black mr-2"></div>
                      Executing...
                    </span>
                  ) : (
                    'Execute Command'
                  )}
                </button>
              </div>

              {/* Output Display */}
              <div className="bg-hacksmith-dark rounded-lg p-4 min-h-48 font-mono text-sm">
                <div className="text-gray-400 mb-2">Output:</div>
                {output ? (
                  <pre className={`whitespace-pre-wrap ${
                    output.includes('FLAG{') ? 'text-hacksmith-orange' : 'text-green-400'
                  }`}>
                    {output}
                  </pre>
                ) : (
                  <div className="text-gray-500 italic">
                    No output yet. Execute a command to see results.
                  </div>
                )}
              </div>
            </div>

            {/* Command History */}
            {commandHistory.length > 0 && (
              <div className="card">
                <h3 className="text-lg font-semibold text-hacksmith-orange mb-4">Command History</h3>
                <div className="space-y-3">
                  {commandHistory.map((entry, index) => (
                    <div key={index} className="border border-gray-600 rounded-lg p-3 bg-hacksmith-light-gray">
                      <div className="flex items-center justify-between mb-2">
                        <code className="text-sm text-hacksmith-orange">$ {entry.command}</code>
                        <span className="text-xs text-gray-500">{entry.timestamp}</span>
                      </div>
                      <pre className="text-xs text-gray-300 whitespace-pre-wrap max-h-20 overflow-y-auto">
                        {entry.output}
                      </pre>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Commands */}
            <div className="card">
              <h3 className="text-lg font-semibold text-hacksmith-orange mb-4">Quick Commands</h3>
              <div className="space-y-2">
                {commonCommands.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => setCommand(item.cmd)}
                    className="w-full text-left p-3 rounded-lg bg-hacksmith-light-gray hover:bg-hacksmith-orange hover:text-black transition-colors group"
                  >
                    <code className="text-sm font-mono text-hacksmith-orange group-hover:text-black">
                      {item.cmd}
                    </code>
                    <p className="text-xs text-gray-400 group-hover:text-black/70 mt-1">
                      {item.desc}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Security Warning */}
            <div className="card bg-red-900/20 border-red-500">
              <h3 className="text-lg font-semibold text-red-400 mb-3">⚠️ Security Alert</h3>
              <div className="text-sm text-red-300 space-y-2">
                <p>
                  This interface is vulnerable to command injection:
                </p>
                <ul className="list-disc pl-4 space-y-1">
                  <li>No input sanitization</li>
                  <li>Direct command execution</li>
                  <li>No access controls</li>
                  <li>Command chaining allowed</li>
                </ul>
                <p className="text-xs text-red-400 mt-3">
                  Try using operators like ; && || |
                </p>
              </div>
            </div>

            {/* CTF Hints */}
            <div className="card">
              <h3 className="text-lg font-semibold text-hacksmith-orange mb-3">💡 CTF Hints</h3>
              <div className="text-sm text-gray-400 space-y-2">
                <p>To find flags, try:</p>
                <ul className="list-disc pl-4 space-y-1">
                  <li>Basic system commands</li>
                  <li>File listing and reading</li>
                  <li>Environment variables</li>
                  <li>Command chaining techniques</li>
                  <li>Process and user information</li>
                </ul>
              </div>
            </div>

            {/* System Info */}
            <div className="card">
              <h3 className="text-lg font-semibold text-hacksmith-orange mb-3">🖥️ System Info</h3>
              <div className="text-sm text-gray-400 space-y-2">
                <div className="flex justify-between">
                  <span>OS:</span>
                  <span className="text-white">Ubuntu 20.04</span>
                </div>
                <div className="flex justify-between">
                  <span>Shell:</span>
                  <span className="text-white">bash</span>
                </div>
                <div className="flex justify-between">
                  <span>User:</span>
                  <span className="text-white">hacksmith</span>
                </div>
                <div className="flex justify-between">
                  <span>Privileges:</span>
                  <span className="text-yellow-400">Limited</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
