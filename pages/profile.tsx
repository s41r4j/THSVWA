import { useState } from 'react';

export default function Profile() {
  const [bio, setBio] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [website, setWebsite] = useState('');
  const [savedProfile, setSavedProfile] = useState(false);

  const handleSave = () => {
    setSavedProfile(true);
    setTimeout(() => setSavedProfile(false), 3000);
  };

  return (
    <div className="min-h-screen">
      {/* Profile Header */}
      <div className="bg-gradient-to-r from-hacksmith-dark via-hacksmith-gray to-hacksmith-dark py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="w-24 h-24 bg-hacksmith-orange rounded-full flex items-center justify-center text-4xl text-black font-bold mx-auto mb-4">
            👤
          </div>
          <h1 className="text-4xl font-bold text-hacksmith-orange mb-4">
            User Profile
          </h1>
          <p className="text-xl text-gray-300">
            Manage your account settings and personal information
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Form */}
          <div className="lg:col-span-2 space-y-6">
            <div className="card">
              <h2 className="text-2xl font-bold text-hacksmith-orange mb-6">Personal Information</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your full name"
                    className="input-field"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="input-field"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Website
                  </label>
                  <input
                    type="url"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    placeholder="https://your-website.com"
                    className="input-field"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Bio 
                    <span className="text-red-400 text-xs ml-2">
                      ⚠️ Vulnerable to XSS - Try: &lt;script&gt;alert('FLAG{XSS_HERE}')&lt;/script&gt;
                    </span>
                  </label>
                  <textarea
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="Tell us about yourself... (XSS testing allowed for educational purposes)"
                    rows={4}
                    className="input-field resize-none"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    This field is intentionally vulnerable to Cross-Site Scripting (XSS) for CTF purposes.
                  </p>
                </div>

                <button
                  onClick={handleSave}
                  className="btn-primary"
                >
                  Save Profile
                </button>

                {savedProfile && (
                  <div className="bg-green-500/20 border border-green-500 rounded-lg p-3 text-green-400">
                    ✅ Profile saved successfully!
                  </div>
                )}
              </div>
            </div>

            {/* Profile Preview */}
            <div className="card">
              <h3 className="text-xl font-bold text-hacksmith-orange mb-4">Profile Preview</h3>
              <div className="border border-gray-600 rounded-lg p-4 bg-hacksmith-light-gray">
                <div className="flex items-start space-x-4">
                  <div className="w-16 h-16 bg-hacksmith-orange rounded-full flex items-center justify-center text-2xl text-black font-bold">
                    👤
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-white">
                      {name || 'Your Name'}
                    </h4>
                    <p className="text-gray-400 text-sm">
                      {email || 'your-email@example.com'}
                    </p>
                    {website && (
                      <a href={website} className="text-hacksmith-orange text-sm hover:underline">
                        {website}
                      </a>
                    )}
                    {bio && (
                      <div className="mt-3 p-3 bg-hacksmith-gray rounded border border-gray-600">
                        <p className="text-sm text-gray-300 font-semibold mb-2">Bio:</p>
                        {/* XSS Vulnerability: dangerouslySetInnerHTML */}
                        <div 
                          className="text-gray-300 text-sm" 
                          dangerouslySetInnerHTML={{ __html: bio }} 
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Account Stats */}
            <div className="card">
              <h3 className="text-lg font-semibold text-hacksmith-orange mb-4">Account Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">Member Since:</span>
                  <span className="text-white">Aug 2025</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Orders:</span>
                  <span className="text-white">0</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Flags Found:</span>
                  <span className="text-hacksmith-orange font-bold">?</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">CTF Score:</span>
                  <span className="text-hacksmith-orange font-bold">0 pts</span>
                </div>
              </div>
            </div>

            {/* Security Notice */}
            <div className="card bg-red-900/20 border-red-500">
              <h3 className="text-lg font-semibold text-red-400 mb-3">🔒 Security Notice</h3>
              <div className="text-sm text-red-300 space-y-2">
                <p>
                  This profile page contains intentional security vulnerabilities for educational purposes:
                </p>
                <ul className="list-disc pl-4 space-y-1">
                  <li>Cross-Site Scripting (XSS) in bio field</li>
                  <li>Insufficient input validation</li>
                  <li>Missing output encoding</li>
                </ul>
                <p className="text-xs text-red-400 mt-3">
                  ⚠️ In a real application, these would be serious security flaws.
                </p>
              </div>
            </div>

            {/* CTF Hints */}
            <div className="card">
              <h3 className="text-lg font-semibold text-hacksmith-orange mb-3">💡 CTF Hints</h3>
              <div className="text-sm text-gray-400 space-y-2">
                <p>Looking for flags? Try:</p>
                <ul className="list-disc pl-4 space-y-1">
                  <li>Experimenting with the bio field</li>
                  <li>Checking the page source</li>
                  <li>Testing JavaScript injection</li>
                  <li>Exploring user input validation</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
