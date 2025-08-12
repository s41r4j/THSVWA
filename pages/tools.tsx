import { useRouter } from 'next/router';
import { useState } from 'react';
import Link from 'next/link';
import { useHints } from '../contexts/HintContext';

export default function Tools() {
  const router = useRouter();
  const { id, file } = router.query;
  const [fileContent, setFileContent] = useState('');
  const { hintsVisible } = useHints();

  const products = {
    '1': {
      name: 'Professional Hammer',
      price: 89,
      image: '/assets/hammer.png',
      description: 'Heavy-duty forging hammer perfect for metalworking and blacksmithing projects. Crafted from high-carbon steel with ergonomic handle.',
      specs: {
        'Weight': '2.5 lbs',
        'Handle': 'Hickory wood',
        'Head Material': 'High-carbon steel',
        'Length': '16 inches'
      }
    },
    '2': {
      name: 'Steel Anvil',
      price: 299,
      image: '/assets/anvil.png',
      description: 'Solid steel anvil for precise metalworking. Essential tool for any blacksmith. Features hardened work surface and horn for curved work.',
      specs: {
        'Weight': '55 lbs',
        'Material': 'Cast steel',
        'Work Surface': '12" x 4"',
        'Hardness': 'HRC 58-62'
      }
    },
    '3': {
      name: 'Heat-Resistant Gloves',
      price: 45,
      image: '/assets/gloves.png',
      description: 'Premium heat-resistant gloves for safe handling of hot materials and tools. Rated for temperatures up to 932°F (500°C).',
      specs: {
        'Material': 'Kevlar and leather',
        'Temperature Rating': '932°F (500°C)',
        'Sizes': 'S, M, L, XL',
        'Cuff Length': '14 inches'
      }
    },
    '4': {
      name: 'Forging Tongs',
      price: 65,
      image: '/assets/tongs.png',
      description: 'Precision forging tongs for gripping and manipulating hot metal pieces. Spring-loaded design with comfortable grip.',
      specs: {
        'Length': '18 inches',
        'Material': 'Carbon steel',
        'Jaw Width': '2 inches',
        'Weight': '1.8 lbs'
      }
    },
    // IDOR Vulnerability - Hidden/Admin products
    '999': {
      name: 'Admin Secret Tool',
      price: 0,
      image: '/assets/hammer.png',
      description: 'FLAG{IDOR_ADMIN_ACCESS} - You found the hidden admin product! This demonstrates Insecure Direct Object Reference vulnerability.',
      specs: {
        'Access Level': 'Admin Only',
        'Vulnerability': 'IDOR',
        'Flag': 'FLAG{IDOR_ADMIN_ACCESS}',
        'Security Risk': 'High'
      }
    }
  } as Record<string, any>;

  // LFI Vulnerability - Simulated file inclusion
  const files = {
    'info.txt': 'Product information file loaded successfully.',
    'specs.txt': 'Technical specifications document.',
    '../config.txt': 'FLAG{LFI_CONFIG_ACCESS} - Configuration file accessed via Local File Inclusion!',
    '../../secret.txt': 'FLAG{LFI_SECRET_FILE} - Secret file accessed through directory traversal!',
    '/etc/passwd': 'root:x:0:0:root:/root:/bin/bash\nFLAG{LFI_SYSTEM_FILE}',
  } as Record<string, string>;

  const product = products[id as string];

  // Handle LFI vulnerability
  const handleFileLoad = () => {
    if (file && typeof file === 'string') {
      const content = files[file] || 'File not found or access denied.';
      setFileContent(content);
    }
  };

  if (id && !product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">❌</div>
          <h1 className="text-2xl font-bold text-hacksmith-orange mb-2">Product Not Found</h1>
          <p className="text-gray-400 mb-6">
            {hintsVisible ? 
              "Try different product IDs (1-4) or check for hidden products (hint: try larger numbers)" :
              "The requested product could not be found"
            }
          </p>
          <Link href="/" className="btn-primary">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  // If no ID specified, show tools overview
  if (!id) {
    return (
      <div className="min-h-screen">
        <div className="bg-gradient-to-r from-hacksmith-dark via-hacksmith-gray to-hacksmith-dark py-16">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h1 className="text-4xl font-bold text-hacksmith-orange mb-4">
              Professional Tools
            </h1>
            <p className="text-xl text-gray-300">
              Explore our collection of premium blacksmithing and metalworking tools
            </p>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Object.entries(products)
              .filter(([key]) => ['1', '2', '3', '4'].includes(key))
              .map(([key, prod]) => (
                <Link 
                  key={key} 
                  href={`/tools?id=${key}`}
                  className={`product-card card card-hover ${hintsVisible ? 'border-blue-500/30' : ''}`}
                >
                  <img 
                    src={prod.image} 
                    alt={prod.name}
                    className="w-full h-48 object-contain bg-white rounded-lg mb-4"
                  />
                  <h3 className="font-bold text-lg mb-2">{prod.name}</h3>
                  <p className="text-sm text-gray-400 mb-4">{prod.description.substring(0, 100)}...</p>
                  <span className="text-2xl font-bold text-hacksmith-orange">${prod.price}</span>
                  {hintsVisible && (
                    <div className="mt-2 text-xs text-blue-400 opacity-75">
                      ⚠ ID: {key}
                    </div>
                  )}
                </Link>
              ))}
          </div>

          {/* IDOR Hints */}
          {hintsVisible && (
            <div className="mt-16 card bg-yellow-900/20 border-yellow-500">
              <h3 className="text-lg font-semibold text-yellow-400 mb-3">🔍 Security Testing</h3>
              <p className="text-sm text-yellow-300 mb-2">
                This page contains IDOR vulnerabilities. Try:
              </p>
              <ul className="text-sm text-yellow-300 list-disc pl-4">
                <li>Changing the ID parameter in the URL</li>
                <li>Trying different number ranges (1-4 are normal, try others)</li>
                <li>Looking for admin or hidden products</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Product detail view
  return (
    <div className="min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-hacksmith-gray py-4">
        <div className="max-w-6xl mx-auto px-6">
          <Link href="/" className="text-hacksmith-orange hover:underline">Home</Link>
          <span className="mx-2 text-gray-400">/</span>
          <Link href="/tools" className="text-hacksmith-orange hover:underline">Tools</Link>
          <span className="mx-2 text-gray-400">/</span>
          <span className="text-white">{product.name}</span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div>
            <div className="bg-white rounded-xl p-8 flex items-center justify-center h-96">
              <img 
                src={product.image} 
                alt={product.name}
                className="max-h-full max-w-full object-contain"
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">{product.name}</h1>
              <div className="text-3xl font-bold text-hacksmith-orange mb-4">
                ${product.price}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-hacksmith-orange mb-2">Description</h3>
              <p className="text-gray-300 leading-relaxed">{product.description}</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-hacksmith-orange mb-3">Specifications</h3>
              <div className="space-y-2">
                {Object.entries(product.specs).map(([key, value]) => (
                  <div key={key} className="flex justify-between border-b border-gray-700 pb-1">
                    <span className="text-gray-400">{key}:</span>
                    <span className="text-white">{value as string}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* LFI Section */}
            <div className={`card bg-blue-900/20 border-blue-500 ${hintsVisible ? 'border-blue-400' : 'border-blue-800'}`}>
              <h3 className="text-lg font-semibold text-blue-400 mb-3">📁 Product Files</h3>
              <p className="text-sm text-blue-300 mb-3">
                Load additional product information files:
              </p>
              <div className="flex flex-wrap gap-2 mb-3">
                <button 
                  onClick={() => router.push(`/tools?id=${id}&file=info.txt`)}
                  className="px-3 py-1 bg-blue-600 text-white rounded text-sm"
                >
                  info.txt
                </button>
                <button 
                  onClick={() => router.push(`/tools?id=${id}&file=specs.txt`)}
                  className="px-3 py-1 bg-blue-600 text-white rounded text-sm"
                >
                  specs.txt
                </button>
              </div>
              <input
                type="text"
                placeholder={hintsVisible ? "Or enter file path (try: ../config.txt, ../../secret.txt)" : "Enter file path"}
                className={`input-field text-sm mb-2 ${hintsVisible ? 'border-blue-500/50' : ''}`}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    const target = e.target as HTMLInputElement;
                    router.push(`/tools?id=${id}&file=${target.value}`);
                  }
                }}
              />
              <button 
                onClick={handleFileLoad}
                className="btn-primary text-sm w-full"
              >
                Load File
              </button>
              
              {file && (
                <div className={`mt-3 p-3 bg-hacksmith-dark rounded border ${hintsVisible ? 'border-red-500/30' : ''}`}>
                  <p className="text-xs text-gray-400 mb-2">File: {file}</p>
                  <pre className={`text-sm whitespace-pre-wrap ${
                    fileContent.includes('FLAG{') ? 'text-hacksmith-orange' : 'text-green-400'
                  }`}>
                    {files[file as string] || 'File not found or access denied.'}
                  </pre>
                </div>
              )}
              
              {hintsVisible && (
                <p className="text-xs text-blue-400 mt-2">
                  ⚠ This demonstrates Local File Inclusion (LFI) vulnerability
                </p>
              )}
              
              {hintsVisible && (
                <div className="mt-2 text-xs text-red-400 opacity-75">
                  ⚠ File paths not validated
                </div>
              )}
            </div>

            <button className="btn-primary w-full">
              Add to Cart - ${product.price}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
