import { FormEvent, useState } from 'react';
import { useHints } from '../contexts/HintContext';

export default function FlagSubmit() {
  const [flag, setFlag] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [submissionHistory, setSubmissionHistory] = useState<{flag: string, timestamp: string, status: string}[]>([]);
  const { hintsVisible } = useHints();

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    
    try {
      const res = await fetch('/api/flag', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ flag }),
      });
      const data = await res.json();
      const resultMessage = data.message || 'Unknown response';
      setMessage(resultMessage);
      
      // Add to submission history
      const newSubmission = {
        flag: flag,
        timestamp: new Date().toLocaleString(),
        status: res.ok ? 'success' : 'failed'
      };
      setSubmissionHistory(prev => [newSubmission, ...prev.slice(0, 4)]);
      
      if (res.ok) {
        setFlag('');
      }
    } catch (err) {
      setMessage('Something went wrong');
      const newSubmission = {
        flag: flag,
        timestamp: new Date().toLocaleString(),
        status: 'error'
      };
      setSubmissionHistory(prev => [newSubmission, ...prev.slice(0, 4)]);
    } finally {
      setLoading(false);
    }
  };

  const knownFlags = [
    { name: 'SQL Injection', format: 'FLAG&#123;SQL_*&#125;', hint: 'Check the shop search functionality' },
    { name: 'XSS Attack', format: 'FLAG&#123;XSS_*&#125;', hint: 'Profile bio field accepts HTML' },
    { name: 'IDOR', format: 'FLAG&#123;IDOR_*&#125;', hint: 'Try accessing item IDs you should not' },
    { name: 'LFI', format: 'FLAG&#123;LFI_*&#125;', hint: 'Include page might read local files' },
    { name: 'File Upload', format: 'FLAG&#123;UPLOAD_*&#125;', hint: 'Upload restrictions might be bypassable' },
  ];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-hacksmith-dark via-hacksmith-gray to-hacksmith-dark py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="w-16 h-16 bg-hacksmith-orange rounded-full flex items-center justify-center text-3xl text-black font-bold mx-auto mb-4">
            ◈
          </div>
          <h1 className="text-4xl font-bold text-hacksmith-orange mb-4">
            Submit CTF Flag
          </h1>
          <p className="text-xl text-gray-300">
            Found a vulnerability? Submit your discovered flag here!
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Flag Submission Form */}
          <div className="space-y-6">
            <div className="card">
              <h2 className="text-2xl font-bold text-hacksmith-orange mb-6">Submit Your Flag</h2>
              
              <form onSubmit={onSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Flag Value
                  </label>
                  <input
                    type="text"
                    value={flag}
                    onChange={(e) => setFlag(e.target.value)}
                    placeholder="FLAG&#123;YOUR_DISCOVERED_FLAG_HERE&#125;"
                    className="input-field font-mono"
                    disabled={loading}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Flags should follow the format: FLAG&#123;VULNERABILITY_TYPE_VALUE&#125;
                  </p>
                </div>
                
                <button
                  type="submit"
                  disabled={loading || !flag.trim()}
                  className="btn-primary w-full"
                >
                  {loading ? 'Submitting...' : 'Submit Flag'}
                </button>
              </form>

              {/* Result Message */}
              {message && (
                <div className="mt-4 p-4 rounded-lg border bg-red-900/20 border-red-500 text-red-400">
                  <span>{message}</span>
                </div>
              )}
            </div>

            {/* Submission History */}
            {submissionHistory.length > 0 && (
              <div className="card">
                <h3 className="text-lg font-semibold text-hacksmith-orange mb-4">Recent Submissions</h3>
                <div className="space-y-2">
                  {submissionHistory.map((submission, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-hacksmith-light-gray rounded-lg text-sm">
                      <span className="font-mono text-gray-300 truncate mr-4">
                        {submission.flag}
                      </span>
                      <span className="text-gray-500 text-xs">
                        {submission.timestamp}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Challenge Information */}
          <div className="space-y-6">
            {/* Challenge List */}
            <div className="card">
              <h3 className="text-lg font-semibold text-hacksmith-orange mb-4">Available Challenges</h3>
              <div className="space-y-3">
                {knownFlags.map((challenge, index) => (
                  <div key={index} className="border border-gray-600 rounded-lg p-4 hover:border-hacksmith-orange transition-colors">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold text-white">{challenge.name}</h4>
                      <code className="text-xs text-hacksmith-orange bg-hacksmith-light-gray px-2 py-1 rounded">
                        {challenge.format}
                      </code>
                    </div>
                    <p className="text-sm text-gray-400">
                      ◉ {challenge.hint}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Security Warning */}
            <div className="card bg-yellow-900/20 border-yellow-500">
              <h3 className="text-lg font-semibold text-yellow-400 mb-3">⚠ Educational Notice</h3>
              <div className="text-sm text-yellow-300">
                <p className="mb-2">
                  This application contains intentional security vulnerabilities for educational purposes only.
                </p>
                <p>
                  <strong>Never</strong> attempt these techniques on real applications without explicit permission.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
