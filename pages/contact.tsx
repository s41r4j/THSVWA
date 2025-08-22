import Link from 'next/link';

export default function Contact() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-hacksmith-dark via-hacksmith-gray to-hacksmith-dark py-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold text-hacksmith-orange mb-4">
            Contact & Support
          </h1>
          <p className="text-xl text-gray-300">
            Get help, report issues, and connect with the community
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Information */}
          <div className="space-y-6">
            <div className="card">
              <h2 className="text-2xl font-bold text-hacksmith-orange mb-6">Project Information</h2>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <svg className="w-5 h-5 text-hacksmith-orange" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  <div>
                    <div className="font-semibold text-white">GitHub Repository</div>
                    <a href="https://github.com/s41r4j/thsvwa" target="_blank" rel="noopener noreferrer" 
                       className="text-hacksmith-orange hover:underline">
                      github.com/s41r4j/thsvwa ↗
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <svg className="w-5 h-5 text-hacksmith-orange" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2L2 7v10c0 5.55 3.84 9.78 9 11 5.16-1.22 9-5.45 9-11V7l-10-5z"/>
                  </svg>
                  <div>
                    <div className="font-semibold text-white">License</div>
                    <div className="text-gray-300">MIT License - Educational Use</div>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <svg className="w-5 h-5 text-hacksmith-orange" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.1 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z"/>
                  </svg>
                  <div>
                    <div className="font-semibold text-white">Version</div>
                    <div className="text-gray-300">v1.0.0 - Educational Release</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="card">
              <h2 className="text-2xl font-bold text-hacksmith-orange mb-6">Support Channels</h2>
              
              <div className="space-y-4">
                <div className="bg-hacksmith-dark rounded-lg p-4 border border-gray-700">
                  <h3 className="font-semibold text-white mb-2">GitHub Issues</h3>
                  <p className="text-gray-300 text-sm mb-3">
                    Report bugs, suggest features, or ask technical questions
                  </p>
                  <a href="https://github.com/s41r4j/thsvwa/issues" target="_blank" rel="noopener noreferrer"
                     className="text-hacksmith-orange hover:underline text-sm">
                    → Open an Issue ↗
                  </a>
                </div>

                <div className="bg-hacksmith-dark rounded-lg p-4 border border-gray-700">
                  <h3 className="font-semibold text-white mb-2">Discussions</h3>
                  <p className="text-gray-300 text-sm mb-3">
                    Community discussions, questions, and knowledge sharing
                  </p>
                  <a href="https://github.com/s41r4j/thsvwa/discussions" target="_blank" rel="noopener noreferrer"
                     className="text-hacksmith-orange hover:underline text-sm">
                    → Join Discussions ↗
                  </a>
                </div>

                <div className="bg-hacksmith-dark rounded-lg p-4 border border-gray-700">
                  <h3 className="font-semibold text-white mb-2">Contributing</h3>
                  <p className="text-gray-300 text-sm mb-3">
                    Contribute to the project with code, documentation, or ideas
                  </p>
                  <a href="https://github.com/s41r4j/thsvwa/blob/main/CONTRIBUTING.md" target="_blank" rel="noopener noreferrer"
                     className="text-hacksmith-orange hover:underline text-sm">
                    → Contribution Guide ↗
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ and Additional Info */}
          <div className="space-y-6">
            <div className="card">
              <h2 className="text-2xl font-bold text-hacksmith-orange mb-6">Frequently Asked Questions</h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-white mb-2">Is this application safe to run?</h3>
                  <p className="text-gray-300 text-sm">
                    This application contains intentional vulnerabilities for educational purposes. 
                    Never deploy it in a production environment. Use only in isolated, controlled environments.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-white mb-2">Can I use this for training purposes?</h3>
                  <p className="text-gray-300 text-sm">
                    Yes! This application is designed for cybersecurity education, training workshops, 
                    and academic coursework. Please ensure proper supervision and controlled environments.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-white mb-2">How do I report a bug or issue?</h3>
                  <p className="text-gray-300 text-sm">
                    Please use the GitHub Issues page to report bugs, request features, or ask questions. 
                    Provide detailed information about your environment and steps to reproduce.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-white mb-2">Can I contribute to this project?</h3>
                  <p className="text-gray-300 text-sm">
                    Absolutely! Contributions are welcome. Please check the contribution guidelines 
                    and consider adding new vulnerabilities, improving documentation, or enhancing the UI.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-white mb-2">What technologies are used?</h3>
                  <p className="text-gray-300 text-sm">
                    Built with Next.js 14, TypeScript, Tailwind CSS, and React. 
                    Containerized with Docker for easy deployment and consistent environments.
                  </p>
                </div>
              </div>
            </div>

            <div className="card bg-yellow-900/20 border-yellow-500/30">
              <h2 className="text-2xl font-bold text-yellow-400 mb-6">⚠️ Important Disclaimers</h2>
              
              <div className="space-y-3 text-sm text-yellow-300">
                <p>
                  <strong>Educational Purpose Only:</strong> This application is designed exclusively for 
                  cybersecurity education and ethical hacking training.
                </p>
                
                <p>
                  <strong>No Production Use:</strong> Never deploy this application in any production 
                  environment or network accessible to unauthorized users.
                </p>
                
                <p>
                  <strong>Ethical Use:</strong> Use the knowledge gained responsibly and only on systems 
                  you own or have explicit permission to test.
                </p>
                
                <p>
                  <strong>No Warranty:</strong> This software is provided &quot;as is&quot; without warranty.
                  Users assume all risks associated with its use.
                </p>
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
