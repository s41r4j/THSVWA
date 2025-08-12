import Link from 'next/link';
import { useRouter } from 'next/router';
import { ReactNode, useState } from 'react';
import { useHints } from '../contexts/HintContext';

type Props = { children: ReactNode };

const nav = [
  { href: '/', label: 'Home', icon: '◐' },
  { href: '/tools', label: 'Tools', icon: '⚒' },
  { href: '/login', label: 'Login', icon: '◈' },
];

export default function Layout({ children }: Props) {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { hintsVisible, toggleHints } = useHints();

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-xl border-b border-hacksmith-orange/20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="w-8 h-8 bg-hacksmith-orange rounded-lg flex items-center justify-center text-black font-bold group-hover:animate-glow transition-all">
                ⚡
              </div>
              <span className="text-xl font-bold text-hacksmith-orange group-hover:text-orange-300 transition-colors">
                Hacksmith Shop
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1">
              {nav.map((item) => {
                const active = router.pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                      active
                        ? 'bg-hacksmith-orange text-black shadow-lg'
                        : 'text-gray-300 hover:text-white hover:bg-hacksmith-light-gray'
                    }`}
                  >
                    <span className="text-lg">{item.icon}</span>
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center space-x-4">
              <Link href="/flag" className="btn-secondary text-sm">
                Submit Flag
              </Link>
              <button className="w-10 h-10 bg-hacksmith-light-gray rounded-lg flex items-center justify-center hover:bg-hacksmith-orange hover:text-black transition-colors">
                ◎
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden w-10 h-10 flex flex-col items-center justify-center space-y-1 hover:bg-hacksmith-light-gray rounded-lg transition-colors"
            >
              <div className={`w-5 h-0.5 bg-white transition-all ${mobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></div>
              <div className={`w-5 h-0.5 bg-white transition-all ${mobileMenuOpen ? 'opacity-0' : ''}`}></div>
              <div className={`w-5 h-0.5 bg-white transition-all ${mobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></div>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden transition-all duration-300 overflow-hidden ${mobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="px-6 py-4 bg-hacksmith-gray border-t border-hacksmith-orange/20">
            <nav className="space-y-2">
              {nav.map((item) => {
                const active = router.pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg font-medium transition-all ${
                      active
                        ? 'bg-hacksmith-orange text-black'
                        : 'text-gray-300 hover:text-white hover:bg-hacksmith-light-gray'
                    }`}
                  >
                    <span className="text-xl">{item.icon}</span>
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>
            
            <div className="mt-4 pt-4 border-t border-gray-600 space-y-2">
              <Link 
                href="/flag" 
                onClick={() => setMobileMenuOpen(false)}
                className="block w-full text-center btn-secondary"
              >
                Submit Flag
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1">{children}</main>

      {/* Global Hint Toggle Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={toggleHints}
          className={`px-6 py-3 rounded-full font-semibold shadow-lg transition-all transform hover:scale-105 flex items-center space-x-2 ${
            hintsVisible 
              ? 'bg-hacksmith-orange text-black shadow-hacksmith-orange/25 animate-pulse' 
              : 'bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-600'
          }`}
        >
          <span className="text-lg">{hintsVisible ? '👁️' : '🕶️'}</span>
          <span>Hint Mode: {hintsVisible ? 'ON' : 'OFF'}</span>
        </button>
      </div>

      <footer className="bg-hacksmith-gray border-t border-hacksmith-orange/20 mt-auto">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-hacksmith-orange rounded-lg flex items-center justify-center text-black font-bold">
                  ⚡
                </div>
                <span className="text-xl font-bold text-hacksmith-orange">Hacksmith Shop</span>
              </div>
              <p className="text-gray-400 text-sm">
                The ultimate destination for cybersecurity tools and Hacksmith merchandise. 
                Built for educational CTF challenges.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-hacksmith-orange transition-colors">✉</a>
                <a href="#" className="text-gray-400 hover:text-hacksmith-orange transition-colors">≋</a>
                <a href="#" className="text-gray-400 hover:text-hacksmith-orange transition-colors">◈</a>
                <a href="#" className="text-gray-400 hover:text-hacksmith-orange transition-colors">⬢</a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-hacksmith-orange">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/shop" className="text-gray-400 hover:text-white transition-colors">All Products</Link></li>
                <li><Link href="/shop?category=tools" className="text-gray-400 hover:text-white transition-colors">Security Tools</Link></li>
                <li><Link href="/shop?category=apparel" className="text-gray-400 hover:text-white transition-colors">Apparel</Link></li>
                <li><Link href="/flag" className="text-gray-400 hover:text-white transition-colors">Submit Flag</Link></li>
              </ul>
            </div>

            {/* CTF Info */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-hacksmith-orange">CTF Challenges</h3>
              <ul className="space-y-2 text-sm">
                <li className="text-gray-400">◎ SQL Injection</li>
                <li className="text-gray-400">⚡ XSS Scripting</li>
                <li className="text-gray-400">◈ Command Injection</li>
                <li className="text-gray-400">□ File Inclusion</li>
                <li className="text-gray-400">◐ IDOR Vulnerabilities</li>
                <li className="text-gray-400">▲ File Upload Bypass</li>
              </ul>
            </div>

            {/* Support */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-hacksmith-orange">Support</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">CTF Guide</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Security Docs</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact Us</a></li>
              </ul>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-gray-400">
              © {new Date().getFullYear()} Hacksmith Shop. Educational CTF platform.
            </div>
            <div className="text-sm text-hacksmith-orange mt-2 md:mt-0">
              ⚠ Intentionally Vulnerable for Educational Purposes
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

