import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { useHints } from '../contexts/HintContext';

export default function Home() {
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState('');
  const { hintsVisible } = useHints();
  const searchResultsRef = useRef<HTMLDivElement>(null);

  const products = [
    {
      id: 1,
      name: 'Professional Hammer',
      price: 89,
      image: '/assets/hammer.png',
      description: 'Heavy-duty forging hammer perfect for metalworking and blacksmithing projects.'
    },
    {
      id: 2,
      name: 'Steel Anvil',
      price: 299,
      image: '/assets/anvil.png',
      description: 'Solid steel anvil for precise metalworking. Essential tool for any blacksmith.'
    },
    {
      id: 3,
      name: 'Heat-Resistant Gloves',
      price: 45,
      image: '/assets/gloves.png',
      description: 'Premium heat-resistant gloves for safe handling of hot materials and tools.'
    },
    {
      id: 4,
      name: 'Forging Tongs',
      price: 65,
      image: '/assets/tongs.png',
      description: 'Precision forging tongs for gripping and manipulating hot metal pieces.'
    }
  ];

  const handleSearch = () => {
    // XSS Vulnerability - Direct HTML injection without ANY sanitization
    const matchingProducts = products.filter(p => p.name.toLowerCase().includes(search.toLowerCase())).length;
    
    // Real XSS vulnerability - directly inserting user input into HTML
    // This will actually execute JavaScript when using event handlers
    setSearchResults(`<div>
      <p>Search results for: <strong>${search}</strong></p>
      <p>Found ${matchingProducts} products matching your query</p>
      <div style="margin-top: 10px; padding: 8px; background: rgba(255,122,0,0.1); border-left: 3px solid #ff7a00;">
        Raw Query: ${search}
      </div>
    </div>`);
  };

  // Additional XSS vector - this useEffect will execute any script tags in the search results
  useEffect(() => {
    if (searchResults && searchResultsRef.current) {
      // This is EXTREMELY dangerous - executes any script tags in the content
      const scripts = searchResultsRef.current.querySelectorAll('script');
      scripts.forEach(script => {
        const newScript = document.createElement('script');
        newScript.textContent = script.textContent;
        document.body.appendChild(newScript);
        document.body.removeChild(newScript);
      });
    }
  }, [searchResults]);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-hacksmith-dark via-hacksmith-gray to-hacksmith-dark py-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold text-hacksmith-orange mb-4">
            Hacksmith Tools
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Professional blacksmithing and metalworking tools for craftsmen
          </p>
          
          {/* Search Bar with XSS Vulnerability */}
          <div className="max-w-md mx-auto mb-8">
            <div className="flex gap-2">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={hintsVisible ? "Search tools... (Try: <script>alert('XSS')</script>)" : "Search tools..."}
                className={`input-field flex-1 ${hintsVisible ? 'border-red-500/30 focus:border-red-500' : ''}`}
              />
              <button onClick={handleSearch} className="btn-primary whitespace-nowrap">
                Search
              </button>
            </div>
            
            {/* XSS Vulnerability - Dangerous innerHTML */}
            {searchResults && (
              <div 
                ref={searchResultsRef}
                className={`mt-4 p-4 bg-hacksmith-gray rounded-lg text-left ${hintsVisible ? 'border border-red-500/30' : ''}`}
                dangerouslySetInnerHTML={{ __html: searchResults }}
                style={{ wordBreak: 'break-word' }}
              />
            )}
            
            {/* Subtle hint when hint mode is on */}
            {hintsVisible && (
              <div className="mt-2 text-xs text-red-400 opacity-75">
                ⚠ Input not sanitized - Try: &lt;script&gt;alert('REAL_XSS')&lt;/script&gt; or &lt;img src=x onerror=alert('XSS')&gt;
              </div>
            )}
          </div>
        </div>
      </section>

      {/* XSS Testing Section - Only visible in hint mode */}
      {hintsVisible && (
        <section className="py-8 px-6">
          <div className="max-w-4xl mx-auto">
            <div className="card bg-red-900/20 border-red-500">
              <h3 className="text-lg font-semibold text-red-400 mb-3">⚠ XSS Testing</h3>
              <p className="text-sm text-red-300 mb-2">
                The search functionality is vulnerable to XSS. Try these REAL working payloads:
              </p>
              <ul className="text-sm text-red-300 list-disc pl-4 space-y-1">
                <li><code>&lt;script&gt;alert('REAL_XSS_EXECUTION')&lt;/script&gt;</code></li>
                <li><code>&lt;img src=x onerror=alert('XSS_SUCCESS')&gt;</code></li>
                <li><code>&lt;svg onload=alert('FLAG&#123;XSS_FOUND&#125;')&gt;</code></li>
                <li><code>&lt;iframe src=javascript:alert('XSS')&gt;&lt;/iframe&gt;</code></li>
                <li><code>&lt;details open ontoggle=alert('XSS')&gt;&lt;/details&gt;</code></li>
                <li><code>&lt;marquee onstart=alert('XSS')&gt;test&lt;/marquee&gt;</code></li>
              </ul>
              <p className="text-xs text-red-400 mt-2">
                This implements REAL XSS - both event handlers AND script tag execution via useEffect!
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Products Grid */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-hacksmith-orange mb-8 text-center">
            Our Tools
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <Link
                key={product.id} 
                href={`/product/${product.id}`}
                className="product-card card card-hover group"
              >
                <div className="h-48 mb-4 rounded-lg bg-white flex items-center justify-center overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
                <h3 className="font-bold text-lg mb-2 group-hover:text-hacksmith-orange transition-colors">
                  {product.name}
                </h3>
                <p className="text-sm text-gray-400 mb-4 line-clamp-3">
                  {product.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-hacksmith-orange">
                    ${product.price}
                  </span>
                  <span className="text-sm text-hacksmith-orange hover:underline">
                    View Details →
                  </span>
                </div>
                {hintsVisible && (
                  <div className="mt-2 text-xs text-blue-400 opacity-75">
                    ⚠ Product ID: {product.id}
                  </div>
                )}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Security Notice */}
      {hintsVisible && (
        <section className="py-8 px-6 bg-hacksmith-gray">
          <div className="max-w-4xl mx-auto text-center">
            <div className="card bg-red-900/20 border-red-500">
              <h3 className="text-lg font-semibold text-red-400 mb-3">⚠ Security Notice</h3>
              <p className="text-sm text-red-300">
                This application contains intentional vulnerabilities for educational purposes:
              </p>
              <ul className="text-sm text-red-300 mt-2 space-y-1">
                <li>• XSS vulnerability in search functionality</li>
                <li>• SQL injection in login system</li>
                <li>• IDOR vulnerability in product URLs</li>
                <li>• LFI vulnerability in product details</li>
                <li>• File upload vulnerabilities</li>
              </ul>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
