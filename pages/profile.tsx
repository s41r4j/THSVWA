import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function Profile() {
  const [user, setUser] = useState<{username: string, isAdmin: boolean} | null>(null);
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    } else {
      router.push('/login');
    }
  }, [router]);

  const handleImageUpload = () => {
    if (!profileImage) {
      setUploadStatus('Please select a file first.');
      return;
    }

    // Insecure File Upload Vulnerability - No proper validation
    const fileName = profileImage.name.toLowerCase();
    
    // Simulate file upload with intentional vulnerabilities
    if (fileName.includes('flag') || fileName.includes('admin')) {
      setUploadStatus(`FLAG{INSECURE_UPLOAD} - File "${profileImage.name}" uploaded successfully! This demonstrates insecure file upload vulnerability.`);
    } else if (fileName.endsWith('.php') || fileName.endsWith('.jsp') || fileName.endsWith('.asp')) {
      setUploadStatus(`Warning: Executable file "${profileImage.name}" uploaded! This could be dangerous. FLAG{FILE_EXECUTION_RISK}`);
    } else if (fileName.endsWith('.sh') || fileName.endsWith('.bat') || fileName.endsWith('.exe')) {
      setUploadStatus(`Script file "${profileImage.name}" uploaded successfully. Potential security risk detected.`);
    } else {
      setUploadStatus(`Profile image "${profileImage.name}" uploaded successfully.`);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    router.push('/login');
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🔐</div>
          <p className="text-gray-400">Please log in to access your profile.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-hacksmith-dark via-hacksmith-gray to-hacksmith-dark py-12">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <div className="w-20 h-20 bg-hacksmith-orange rounded-full flex items-center justify-center text-3xl text-black font-bold mx-auto mb-4">
            {user.isAdmin ? '�' : '�👤'}
          </div>
          <h1 className="text-3xl font-bold text-hacksmith-orange mb-2">
            Welcome, {user.username}
          </h1>
          <p className="text-gray-300">
            {user.isAdmin ? 'Administrator Account' : 'User Account'}
          </p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-8">
        {/* Profile Information */}
        <div className="card mb-6">
          <h2 className="text-xl font-bold text-hacksmith-orange mb-4">Profile Information</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Display Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your display name"
                className="input-field"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="input-field"
              />
            </div>
          </div>
        </div>

        {/* Profile Image Upload - VULNERABLE */}
        <div className="card mb-6">
          <h2 className="text-xl font-bold text-hacksmith-orange mb-4">Profile Image</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Upload Profile Picture
              </label>
              <input
                type="file"
                onChange={(e) => {
                  setProfileImage(e.target.files?.[0] || null);
                  setUploadStatus('');
                }}
                className="w-full p-3 bg-hacksmith-gray border border-gray-600 rounded-lg text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-hacksmith-orange file:text-black file:font-semibold"
              />
              <p className="text-xs text-gray-500 mt-1">
                Supported: JPG, PNG, GIF (but validation is weak...)
              </p>
            </div>

            {profileImage && (
              <div className="bg-hacksmith-light-gray rounded-lg p-3">
                <h4 className="font-semibold text-white mb-2">Selected File:</h4>
                <div className="text-sm space-y-1">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Name:</span>
                    <span className="text-white font-mono">{profileImage.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Size:</span>
                    <span className="text-white">{(profileImage.size / 1024).toFixed(2)} KB</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Type:</span>
                    <span className="text-white">{profileImage.type || 'Unknown'}</span>
                  </div>
                </div>
              </div>
            )}

            <button
              onClick={handleImageUpload}
              disabled={!profileImage}
              className={`btn-primary w-full ${!profileImage ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              Upload Image
            </button>

            {uploadStatus && (
              <div className={`p-3 rounded border ${
                uploadStatus.includes('FLAG{') ? 'bg-hacksmith-orange/20 border-hacksmith-orange text-hacksmith-orange' :
                uploadStatus.includes('Warning') || uploadStatus.includes('risk') ? 'bg-yellow-900/20 border-yellow-500 text-yellow-400' :
                'bg-green-900/20 border-green-500 text-green-400'
              }`}>
                <span className="font-mono text-sm">{uploadStatus}</span>
              </div>
            )}
          </div>
        </div>

        {/* Vulnerability Info */}
        <div className="card bg-red-900/20 border-red-500 mb-6">
          <h3 className="text-lg font-semibold text-red-400 mb-3">🔒 File Upload Vulnerability</h3>
          <div className="text-sm text-red-300 space-y-2">
            <p>This upload system is intentionally vulnerable:</p>
            <ul className="list-disc pl-4 space-y-1">
              <li>No proper file type validation</li>
              <li>No file content inspection</li>
              <li>Weak filename filtering</li>
              <li>No size restrictions</li>
            </ul>
            <p className="text-xs text-red-400 mt-3">
              Try uploading files with names like "flag.txt", "admin.php", or "script.sh"
            </p>
          </div>
        </div>

        {/* Account Actions */}
        <div className="card">
          <h3 className="text-lg font-semibold text-hacksmith-orange mb-4">Account Actions</h3>
          <div className="space-y-3">
            <button className="btn-primary w-full">
              Save Profile Changes
            </button>
            <button 
              onClick={handleLogout}
              className="w-full px-6 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors"
            >
              Logout
            </button>
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
