import { useRouter } from 'next/router';
import { useState } from 'react';
import Link from 'next/link';

export default function Item() {
  const router = useRouter();
  const { id } = router.query;
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  
  const items = {
    '1': { 
      name: 'Hacksmith Hoodie Premium', 
      description: 'Premium quality black hoodie with orange accents and embroidered logo. Perfect for late-night coding sessions. Made from 100% organic cotton with reinforced stitching.',
      price: 89,
      originalPrice: 129,
      category: 'Apparel',
      rating: 4.8,
      reviews: 127,
      inStock: true,
      stockCount: 15,
      images: ['🧥', '👕', '🏷️'],
      features: [
        'Premium organic cotton blend',
        'Embroidered Hacksmith logo',
        'Reinforced kangaroo pocket',
        'Adjustable drawstring hood',
        'Machine washable'
      ],
      specs: {
        'Material': '80% Cotton, 20% Polyester',
        'Sizes': 'S, M, L, XL, XXL',
        'Care': 'Machine wash cold, tumble dry low',
        'Origin': 'Made in Canada'
      }
    },
    '2': { 
      name: 'Hacksmith Snapback Cap', 
      description: 'Adjustable snapback cap in signature black and orange colorway. One size fits all with premium embroidered logo.',
      price: 35,
      originalPrice: 45,
      category: 'Apparel',
      rating: 4.6,
      reviews: 89,
      inStock: true,
      stockCount: 32,
      images: ['🧢', '🏷️', '📐'],
      features: [
        'Adjustable snapback closure',
        'Embroidered front logo',
        'Structured 6-panel design',
        'Flat bill visor',
        'One size fits most'
      ],
      specs: {
        'Material': '100% Cotton Twill',
        'Size': 'One Size (adjustable)',
        'Care': 'Spot clean only',
        'Origin': 'Made in USA'
      }
    },
    '3': { 
      name: 'SQL Injector Pro', 
      description: 'Professional SQL injection testing tool with advanced payload generation, database fingerprinting, and automated exploitation capabilities. Includes comprehensive vulnerability scanner.',
      price: 299,
      originalPrice: 399,
      category: 'Security Tools',
      rating: 4.9,
      reviews: 234,
      inStock: true,
      stockCount: 8,
      images: ['💉', '🔧', '💻'],
      features: [
        'Advanced payload generation',
        'Database fingerprinting',
        'Automated exploitation',
        'Blind SQLi detection',
        'Time-based attack vectors',
        'Union-based exploitation',
        'Error-based injection',
        'Boolean-based blind techniques'
      ],
      specs: {
        'Compatibility': 'MySQL, PostgreSQL, MSSQL, Oracle',
        'Platform': 'Cross-platform (Windows, Linux, macOS)',
        'License': 'Professional (1-year updates)',
        'Support': '24/7 technical support included'
      }
    },
    '4': { 
      name: 'XSS Scripter Elite', 
      description: 'Advanced cross-site scripting framework with DOM manipulation, payload obfuscation, and session hijacking capabilities. Perfect for penetration testing.',
      price: 399,
      originalPrice: 499,
      category: 'Security Tools',
      rating: 4.7,
      reviews: 156,
      inStock: true,
      stockCount: 5,
      images: ['⚡', '🔧', '💻'],
      features: [
        'DOM manipulation engine',
        'Payload obfuscation',
        'Session hijacking tools',
        'Cookie extraction',
        'Keylogger injection',
        'Screen capture capabilities',
        'Real-time exploitation',
        'WAF bypass techniques'
      ],
      specs: {
        'Browser Support': 'Chrome, Firefox, Safari, Edge',
        'Payload Types': '50+ pre-built payloads',
        'License': 'Professional (lifetime)',
        'Updates': 'Quarterly security updates'
      }
    },
    '5': { 
      name: 'Command Blaster Ultimate', 
      description: 'Ultimate command injection exploitation tool with reverse shell capabilities, privilege escalation modules, and persistence mechanisms.',
      price: 599,
      originalPrice: 799,
      category: 'Security Tools',
      rating: 4.9,
      reviews: 78,
      inStock: false,
      stockCount: 0,
      images: ['💥', '🔧', '⚙️'],
      features: [
        'Reverse shell generation',
        'Privilege escalation modules',
        'Persistence mechanisms',
        'Anti-detection techniques',
        'Multi-platform support',
        'Custom payload creation',
        'Automated exploitation',
        'Post-exploitation tools'
      ],
      specs: {
        'OS Support': 'Windows, Linux, macOS',
        'Shell Types': 'Bash, PowerShell, CMD, Python',
        'License': 'Enterprise (unlimited)',
        'Training': 'Includes 8-hour training course'
      }
    },
    'flag': { 
      name: 'Secret Flag', 
      description: 'FLAG{IDOR_EXPOSED} - Congratulations! You found the hidden product through Insecure Direct Object Reference.',
      price: 0,
      originalPrice: 0,
      category: 'CTF Flag',
      rating: 5.0,
      reviews: 1337,
      inStock: true,
      stockCount: 1,
      images: ['🏳️', '🎯', '🏆'],
      features: [
        'IDOR vulnerability discovered',
        'Direct object reference manipulation',
        'URL parameter tampering',
        'Authentication bypass',
        'Access control weakness'
      ],
      specs: {
        'Vulnerability': 'Insecure Direct Object Reference',
        'Severity': 'High',
        'CVSS Score': '8.5',
        'Fix': 'Implement proper access controls'
      }
    },
  } as Record<string, any>;

  const item = items[(id as string) ?? ''];

  if (!item) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">❌</div>
          <h1 className="text-2xl font-bold text-hacksmith-orange mb-2">Product Not Found</h1>
          <p className="text-gray-400 mb-6">The product you're looking for doesn't exist.</p>
          <Link href="/shop" className="btn-primary">
            Back to Shop
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    alert(`Added ${quantity} x ${item.name} to cart! (This is a demo - no actual cart functionality)`);
  };

  return (
    <div className="min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-hacksmith-gray py-4">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center text-sm text-gray-400">
            <Link href="/" className="hover:text-hacksmith-orange">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/shop" className="hover:text-hacksmith-orange">Shop</Link>
            <span className="mx-2">/</span>
            <span className="text-white">{item.name}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square bg-gradient-to-br from-hacksmith-gray to-hacksmith-light-gray rounded-xl flex items-center justify-center text-8xl relative overflow-hidden">
              {item.images[selectedImage]}
              {!item.inStock && (
                <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                  <span className="text-white text-xl font-semibold">Out of Stock</span>
                </div>
              )}
            </div>
            
            {/* Image Thumbnails */}
            <div className="flex gap-2">
              {item.images.map((img: string, index: number) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-20 h-20 rounded-lg bg-gradient-to-br from-hacksmith-gray to-hacksmith-light-gray flex items-center justify-center text-2xl border-2 transition-colors ${
                    selectedImage === index ? 'border-hacksmith-orange' : 'border-transparent'
                  }`}
                >
                  {img}
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Category and Rating */}
            <div className="flex items-center justify-between">
              <span className="text-hacksmith-orange font-semibold uppercase tracking-wide">
                {item.category}
              </span>
              <div className="flex items-center gap-2">
                <div className="flex text-hacksmith-orange">
                  {'★'.repeat(Math.floor(item.rating))}
                  {'☆'.repeat(5 - Math.floor(item.rating))}
                </div>
                <span className="text-sm text-gray-400">({item.reviews} reviews)</span>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              {item.name}
            </h1>

            {/* Price */}
            <div className="flex items-center gap-4">
              <span className="text-3xl font-bold text-hacksmith-orange">
                ${item.price}
              </span>
              {item.originalPrice > item.price && (
                <span className="text-xl text-gray-500 line-through">
                  ${item.originalPrice}
                </span>
              )}
              {item.originalPrice > item.price && (
                <span className="bg-red-500 text-white px-2 py-1 rounded text-sm font-semibold">
                  {Math.round((1 - item.price / item.originalPrice) * 100)}% OFF
                </span>
              )}
            </div>

            {/* Stock Status */}
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${item.inStock ? 'bg-green-500' : 'bg-red-500'}`}></div>
              <span className={item.inStock ? 'text-green-400' : 'text-red-400'}>
                {item.inStock ? `In Stock (${item.stockCount} available)` : 'Out of Stock'}
              </span>
            </div>

            {/* Description */}
            <p className="text-gray-300 text-lg leading-relaxed">
              {item.description}
            </p>

            {/* Features */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-hacksmith-orange">Key Features</h3>
              <ul className="space-y-2">
                {item.features.map((feature: string, index: number) => (
                  <li key={index} className="flex items-center gap-2 text-gray-300">
                    <span className="text-hacksmith-orange">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Quantity and Add to Cart */}
            {item.inStock && (
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <label className="text-sm font-semibold">Quantity:</label>
                  <div className="flex items-center border border-gray-600 rounded-lg">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 py-2 hover:bg-hacksmith-light-gray"
                    >
                      -
                    </button>
                    <span className="px-4 py-2 border-x border-gray-600">{quantity}</span>
                    <button
                      onClick={() => setQuantity(Math.min(item.stockCount, quantity + 1))}
                      className="px-3 py-2 hover:bg-hacksmith-light-gray"
                    >
                      +
                    </button>
                  </div>
                </div>
                
                <button
                  onClick={handleAddToCart}
                  className="btn-primary w-full"
                >
                  Add to Cart - ${(item.price * quantity).toFixed(2)}
                </button>
              </div>
            )}

            {/* Specifications */}
            <div className="card">
              <h3 className="text-lg font-semibold text-hacksmith-orange mb-4">Specifications</h3>
              <div className="space-y-2">
                {Object.entries(item.specs).map(([key, value]) => (
                  <div key={key} className="flex justify-between">
                    <span className="text-gray-400">{key}:</span>
                    <span className="text-white">{value as string}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-hacksmith-orange mb-6">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Object.entries(items)
              .filter(([key]) => key !== id && key !== 'flag')
              .slice(0, 4)
              .map(([key, relatedItem]) => (
                <Link key={key} href={`/item/${key}`} className="product-card card card-hover">
                  <div className="h-32 mb-3 rounded-lg bg-gradient-to-br from-hacksmith-gray to-hacksmith-light-gray flex items-center justify-center text-4xl">
                    {relatedItem.images[0]}
                  </div>
                  <h3 className="font-semibold text-sm mb-2">{relatedItem.name}</h3>
                  <span className="text-hacksmith-orange font-bold">${relatedItem.price}</span>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
