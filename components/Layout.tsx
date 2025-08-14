import Link from 'next/link';
import { useRouter } from 'next/router';
import { ReactNode, useState, useEffect } from 'react';
import { useHints } from '../contexts/HintContext';
import { NotificationProvider } from '../contexts/NotificationContext';
import NotificationContainer from './NotificationContainer';

type Props = { children: ReactNode };

const nav = [
  // Navigation items removed - using logo for home and buttons for actions
];

export default function Layout({ children }: Props) {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState<{username: string, isAdmin: boolean} | null>(null);
  const [showFirstTimeHint, setShowFirstTimeHint] = useState(false);
  const { hintsVisible, toggleHints } = useHints();

  // Check if user is visiting for the first time
  useEffect(() => {
    const hasVisited = localStorage.getItem('thsvwa_has_visited');
    console.log('Has visited check:', hasVisited); // Debug log
    
    if (!hasVisited) {
      console.log('First time visitor - showing hint'); // Debug log
      setShowFirstTimeHint(true);
      localStorage.setItem('thsvwa_has_visited', 'true');
      
      // Hide hint after 3 seconds
      const timeout = setTimeout(() => {
        setShowFirstTimeHint(false);
      }, 3000);
      
      return () => clearTimeout(timeout);
    } else {
      console.log('User has visited before - no hint'); // Debug log
    }
  }, []);

  // Check login status on component mount and when localStorage changes
  useEffect(() => {
    const checkLoginStatus = () => {
      const userData = localStorage.getItem('user');
      if (userData) {
        try {
          const parsedUser = JSON.parse(userData);
          setIsLoggedIn(true);
          setUserInfo(parsedUser);
        } catch (error) {
          setIsLoggedIn(false);
          setUserInfo(null);
        }
      } else {
        setIsLoggedIn(false);
        setUserInfo(null);
      }
    };

    // Initial check
    checkLoginStatus();

    // Listen for storage changes (when user logs in/out in another tab)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'user') {
        checkLoginStatus();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Also check periodically in case of same-tab changes
    const interval = setInterval(checkLoginStatus, 1000);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (profileDropdownOpen && !target.closest('.profile-dropdown')) {
        setProfileDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [profileDropdownOpen]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setUserInfo(null);
    setProfileDropdownOpen(false);
    router.push('/');
  };

  return (
    <NotificationProvider>
      <div className="min-h-screen flex flex-col" data-hints-visible={hintsVisible}>
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

            {/* Desktop Navigation - Removed, using action buttons instead */}
            <nav className="hidden md:flex items-center space-x-1">
              {/* Navigation removed */}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center space-x-4">
              {isLoggedIn ? (
                <div className="relative profile-dropdown">
                  <button
                    onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                    className="btn-secondary text-sm flex items-center space-x-2"
                  >
                    {userInfo?.isAdmin ? (
                      <svg className="w-5 h-5 text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                        <circle cx="18" cy="6" r="3" fill="currentColor" opacity="0.6"/>
                        <text x="18" y="9" fontSize="6" textAnchor="middle" fill="white" fontWeight="bold">A</text>
                      </svg>
                    ) : (
                      <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                      </svg>
                    )}
                    <span>{userInfo?.username || 'Profile'}</span>
                    <svg className={`w-4 h-4 transition-transform ${profileDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  
                  {profileDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-hacksmith-gray border border-hacksmith-orange/20 rounded-lg shadow-lg z-50 animate-in fade-in duration-200">
                      <Link 
                        href="/profile" 
                        onClick={() => setProfileDropdownOpen(false)}
                        className="block px-4 py-2 text-sm text-gray-300 hover:text-hacksmith-orange hover:bg-hacksmith-light-gray transition-colors rounded-t-lg"
                      >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        View Profile
                      </Link>
                      <div className="border-t border-gray-600"></div>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:text-red-400 hover:bg-hacksmith-light-gray transition-colors rounded-b-lg"
                      >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link href="/login" className="btn-secondary text-sm flex items-center space-x-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                  </svg>
                  <span>Login</span>
                </Link>
              )}
              <Link href="/flag" className="btn-secondary text-sm">
                Submit Flag
              </Link>
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
            {/* Mobile navigation removed */}
            
            <div className="space-y-2">
              {isLoggedIn ? (
                <>
                  <div className="text-center text-gray-400 text-sm mb-2">
                    Welcome, {userInfo?.username}!
                  </div>
                  <Link 
                    href="/profile"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block w-full text-center btn-secondary flex items-center justify-center space-x-2"
                  >
                    {userInfo?.isAdmin ? (
                      <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 6l3 6h5l-4 3 1.5 4.5L12 16.5 6.5 19.5 8 15l-4-3h5l3-6z"/>
                      </svg>
                    ) : (
                      <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                      </svg>
                    )}
                    <span>View Profile</span>
                  </Link>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      handleLogout();
                    }}
                    className="block w-full text-center btn-secondary bg-red-600 hover:bg-red-700 flex items-center justify-center space-x-2"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <Link 
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block w-full text-center btn-secondary flex items-center justify-center space-x-2"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                  </svg>
                  <span>Login</span>
                </Link>
              )}
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
          className={`relative overflow-hidden rounded-full font-semibold shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 ${
            hintsVisible 
              ? 'bg-hacksmith-orange text-black shadow-hacksmith-orange/25' 
              : 'bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-600'
          } w-14 h-14 hover:w-48 hover:h-12 flex items-center justify-center group`}
        >
          {/* Circle state (default) */}
          <div className="flex items-center justify-center transition-opacity duration-300 group-hover:opacity-0">
            <span className="text-xl">
              {hintsVisible ? '◉' : '◎'}
            </span>
          </div>
          
          {/* Expanded state (on hover) */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100 px-4">
            <span className="text-sm font-medium whitespace-nowrap">
              Hint Mode: {hintsVisible ? 'ON' : 'OFF'}
            </span>
          </div>
        </button>
      </div>

      <footer className="bg-hacksmith-gray border-t border-hacksmith-orange/20 mt-auto">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <span className="text-xl font-bold text-hacksmith-orange">Hacksmith Shop</span>
              </div>
              <p className="text-gray-400 text-sm">
                The ultimate destination for blacksmithing tools and professional equipment.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-hacksmith-orange transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-hacksmith-orange transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-hacksmith-orange transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.097.118.112.223.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.758-1.378l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.624 0 11.99-5.367 11.99-11.987C24.007 5.367 18.641.001 12.017.001z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-hacksmith-orange transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-hacksmith-orange">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/" className="text-gray-400 hover:text-white transition-colors">Home</Link></li>
                <li><Link href="/login" className="text-gray-400 hover:text-white transition-colors">Login</Link></li>
                <li><Link href="/profile" className="text-gray-400 hover:text-white transition-colors">Profile</Link></li>
                <li><Link href="/flag" className="text-gray-400 hover:text-white transition-colors">Submit Flag</Link></li>
              </ul>
            </div>

            {/* CTF Info */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-hacksmith-orange">Security Challenges</h3>
              <ul className="space-y-2 text-sm">
                <li className="text-gray-400">SQL Injection</li>
                <li className="text-gray-400">XSS Scripting</li>
                <li className="text-gray-400">IDOR Vulnerabilities</li>
                <li className="text-gray-400">File Inclusion (LFI)</li>
                <li className="text-gray-400">File Upload Bypass</li>
                <li className="text-gray-400">Input Validation</li>
              </ul>
            </div>

            {/* Support */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-hacksmith-orange">Support</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/help" className="text-gray-400 hover:text-white transition-colors">Help Center</Link></li>
                <li><Link href="/ctf-guide" className="text-gray-400 hover:text-white transition-colors">CTF Guide</Link></li>
                <li><Link href="/security-docs" className="text-gray-400 hover:text-white transition-colors">Security Docs</Link></li>
                <li><Link href="/terms" className="text-gray-400 hover:text-white transition-colors">Terms & Conditions</Link></li>
                <li><Link href="/contact" className="text-gray-400 hover:text-white transition-colors">Contact Us</Link></li>
              </ul>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-gray-400">
              © {new Date().getFullYear()} Hacksmith Shop. All rights reserved.
            </div>
            <div className="text-sm text-hacksmith-orange mt-2 md:mt-0">
              ⚠ Intentionally Vulnerable for Educational Purposes
            </div>
          </div>
        </div>
      </footer>

      {/* First Time Visitor Hint */}
      {showFirstTimeHint && (
        <div className="fixed inset-0 z-[60] pointer-events-none">
          {/* Subtle overlay */}
          <div className="absolute inset-0 bg-black/10 backdrop-blur-[1px]"></div>
          
          {/* Hint content */}
          <div className="absolute bottom-24 right-2 flex items-center space-x-3 pointer-events-auto">
            {/* Hint text */}
            <div className="bg-hacksmith-gray/95 border border-hacksmith-orange/50 rounded-xl px-4 py-3 shadow-2xl backdrop-blur-sm max-w-xs relative">
              {/* Close button */}
              <button
                onClick={() => setShowFirstTimeHint(false)}
                className="absolute -top-2 -right-2 w-6 h-6 bg-hacksmith-orange text-black rounded-full flex items-center justify-center text-xs font-bold hover:bg-orange-400 transition-colors"
              >
                ×
              </button>
              
              <div className="flex items-center space-x-2 mb-2">
                <svg className="w-5 h-5 text-hacksmith-orange" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
                <span className="text-sm font-semibold text-hacksmith-orange">New here?</span>
              </div>
              <p className="text-xs text-gray-300 leading-relaxed">
                Click the hint button below to get helpful guidance while exploring vulnerabilities!
              </p>
            </div>
            
            {/* Animated arrow pointing to hint button - shifted right */}
            <div className="relative">
              <div className="animate-bounce">
                <svg className="w-8 h-8 text-hacksmith-orange drop-shadow-lg" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M7 10l5 5 5-5z"/>
                </svg>
              </div>
              {/* Pulsing glow effect */}
              <div className="absolute inset-0 animate-ping">
                <svg className="w-8 h-8 text-hacksmith-orange/50" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M7 10l5 5 5-5z"/>
                </svg>
              </div>
            </div>
          </div>
          
          {/* Subtle highlight ring around hint button */}
          <div className="absolute bottom-6 right-6 w-14 h-14 rounded-full border-2 border-hacksmith-orange/60 animate-pulse pointer-events-none"></div>
        </div>
      )}

      {/* Notification Container */}
      <NotificationContainer />
    </div>
    </NotificationProvider>
  );
}

