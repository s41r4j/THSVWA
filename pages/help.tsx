import Link from 'next/link';

export default function HelpCenter() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-hacksmith-dark via-hacksmith-gray to-hacksmith-dark py-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold text-hacksmith-orange mb-4">
            Help Center
          </h1>
          <p className="text-xl text-gray-300">
            Setup instructions and getting started guide
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Start */}
          <div className="lg:col-span-2 space-y-8">
            <div className="card">
              <h2 className="text-2xl font-bold text-hacksmith-orange mb-6 flex items-center">
                <svg className="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
                Quick Start Guide
              </h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">Docker Setup (Recommended)</h3>
                  <div className="bg-hacksmith-dark rounded-lg p-4 mb-4">
                    <pre className="text-green-400 text-sm"><code>{`# Clone the repository
git clone https://github.com/s41r4j/thsvwa.git
cd thsvwa

# Build the Docker image
docker build -t thsvwa .

# Run the container
docker run -p 3000:3000 thsvwa

# Access the application
# Open http://localhost:3000 in your browser`}</code></pre>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">Local Development Setup</h3>
                  <div className="bg-hacksmith-dark rounded-lg p-4 mb-4">
                    <pre className="text-green-400 text-sm"><code>{`# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
npm start`}</code></pre>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">System Requirements</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li className="flex items-center">
                      <span className="text-hacksmith-orange mr-2">•</span>
                      <strong>Node.js:</strong> 18.0 or higher
                    </li>
                    <li className="flex items-center">
                      <span className="text-hacksmith-orange mr-2">•</span>
                      <strong>Docker:</strong> 20.0 or higher (optional)
                    </li>
                    <li className="flex items-center">
                      <span className="text-hacksmith-orange mr-2">•</span>
                      <strong>Browser:</strong> Modern browsers with JavaScript enabled
                    </li>
                    <li className="flex items-center">
                      <span className="text-hacksmith-orange mr-2">•</span>
                      <strong>Platform:</strong> Windows, macOS, Linux
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="card">
              <h2 className="text-2xl font-bold text-hacksmith-orange mb-6">Environment Configuration</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">Optional Environment Variables</h3>
                  <div className="bg-hacksmith-dark rounded-lg p-4">
                    <pre className="text-green-400 text-sm"><code>{`# .env.local (optional)
PORT=3000
NODE_ENV=development

# For production deployment
NEXT_PUBLIC_BASE_URL=https://your-domain.com`}</code></pre>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="card">
              <h3 className="text-lg font-semibold text-hacksmith-orange mb-4">Quick Links</h3>
              <div className="space-y-3">
                <Link href="/ctf-guide" className="block text-gray-300 hover:text-hacksmith-orange transition-colors">
                  → CTF Challenge Guide
                </Link>
                <Link href="/security-docs" className="block text-gray-300 hover:text-hacksmith-orange transition-colors">
                  → Security Documentation
                </Link>
                <Link href="/contact" className="block text-gray-300 hover:text-hacksmith-orange transition-colors">
                  → Contact & Support
                </Link>
                <a href="https://github.com/s41r4j/thsvwa" target="_blank" rel="noopener noreferrer" className="block text-gray-300 hover:text-hacksmith-orange transition-colors">
                  → GitHub Repository ↗
                </a>
              </div>
            </div>

            <div className="card bg-yellow-900/20 border-yellow-500/30">
              <h3 className="text-lg font-semibold text-yellow-400 mb-4">⚠️ Important Notice</h3>
              <div className="text-sm text-yellow-300 space-y-2">
                <p>This application contains <strong>intentional security vulnerabilities</strong> for educational purposes.</p>
                <p><strong>Never deploy this application in a production environment.</strong></p>
                <p>Use only in isolated, controlled environments for learning and testing.</p>
              </div>
            </div>

            <div className="card bg-blue-900/20 border-blue-500/30">
              <h3 className="text-lg font-semibold text-blue-400 mb-4">Getting Started</h3>
              <div className="text-sm text-blue-300 space-y-2">
                <p>1. Set up the application using Docker or npm</p>
                <p>2. Enable hint mode for guided learning</p>
                <p>3. Explore each vulnerability challenge</p>
                <p>4. Submit discovered flags for points</p>
                <p>5. Review security documentation</p>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-12 text-center">
          <Link href="/" className="text-hacksmith-orange hover:underline">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
