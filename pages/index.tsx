import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { useHints } from '../contexts/HintContext';
import { useNotifications } from '../contexts/NotificationContext';

export default function Home() {
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState('');
  const [xssTriggered, setXssTriggered] = useState(false);
  const { hintsVisible } = useHints();
  const { showFlagNotification } = useNotifications();
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
    },
    {
      id: 5,
      name: 'Professional Chisel Set',
      price: 95,
      image: '/assets/chisels.png',
      description: 'Complete set of high-quality chisels for detailed metalwork and engraving.'
    },
    {
      id: 6,
      name: 'Fire Forge Bucket',
      price: 180,
      image: '/assets/forge_fire_bucket.png',
      description: 'Portable coal forge bucket perfect for heating metals to forging temperature.'
    },
    {
      id: 7,
      name: 'Steel Punches & Drifts',
      price: 75,
      image: '/assets/punches.png',
      description: 'Essential punch and drift set for creating holes and shaping metal.'
    },
    {
      id: 8,
      name: 'Heavy-Duty Bench Vise',
      price: 220,
      image: '/assets/vise.png',
      description: 'Robust bench vise for secure workpiece holding during forging operations.'
    }
  ];

  const handleSearch = () => {
    // Reset XSS flag if search is cleared
    if (search.trim() === '') {
      setXssTriggered(false);
      setSearchResults('');
      return;
    }

    // More realistic XSS: vulnerable search term highlighting
    // Filter based on a "cleaned" version of the search term
    const cleanSearch = search.replace(/<[^>]*>?/gm, '');
    const matchingProducts = cleanSearch ? products.filter(p =>
      p.name.toLowerCase().includes(cleanSearch.toLowerCase())
    ) : [];

    // The vulnerability is now in the highlighting, which uses the raw search term
    if (matchingProducts.length > 0) {
      const productList = matchingProducts.map(p => {
        // Vulnerable highlighting: inject the raw search term on match
        const highlightedName = p.name.replace(
          new RegExp(cleanSearch, 'ig'),
          `<span class="bg-yellow-400 text-black">${search}</span>`
        );
        return `<div style="margin: 8px 0; padding: 8px; background: rgba(255,122,0,0.1); border-radius: 4px;">
                  <strong>${highlightedName}</strong> - $${p.price}
                </div>`;
      }).join('');

      setSearchResults(`<div>
        <p>Search results for: <strong>${search}</strong></p>
        <p>Found ${matchingProducts.length} products matching your query</p>
        ${productList}
      </div>`);
    } else {
      // If no products match, still reflect the search term, but it's less of a "real" feature
      setSearchResults(`<div>
        <p>Search results for: <strong>${search}</strong></p>
        <p>Found 0 products matching your query</p>
      </div>`);
    }
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

      // Check for XSS attempts and show flag notification (only once)
      if (!xssTriggered && (search.includes('<script>') || search.includes('<img') || search.includes('onerror') || search.includes('onload'))) {
        setXssTriggered(true);
        showFlagNotification('FL4G{X55_F0UND}', 'XSS', 'XSS Vulnerability Exploited!');
      }
    }
  }, [searchResults, search, showFlagNotification, xssTriggered]);

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
                Input not sanitized - Try: &lt;script&gt;alert(&apos;REAL_XSS&apos;)&lt;/script&gt; or &lt;img src=x onerror=alert(&apos;XSS&apos;)&gt;
              </div>
            )}
          </div>
        </div>
      </section>

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
                    Product ID: {product.id}
                  </div>
                )}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
