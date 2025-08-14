import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useHints } from '../../contexts/HintContext';
import { useNotifications } from '../../contexts/NotificationContext';

// Enhanced celebration component for special discoveries
function CelebrationEffect() {
  const [particles, setParticles] = useState<Array<{
    id: number;
    left: number;
    color: string;
    delay: number;
    size: number;
    shape: 'rectangle' | 'circle' | 'curl';
    rotation: number;
    duration: number;
  }>>([]);

  useEffect(() => {
    // Generate enhanced confetti particles - more colorful paper rolls
    const colors = [
      '#ff7a00', '#ffdd00', '#ff3366', '#33ff66', '#3366ff', '#ff6633',
      '#9933ff', '#ff3399', '#33ffdd', '#ffaa33', '#aa33ff', '#33aaff',
      '#ff9933', '#33ff99', '#9933aa', '#ff6699'
    ];
    
    const newParticles = Array.from({length: 120}, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      color: colors[Math.floor(Math.random() * colors.length)],
      delay: Math.random() * 4,
      size: 8 + Math.random() * 12, // 8-20px
      shape: ['rectangle', 'circle', 'curl'][Math.floor(Math.random() * 3)] as 'rectangle' | 'circle' | 'curl',
      rotation: Math.random() * 360,
      duration: 4 + Math.random() * 3 // 4-7 seconds
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      <style jsx>{`
        @keyframes enhanced-confetti-fall {
          0% {
            transform: translateY(-100vh) rotateZ(0deg) rotateY(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotateZ(1080deg) rotateY(360deg);
            opacity: 0;
          }
        }
        .enhanced-confetti {
          position: absolute;
          top: -20px;
          animation: enhanced-confetti-fall linear infinite;
        }
        .confetti-rectangle {
          border-radius: 2px;
        }
        .confetti-circle {
          border-radius: 50%;
        }
        .confetti-curl {
          border-radius: 50% 20%;
        }
      `}</style>
      {particles.map(particle => (
        <div
          key={particle.id}
          className={`enhanced-confetti confetti-${particle.shape}`}
          style={{
            left: `${particle.left}%`,
            width: `${particle.size}px`,
            height: `${particle.size * (particle.shape === 'rectangle' ? 2.5 : 1)}px`,
            backgroundColor: particle.color,
            animationDelay: `${particle.delay}s`,
            animationDuration: `${particle.duration}s`,
            transform: `rotateZ(${particle.rotation}deg)`
          }}
        />
      ))}
    </div>
  );
}

export default function ProductDetail() {
  const router = useRouter();
  const { id, file } = router.query;
  const [fileContent, setFileContent] = useState('');
  const { hintsVisible } = useHints();
  const { showFlagNotification } = useNotifications();
  const [isReady, setIsReady] = useState(false);
  const [idorTriggered, setIdorTriggered] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);

  useEffect(() => {
    if (router.isReady) {
      setIsReady(true);
      
      // Show IDOR notification for product ID 0 only once
      if (id === '0' && !idorTriggered) {
        setIdorTriggered(true);
        setShowCelebration(true);
        showFlagNotification('FL4G{1D0R_4DM1N_4CC355}', 'IDOR', 'Admin Vault Discovered!');
        
        // Hide celebration after 5 seconds
        setTimeout(() => {
          setShowCelebration(false);
        }, 5000);
      }
    }
  }, [router.isReady, id, showFlagNotification, idorTriggered]);

  const products = {
    '0': {
      name: '🎉 SECRET ADMIN VAULT 🎉',
      price: 0,
      image: '/assets/hammer.png',
      description: '🚨 CONGRATULATIONS! 🚨 You have discovered the hidden admin vault through IDOR exploitation! This demonstrates how attackers can access unauthorized resources by manipulating object references.',
      flag: 'FL4G{1D0R_4DM1N_4CC355}',
      specs: {
        'Access Level': '🔓 ADMIN ONLY',
        'Vulnerability': 'IDOR (Insecure Direct Object Reference)',
        'Reward Flag': 'FL4G{1D0R_4DM1N_4CC355}',
        'Security Risk': '🚨 CRITICAL',
        'Discovery Method': '🔍 URL Parameter Manipulation'
      }
    },
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
      description: 'You found the hidden admin product! This demonstrates Insecure Direct Object Reference vulnerability.',
      specs: {
        'Access Level': 'Admin Only',
        'Vulnerability': 'IDOR',
        'Security Risk': 'High'
      }
    }
  } as Record<string, any>;

  // LFI Vulnerability - Simulated file inclusion
  const files = {
    'info.txt': 'Product information file loaded successfully.',
    'specs.txt': 'Technical specifications document.',
    '../config.txt': 'FL4G{LF1_C0NF1G_4CC355} - Configuration file accessed via Local File Inclusion!',
    '../../secret.txt': 'FL4G{LF1_53CR3T_F1L3} - Secret file accessed through directory traversal!',
    '/etc/passwd': 'root:x:0:0:root:/root:/bin/bash\nFL4G{LF1_5Y5T3M_F1L3}',
  } as Record<string, string>;

  const product = products[id as string];

  // Handle LFI vulnerability
  const handleFileLoad = () => {
    if (file && typeof file === 'string') {
      const content = files[file] || 'File not found or access denied.';
      setFileContent(content);
      
      // Check for LFI flags and show notifications
      if (content.includes('FL4G{LF1_')) {
        const flagMatch = content.match(/FL4G\{[^}]+\}/);
        if (flagMatch) {
          showFlagNotification(flagMatch[0], 'LFI', 'File Inclusion Exploited!');
        }
      }
    }
  };

  if (!isReady) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">◐</div>
          <p className="text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

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

  if (!id) {
    return null;
  }

  // Product detail view
  return (
    <div className="min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-hacksmith-gray py-4">
        <div className="max-w-6xl mx-auto px-6">
          <Link href="/" className="text-hacksmith-orange hover:underline">Home</Link>
          <span className="mx-2 text-gray-400">/</span>
          <span className="text-white">{product.name}</span>
        </div>
      </div>

      {/* Special celebration for product ID 0 - only show once */}
      {id === '0' && showCelebration && <CelebrationEffect />}

      {/* Special reward page for product ID 0 */}
      {id === '0' ? (
        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="text-center space-y-8">
            {/* Celebration Header */}
            <div className="bg-gradient-to-r from-green-900/50 to-hacksmith-orange/50 rounded-2xl p-8 border border-hacksmith-orange">
              <div className="text-6xl mb-4">🎉</div>
              <h1 className="text-4xl font-bold text-hacksmith-orange mb-4 animate-pulse">
                IDOR VULNERABILITY DISCOVERED!
              </h1>
              <p className="text-xl text-green-400 mb-6">
                Congratulations! You have successfully exploited an Insecure Direct Object Reference vulnerability!
              </p>
            </div>

            {/* Flag Display */}
            <div className="bg-hacksmith-dark border-2 border-hacksmith-orange rounded-xl p-6">
              <h2 className="text-2xl font-bold text-hacksmith-orange mb-4">Your Reward Flag</h2>
              <div className="bg-black border border-hacksmith-orange rounded-lg p-4 mb-4">
                <code className="text-2xl font-bold text-hacksmith-orange break-all select-all">
                  {product.flag}
                </code>
              </div>
              <button 
                onClick={() => navigator.clipboard.writeText(product.flag)}
                className="btn-primary text-lg px-8 py-3"
              >
                📋 Copy Flag to Clipboard
              </button>
            </div>

            {/* Educational Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="card bg-blue-900/20 border-blue-500">
                <h3 className="text-xl font-bold text-blue-400 mb-3">What You Discovered</h3>
                <ul className="text-left space-y-2 text-blue-300">
                  <li>• <strong>Vulnerability:</strong> Insecure Direct Object Reference (IDOR)</li>
                  <li>• <strong>Method:</strong> URL parameter manipulation</li>
                  <li>• <strong>Risk:</strong> Unauthorized access to restricted resources</li>
                  <li>• <strong>Impact:</strong> Access to admin-only products</li>
                </ul>
              </div>
              
              <div className="card bg-red-900/20 border-red-500">
                <h3 className="text-xl font-bold text-red-400 mb-3">🛡️ How to Prevent</h3>
                <ul className="text-left space-y-2 text-red-300">
                  <li>• Implement proper access controls</li>
                  <li>• Use session-based authorization</li>
                  <li>• Validate user permissions for each request</li>
                  <li>• Use indirect object references (UUIDs)</li>
                </ul>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/flag" className="btn-primary">
                🚩 Submit This Flag
              </Link>
              <Link href="/" className="btn-secondary">
                🏠 Back to Home
              </Link>
            </div>
          </div>
        </div>
      ) : (
        // Regular product view
        // Regular product view
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
              {hintsVisible && (
                <div className="mt-2 text-xs text-blue-400 opacity-75">
                  Product ID: {id}
                </div>
              )}
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
              <h3 className="text-lg font-semibold text-blue-400 mb-3">Product Files</h3>
              <p className="text-sm text-blue-300 mb-3">
                Load additional product information files:
              </p>
              <div className="flex flex-wrap gap-2 mb-3">
                <button 
                  onClick={() => router.push(`/product/${id}?file=info.txt`)}
                  className="px-3 py-1 bg-blue-600 text-white rounded text-sm"
                >
                  info.txt
                </button>
                <button 
                  onClick={() => router.push(`/product/${id}?file=specs.txt`)}
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
                    router.push(`/product/${id}?file=${target.value}`);
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
                    fileContent.includes('FL4G{') ? 'text-hacksmith-orange' : 'text-green-400'
                  }`}>
                    {files[file as string] || 'File not found or access denied.'}
                  </pre>
                </div>
              )}
              
              {hintsVisible && (
                <p className="text-xs text-blue-400 mt-2">
                  This demonstrates Local File Inclusion (LFI) vulnerability
                </p>
              )}
              
              {hintsVisible && (
                <div className="mt-2 text-xs text-red-400 opacity-75">
                  File paths not validated
                </div>
              )}
            </div>

            <button className="btn-primary w-full">
              Add to Cart - ${product.price}
            </button>
          </div>
        </div>

        {/* IDOR Hints */}
        {hintsVisible && (
          <div className="mt-16 card bg-yellow-900/20 border-yellow-500">
            <h3 className="text-lg font-semibold text-yellow-400 mb-3">Security Testing</h3>
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
      )}
    </div>
  );
}
