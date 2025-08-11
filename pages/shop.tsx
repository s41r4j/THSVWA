import { useMemo, useState } from 'react';
import Link from 'next/link';

export default function Shop() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  
  const items = [
    { 
      id: 1, 
      name: 'Hacksmith Hoodie Premium', 
      price: 89, 
      originalPrice: 129,
      desc: 'Premium quality black hoodie with orange accents and embroidered logo. Perfect for late-night coding sessions.',
      category: 'apparel',
      image: '🧥',
      rating: 4.8,
      inStock: true,
      featured: true
    },
    { 
      id: 2, 
      name: 'Hacksmith Snapback Cap', 
      price: 35, 
      originalPrice: 45,
      desc: 'Adjustable snapback cap in signature black and orange colorway. One size fits all.',
      category: 'apparel',
      image: '🧢',
      rating: 4.6,
      inStock: true,
      featured: false
    },
    { 
      id: 3, 
      name: 'SQL Injector Pro', 
      price: 299, 
      originalPrice: 399,
      desc: 'Professional SQL injection testing tool. Includes advanced payload generation and database exploitation features.',
      category: 'tools',
      image: '💉',
      rating: 4.9,
      inStock: true,
      featured: true
    },
    { 
      id: 4, 
      name: 'XSS Scripter Elite', 
      price: 399, 
      originalPrice: 499,
      desc: 'Advanced cross-site scripting framework with DOM manipulation and payload obfuscation capabilities.',
      category: 'tools',
      image: '⚡',
      rating: 4.7,
      inStock: true,
      featured: true
    },
    { 
      id: 5, 
      name: 'Command Blaster Ultimate', 
      price: 599, 
      originalPrice: 799,
      desc: 'Ultimate command injection exploitation tool with reverse shell capabilities and privilege escalation modules.',
      category: 'tools',
      image: '💥',
      rating: 4.9,
      inStock: false,
      featured: true
    },
    { 
      id: 6, 
      name: 'Hacksmith Sticker Pack', 
      price: 15, 
      originalPrice: 20,
      desc: 'Collection of 20 waterproof vinyl stickers featuring iconic Hacksmith designs.',
      category: 'accessories',
      image: '🏷️',
      rating: 4.5,
      inStock: true,
      featured: false
    },
    { 
      id: 7, 
      name: 'Cyber Security Toolkit', 
      price: 899, 
      originalPrice: 1199,
      desc: 'Complete penetration testing suite including network scanners, vulnerability assessments, and exploitation frameworks.',
      category: 'tools',
      image: '🛠️',
      rating: 4.8,
      inStock: true,
      featured: true
    },
    { 
      id: 8, 
      name: 'Hacksmith Coffee Mug', 
      price: 25, 
      originalPrice: 35,
      desc: 'Ceramic mug with heat-reactive coating that reveals hidden code when hot liquid is added.',
      category: 'accessories',
      image: '☕',
      rating: 4.4,
      inStock: true,
      featured: false
    }
  ];

  const categories = [
    { id: 'all', name: 'All Products', count: items.length },
    { id: 'apparel', name: 'Apparel', count: items.filter(i => i.category === 'apparel').length },
    { id: 'tools', name: 'Security Tools', count: items.filter(i => i.category === 'tools').length },
    { id: 'accessories', name: 'Accessories', count: items.filter(i => i.category === 'accessories').length }
  ];

  // Simulated SQLi vulnerability by naive string contains filtering
  const filtered = useMemo(() => {
    let result = items;
    
    // Category filter
    if (selectedCategory !== 'all') {
      result = result.filter(item => item.category === selectedCategory);
    }
    
    // Search filter (vulnerable to SQLi)
    if (search) {
      result = result.filter((it) => 
        it.name.toLowerCase().includes(search.toLowerCase()) ||
        it.desc.toLowerCase().includes(search.toLowerCase())
      );
    }
    
    // Sort
    result.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        default:
          return a.name.localeCompare(b.name);
      }
    });
    
    return result;
  }, [search, selectedCategory, sortBy]);

  return (
    <div className="min-h-screen">
      {/* Shop Header */}
      <div className="bg-gradient-to-r from-hacksmith-dark via-hacksmith-gray to-hacksmith-dark py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-hacksmith-orange mb-4">
            Hacksmith Shop
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Premium cybersecurity tools and Hacksmith merchandise for professionals and enthusiasts
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Filters and Search */}
        <div className="flex flex-col lg:flex-row gap-6 mb-8">
          {/* Search Bar */}
          <div className="flex-1">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products... (SQLi vulnerable: try ' OR 1=1 -- )"
              className="input-field"
            />
          </div>
          
          {/* Sort Dropdown */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="input-field lg:w-48"
          >
            <option value="name">Sort by Name</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
          </select>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-64 space-y-6">
            {/* Categories */}
            <div className="card">
              <h3 className="text-lg font-semibold text-hacksmith-orange mb-4">Categories</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                      selectedCategory === category.id
                        ? 'bg-hacksmith-orange text-black font-semibold'
                        : 'text-gray-300 hover:bg-hacksmith-light-gray'
                    }`}
                  >
                    <div className="flex justify-between">
                      <span>{category.name}</span>
                      <span className="text-sm opacity-70">({category.count})</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range Info */}
            <div className="card">
              <h3 className="text-lg font-semibold text-hacksmith-orange mb-4">Price Range</h3>
              <div className="text-sm text-gray-400">
                <div className="flex justify-between mb-2">
                  <span>Min:</span>
                  <span>${Math.min(...items.map(i => i.price))}</span>
                </div>
                <div className="flex justify-between">
                  <span>Max:</span>
                  <span>${Math.max(...items.map(i => i.price))}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <p className="text-gray-400">
                Showing {filtered.length} of {items.length} products
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((item) => (
                <div key={item.id} className="product-card card card-hover group relative">
                  {/* Sale Badge */}
                  {item.originalPrice > item.price && (
                    <div className="absolute top-4 left-4 bg-red-500 text-white px-2 py-1 rounded-lg text-sm font-semibold z-10">
                      SALE
                    </div>
                  )}
                  
                  {/* Featured Badge */}
                  {item.featured && (
                    <div className="absolute top-4 right-4 bg-hacksmith-orange text-black px-2 py-1 rounded-lg text-sm font-semibold z-10">
                      ⭐ Featured
                    </div>
                  )}
                  
                  {/* Product Image */}
                  <div className="h-48 mb-4 rounded-lg bg-gradient-to-br from-hacksmith-gray to-hacksmith-light-gray flex items-center justify-center text-6xl relative overflow-hidden">
                    {item.image}
                    {!item.inStock && (
                      <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                        <span className="text-white font-semibold">Out of Stock</span>
                      </div>
                    )}
                  </div>
                  
                  {/* Product Info */}
                  <div className="space-y-3">
                    <div className="text-sm text-hacksmith-orange font-semibold uppercase tracking-wide">
                      {item.category}
                    </div>
                    
                    <h3 className="font-bold text-lg group-hover:text-hacksmith-orange transition-colors line-clamp-2">
                      {item.name}
                    </h3>
                    
                    <p className="text-sm text-gray-400 line-clamp-3">
                      {item.desc}
                    </p>
                    
                    {/* Rating */}
                    <div className="flex items-center gap-2">
                      <div className="flex text-hacksmith-orange">
                        {'★'.repeat(Math.floor(item.rating))}
                        {'☆'.repeat(5 - Math.floor(item.rating))}
                      </div>
                      <span className="text-sm text-gray-400">({item.rating})</span>
                    </div>
                    
                    {/* Price and Action */}
                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-hacksmith-orange">
                          ${item.price}
                        </span>
                        {item.originalPrice > item.price && (
                          <span className="text-sm text-gray-500 line-through">
                            ${item.originalPrice}
                          </span>
                        )}
                      </div>
                      
                      <Link 
                        href={`/item/${item.id}`} 
                        className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                          item.inStock
                            ? 'bg-hacksmith-orange text-black hover:bg-orange-400'
                            : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                        }`}
                      >
                        {item.inStock ? 'View Details' : 'Out of Stock'}
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {filtered.length === 0 && (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold mb-2">No products found</h3>
                <p className="text-gray-400">Try adjusting your search or filters</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
