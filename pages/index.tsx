import Link from 'next/link';
import { useState } from 'react';

export default function Home() {
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState('');

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
    // XSS Vulnerability - Direct HTML injection without sanitization
    setSearchResults(`<p>Search results for: <strong>${search}</strong></p>
    <p>Found ${products.filter(p => p.name.toLowerCase().includes(search.toLowerCase())).length} products</p>`);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-hacksmith-dark via-hacksmith-gray to-hacksmith-dark py-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold text-hacksmith-orange mb-4 animate-glow">
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
                placeholder="Search tools... (Try: <script>alert('XSS')</script>)"
                className="input-field flex-1"
              />
              <button onClick={handleSearch} className="btn-primary whitespace-nowrap">
                Search
              </button>
            </div>
            
            {/* XSS Vulnerability - Dangerous innerHTML */}
            {searchResults && (
              <div 
                className="mt-4 p-4 bg-hacksmith-gray rounded-lg text-left"
                dangerouslySetInnerHTML={{ __html: searchResults }}
              />
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
                href={`/tools?id=${product.id}`}
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
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Security Notice */}
      <section className="py-8 px-6 bg-hacksmith-gray">
        <div className="max-w-4xl mx-auto text-center">
          <div className="card bg-red-900/20 border-red-500">
            <h3 className="text-lg font-semibold text-red-400 mb-3">⚠️ Security Notice</h3>
            <p className="text-sm text-red-300">
              This application contains intentional vulnerabilities for educational purposes:
            </p>
            <ul className="text-sm text-red-300 mt-2 space-y-1">
              <li>• XSS vulnerability in search functionality</li>
              <li>• IDOR vulnerability in product URLs</li>
              <li>• LFI vulnerability in product details</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
