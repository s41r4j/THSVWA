import Link from 'next/link';

export default function Terms() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-hacksmith-dark via-hacksmith-gray to-hacksmith-dark py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="w-16 h-16 bg-hacksmith-orange rounded-full flex items-center justify-center text-3xl text-black font-bold mx-auto mb-4">
            <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z"/>
              <polyline points="14,2 14,8 20,8"/>
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-hacksmith-orange mb-4">
            Terms & Conditions
          </h1>
          <p className="text-xl text-gray-300">
            Educational Use Policy & Legal Disclaimer
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="space-y-8">
          
          {/* Educational Purpose */}
          <section className="card">
            <h2 className="text-2xl font-bold text-hacksmith-orange mb-4 flex items-center">
              <svg className="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
              Educational Purpose
            </h2>
            <div className="space-y-4 text-gray-300">
              <p>
                The Hacksmith Shop Vulnerable Web Application (THSVWA) is a deliberately vulnerable web application created 
                exclusively for educational purposes. This platform contains intentional security vulnerabilities designed 
                to teach web application security concepts, penetration testing techniques, and secure coding practices.
              </p>
              <p>
                This application is intended for use by security professionals, students, educators, and researchers to 
                learn about common web application vulnerabilities in a safe, controlled environment.
              </p>
            </div>
          </section>

          {/* Authorized Use */}
          <section className="card">
            <h2 className="text-2xl font-bold text-hacksmith-orange mb-4 flex items-center">
              <svg className="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M10,17L6,13L7.41,11.59L10,14.17L16.59,7.58L18,9L10,17Z"/>
              </svg>
              Authorized Use
            </h2>
            <div className="space-y-4 text-gray-300">
              <p className="font-semibold text-green-400">
                You are explicitly authorized to test, exploit, and experiment with this application for educational purposes.
              </p>
              <p>Acceptable use includes:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Learning about web application security vulnerabilities</li>
                <li>Practicing penetration testing techniques</li>
                <li>Understanding secure coding practices</li>
                <li>Educational research and academic purposes</li>
                <li>Security awareness training</li>
                <li>Capture The Flag (CTF) competitions and training</li>
                <li>Professional development in cybersecurity</li>
                <li>Teaching web application security concepts</li>
              </ul>
            </div>
          </section>

          {/* Prohibited Activities */}
          <section className="card border-red-500/30 bg-red-900/10">
            <h2 className="text-2xl font-bold text-red-400 mb-4 flex items-center">
              <svg className="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h2v2h-2v-2zm0-8h2v6h-2V9z"/>
              </svg>
              Prohibited Activities
            </h2>
            <div className="space-y-4 text-red-300">
              <p className="font-semibold">
                The techniques learned here must NEVER be used against systems you do not own or lack explicit permission to test.
              </p>
              <p>Specifically prohibited:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Using learned techniques against unauthorized systems</li>
                <li>Attacking third-party websites or applications</li>
                <li>Attempting to gain unauthorized access to any system</li>
                <li>Using this knowledge for malicious purposes</li>
                <li>Violating any local, state, federal, or international laws</li>
                <li>Sharing techniques with intent to cause harm</li>
                <li>Using automated tools against unauthorized targets</li>
              </ul>
            </div>
          </section>

          {/* Legal Disclaimer */}
          <section className="card">
            <h2 className="text-2xl font-bold text-hacksmith-orange mb-4 flex items-center">
              <svg className="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,17A1.5,1.5 0 0,1 10.5,15.5A1.5,1.5 0 0,1 12,14A1.5,1.5 0 0,1 13.5,15.5A1.5,1.5 0 0,1 12,17M12,10A1,1 0 0,1 13,11V13A1,1 0 0,1 12,14A1,1 0 0,1 11,13V11A1,1 0 0,1 12,10Z"/>
              </svg>
              Legal Disclaimer
            </h2>
            <div className="space-y-4 text-gray-300">
              <p>
                This application is provided &quot;as is&quot; for educational purposes only. By using this application, you acknowledge
                and agree to the following:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>You understand this is a deliberately vulnerable application</li>
                <li>You will use the knowledge gained responsibly and ethically</li>
                <li>You will not use learned techniques against unauthorized systems</li>
                <li>You are solely responsible for your actions and their consequences</li>
                <li>The creators are not liable for any misuse of this educational material</li>
                <li>You will comply with all applicable laws and regulations</li>
                <li>You understand the ethical implications of cybersecurity testing</li>
              </ul>
            </div>
          </section>

          {/* Responsible Disclosure */}
          <section className="card">
            <h2 className="text-2xl font-bold text-hacksmith-orange mb-4 flex items-center">
              <svg className="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M11,7H13V9H11V7M11,11H13V17H11V11Z"/>
              </svg>
              Responsible Disclosure
            </h2>
            <div className="space-y-4 text-gray-300">
              <p>
                When you discover vulnerabilities in real-world applications:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Follow responsible disclosure practices</li>
                <li>Report findings to the appropriate security teams</li>
                <li>Respect bug bounty program guidelines</li>
                <li>Do not publicly disclose vulnerabilities without permission</li>
                <li>Help improve security rather than exploit weaknesses</li>
              </ul>
            </div>
          </section>

          {/* Best Practices */}
          <section className="card">
            <h2 className="text-2xl font-bold text-hacksmith-orange mb-4 flex items-center">
              <svg className="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9,20.42L2.79,14.21L5.62,11.38L9,14.77L18.88,4.88L21.71,7.71L9,20.42Z"/>
              </svg>
              Ethical Hacking Best Practices
            </h2>
            <div className="space-y-4 text-gray-300">
              <p>As you develop your cybersecurity skills, remember to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Always obtain proper authorization before testing</li>
                <li>Respect privacy and confidentiality</li>
                <li>Follow the principle of least harm</li>
                <li>Document your findings professionally</li>
                <li>Continuously educate yourself on legal and ethical standards</li>
                <li>Contribute positively to the security community</li>
                <li>Help others learn and grow in cybersecurity</li>
              </ul>
            </div>
          </section>

          {/* Contact */}
          <section className="card bg-hacksmith-orange/10 border-hacksmith-orange/30">
            <h2 className="text-2xl font-bold text-hacksmith-orange mb-4 flex items-center">
              <svg className="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20,4H4A2,2 0 0,0 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V6A2,2 0 0,0 20,4M20,18H4V8L12,13L20,8V18M20,6L12,11L4,6V6H20V6Z"/>
              </svg>
              Questions or Concerns
            </h2>
            <div className="space-y-4 text-gray-300">
              <p>
                If you have questions about these terms, ethical hacking practices, or need guidance on responsible 
                vulnerability disclosure, please reach out to the cybersecurity community or educational institutions 
                that can provide appropriate guidance.
              </p>
              <p className="text-hacksmith-orange font-semibold">
                Remember: With great power comes great responsibility. Use your cybersecurity knowledge to make the 
                digital world safer for everyone.
              </p>
            </div>
          </section>

        </div>

        {/* Navigation */}
        <div className="mt-12 text-center">
          <Link href="/" className="text-hacksmith-orange hover:underline text-lg">
            ← Back to Vulnerability Testing Lab
          </Link>
        </div>
      </div>
    </div>
  );
}
