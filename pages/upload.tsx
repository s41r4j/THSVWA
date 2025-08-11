import { useState } from 'react';

export default function Upload() {
  const [file, setFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<string>('');
  const [uploadHistory, setUploadHistory] = useState<{name: string, size: string, timestamp: string, status: string}[]>([]);

  const handleUpload = () => {
    if (!file) {
      setUploadStatus('Please select a file first');
      return;
    }

    // Simulate file upload with intentional vulnerability
    const timestamp = new Date().toLocaleString();
    
    // Check for flag file (File Upload vulnerability)
    if (file.name.includes('flag.txt') || file.name.toLowerCase().includes('flag')) {
      const successMessage = 'FLAG{FILE_UPLOAD_BYPASS} - File uploaded successfully!';
      setUploadStatus(successMessage);
      
      setUploadHistory(prev => [{
        name: file.name,
        size: (file.size / 1024).toFixed(2) + ' KB',
        timestamp,
        status: 'success'
      }, ...prev.slice(0, 4)]);
      
      return;
    }

    // Simulate other file restrictions bypass scenarios
    const fileExt = file.name.split('.').pop()?.toLowerCase();
    const dangerousExts = ['php', 'jsp', 'asp', 'exe', 'sh', 'bat'];
    
    if (dangerousExts.includes(fileExt || '')) {
      setUploadStatus(`Warning: ${fileExt?.toUpperCase()} files are restricted but upload succeeded anyway (vulnerability!)${fileExt === 'php' ? ' FLAG{PHP_UPLOAD_BYPASS}' : ''}`);
    } else {
      setUploadStatus(`File "${file.name}" uploaded successfully`);
    }
    
    setUploadHistory(prev => [{
      name: file.name,
      size: (file.size / 1024).toFixed(2) + ' KB', 
      timestamp,
      status: dangerousExts.includes(fileExt || '') ? 'warning' : 'success'
    }, ...prev.slice(0, 4)]);
  };

  const allowedTypes = ['.jpg', '.jpeg', '.png', '.gif', '.pdf', '.txt'];
  const maxSizeDisplay = '10 MB';

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-hacksmith-dark via-hacksmith-gray to-hacksmith-dark py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="w-16 h-16 bg-hacksmith-orange rounded-full flex items-center justify-center text-3xl text-black font-bold mx-auto mb-4">
            📤
          </div>
          <h1 className="text-4xl font-bold text-hacksmith-orange mb-4">
            File Upload Center
          </h1>
          <p className="text-xl text-gray-300">
            Upload your files securely to our server
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upload Form */}
          <div className="space-y-6">
            <div className="card">
              <h2 className="text-2xl font-bold text-hacksmith-orange mb-6">Upload File</h2>
              
              <div className="space-y-4">
                {/* File Input */}
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Select File
                  </label>
                  <div className="relative">
                    <input
                      type="file"
                      onChange={(e) => {
                        setFile(e.target.files?.[0] || null);
                        setUploadStatus('');
                      }}
                      className="w-full p-3 bg-hacksmith-gray border-2 border-dashed border-gray-600 rounded-lg text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-hacksmith-orange file:text-black file:font-semibold hover:border-hacksmith-orange transition-colors"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Supported formats: {allowedTypes.join(', ')} | Max size: {maxSizeDisplay}
                  </p>
                </div>

                {/* File Info */}
                {file && (
                  <div className="bg-hacksmith-light-gray rounded-lg p-4">
                    <h4 className="font-semibold text-white mb-2">Selected File:</h4>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Name:</span>
                        <span className="text-white font-mono">{file.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Size:</span>
                        <span className="text-white">{(file.size / 1024).toFixed(2)} KB</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Type:</span>
                        <span className="text-white">{file.type || 'Unknown'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Last Modified:</span>
                        <span className="text-white">{new Date(file.lastModified).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Upload Button */}
                <button
                  onClick={handleUpload}
                  disabled={!file}
                  className={`btn-primary w-full ${
                    !file ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  Upload File
                </button>

                {/* Upload Status */}
                {uploadStatus && (
                  <div className={`p-4 rounded-lg border ${
                    uploadStatus.includes('FLAG{') || uploadStatus.includes('successfully')
                      ? 'bg-green-900/20 border-green-500 text-green-400'
                      : uploadStatus.includes('Warning') || uploadStatus.includes('restricted')
                      ? 'bg-yellow-900/20 border-yellow-500 text-yellow-400'
                      : 'bg-red-900/20 border-red-500 text-red-400'
                  }`}>
                    <div className="flex items-start">
                      <span className="text-lg mr-2">
                        {uploadStatus.includes('FLAG{') || uploadStatus.includes('successfully') ? '✅' : 
                         uploadStatus.includes('Warning') ? '⚠️' : '❌'}
                      </span>
                      <span className="font-mono text-sm">{uploadStatus}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Upload History */}
            {uploadHistory.length > 0 && (
              <div className="card">
                <h3 className="text-lg font-semibold text-hacksmith-orange mb-4">Upload History</h3>
                <div className="space-y-2">
                  {uploadHistory.map((upload, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-hacksmith-light-gray rounded-lg text-sm">
                      <div className="flex-1 truncate mr-4">
                        <div className="font-mono text-white">{upload.name}</div>
                        <div className="text-gray-400">{upload.size}</div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${
                          upload.status === 'success' ? 'bg-green-500 text-white' :
                          upload.status === 'warning' ? 'bg-yellow-500 text-black' :
                          'bg-red-500 text-white'
                        }`}>
                          {upload.status}
                        </span>
                        <span className="text-gray-500 text-xs whitespace-nowrap">
                          {upload.timestamp}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Information Panel */}
          <div className="space-y-6">
            {/* Upload Guidelines */}
            <div className="card">
              <h3 className="text-lg font-semibold text-hacksmith-orange mb-4">Upload Guidelines</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-start">
                  <span className="text-green-400 mr-2">✓</span>
                  <span className="text-gray-300">Images: JPG, PNG, GIF</span>
                </div>
                <div className="flex items-start">
                  <span className="text-green-400 mr-2">✓</span>
                  <span className="text-gray-300">Documents: PDF, TXT</span>
                </div>
                <div className="flex items-start">
                  <span className="text-red-400 mr-2">✗</span>
                  <span className="text-gray-300">Executables: EXE, BAT, SH</span>
                </div>
                <div className="flex items-start">
                  <span className="text-red-400 mr-2">✗</span>
                  <span className="text-gray-300">Scripts: PHP, JSP, ASP</span>
                </div>
                <div className="flex items-start">
                  <span className="text-hacksmith-orange mr-2">⚠️</span>
                  <span className="text-gray-300">Maximum file size: {maxSizeDisplay}</span>
                </div>
              </div>
            </div>

            {/* Security Notice */}
            <div className="card bg-red-900/20 border-red-500">
              <h3 className="text-lg font-semibold text-red-400 mb-3">🔒 Security Notice</h3>
              <div className="text-sm text-red-300 space-y-2">
                <p>
                  This upload functionality contains intentional vulnerabilities:
                </p>
                <ul className="list-disc pl-4 space-y-1">
                  <li>Insufficient file type validation</li>
                  <li>Missing content-type verification</li>
                  <li>Weak file extension filtering</li>
                  <li>No malware scanning</li>
                </ul>
                <p className="text-xs text-red-400 mt-3">
                  ⚠️ In production, implement proper file validation and scanning.
                </p>
              </div>
            </div>

            {/* CTF Hints */}
            <div className="card">
              <h3 className="text-lg font-semibold text-hacksmith-orange mb-3">💡 CTF Hints</h3>
              <div className="text-sm text-gray-400 space-y-2">
                <p>Looking for flags? Try uploading:</p>
                <ul className="list-disc pl-4 space-y-1">
                  <li>Files with specific names</li>
                  <li>Different file extensions</li>
                  <li>Files that bypass restrictions</li>
                  <li>Files that trigger special behaviors</li>
                </ul>
              </div>
            </div>

            {/* Technical Details */}
            <div className="card">
              <h3 className="text-lg font-semibold text-hacksmith-orange mb-3">📋 Technical Details</h3>
              <div className="text-sm text-gray-400 space-y-2">
                <div className="flex justify-between">
                  <span>Upload Method:</span>
                  <span className="text-white">Multipart Form</span>
                </div>
                <div className="flex justify-between">
                  <span>Validation:</span>
                  <span className="text-yellow-400">Client-side Only</span>
                </div>
                <div className="flex justify-between">
                  <span>Storage:</span>
                  <span className="text-white">Local Server</span>
                </div>
                <div className="flex justify-between">
                  <span>Scanning:</span>
                  <span className="text-red-400">Disabled</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
