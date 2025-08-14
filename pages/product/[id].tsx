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
      name: 'CLASSIFIED: Master Forge System',
      price: 99999,
      image: '/assets/topsecret.png',
      description: '⚠️ RESTRICTED ACCESS ⚠️ This is a classified, high-security metalworking system reserved for authorized personnel only. Access to this product indicates a security vulnerability has been exploited.',
      flag: 'FL4G{1D0R_4DM1N_4CC355}',
      specs: {
        'Classification': '🔒 TOP SECRET',
        'Access Level': 'ADMIN ONLY',
        'Security Clearance': 'LEVEL 9',
        'Vulnerability Exploited': 'IDOR (Insecure Direct Object Reference)',
        'Reward Flag': 'FL4G{1D0R_4DM1N_4CC355}',
        'Risk Assessment': '🚨 CRITICAL BREACH'
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
    '5': {
      name: 'Professional Chisel Set',
      price: 95,
      image: '/assets/chisels.png',
      description: 'Complete set of high-quality chisels for detailed metalwork and engraving. Each chisel is forged from premium tool steel with hardened cutting edges.',
      specs: {
        'Set Size': '8 pieces',
        'Material': 'Tool steel',
        'Handle': 'Ergonomic grip',
        'Edge Hardness': 'HRC 60-62'
      }
    },
    '6': {
      name: 'Fire Forge Bucket',
      price: 180,
      image: '/assets/forge_fire_bucket.png',
      description: 'Portable coal forge bucket perfect for heating metals to forging temperature. Features reinforced steel construction and adjustable air flow.',
      specs: {
        'Capacity': '5 gallons',
        'Material': 'Heat-resistant steel',
        'Temperature Range': 'Up to 2100°F',
        'Air Bellows': 'Manual operation'
      }
    },
    '7': {
      name: 'Steel Punches & Drifts',
      price: 75,
      image: '/assets/punches.png',
      description: 'Essential punch and drift set for creating holes and shaping metal. Precision-ground tips ensure clean, accurate work every time.',
      specs: {
        'Set Size': '6 pieces',
        'Material': 'Hardened steel',
        'Sizes': '1/8" to 1/2"',
        'Handle': 'Knurled grip'
      }
    },
    '8': {
      name: 'Heavy-Duty Bench Vise',
      price: 220,
      image: '/assets/vise.png',
      description: 'Robust bench vise for secure workpiece holding during forging operations. Cast iron construction with precision-machined jaws.',
      specs: {
        'Jaw Width': '6 inches',
        'Opening': '8 inches maximum',
        'Weight': '45 lbs',
        'Base': 'Swivel mounting'
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

  // LFI Vulnerability - Simulated file inclusion with realistic system files
  const files = {
    'info.txt': 'Product documentation:\n\nThis file contains basic product information and usage guidelines.\n\nCreated: 2024-01-15\nLast Modified: 2024-03-10\nVersion: 1.2',
    'specs.txt': 'Technical Specifications:\n\nMaterial: High-grade steel\nDimensions: Variable by product\nManufacturer: Hacksmith Industries\nCompliance: ISO 9001',
    '../config.txt': '# Application Configuration File\n# WARNING: This file should not be publicly accessible\n\nFL4G{LF1_C0NF1G_4CC355}\n\ndb_host=localhost\ndb_user=admin\ndb_pass=super_secret_123\napi_key=sk_live_abc123def456\ndebug_mode=true',
    '../../secret.txt': '=== CONFIDENTIAL SYSTEM INFORMATION ===\n\nFL4G{LF1_53CR3T_F1L3}\n\nAdmin passwords:\n- System: admin123\n- Database: db_pass_456\n- API: secret_key_789\n\nThis file contains sensitive system credentials.',
    '/etc/passwd': '# User account information\nroot:x:0:0:root:/root:/bin/bash\nbin:x:1:1:bin:/bin:/sbin/nologin\ndaemon:x:2:2:daemon:/sbin:/sbin/nologin\nadm:x:3:4:adm:/var/adm:/sbin/nologin\nlp:x:4:7:lp:/var/spool/lpd:/sbin/nologin\nwww-data:x:33:33:www-data:/var/www:/usr/sbin/nologin\n\nFL4G{LF1_5Y5T3M_F1L3}',
    '/etc/hosts': '# Host file\n127.0.0.1   localhost\n127.0.1.1   hacksmith-server\n192.168.1.100   admin.hacksmith.local\n192.168.1.101   database.internal\n\nFL4G{LF1_H0ST5_F1L3}',
    '../../../var/log/apache2/access.log': '192.168.1.1 - - [10/Mar/2024:12:34:56] "GET /admin" 200\n192.168.1.50 - - [10/Mar/2024:12:35:01] "POST /login" 401\n127.0.0.1 - - [10/Mar/2024:12:35:15] "GET /secret" 200\n\nFL4G{LF1_L0G_4CC355}',
    '../../../../windows/system32/drivers/etc/hosts': '# Windows hosts file\n127.0.0.1       localhost\n::1             localhost\n192.168.1.100   admin-panel.local\n\nFL4G{LF1_W1ND0W5_F1L3}'
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

      {/* Regular product view for all products including ID 0 */}
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
                placeholder={hintsVisible ? "Try: ../config.txt, /etc/passwd, ../../../var/log/apache2/access.log" : "Enter file path"}
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
                  💡 LFI Hint: File paths not validated - try ../config.txt, /etc/passwd, or log files
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
    </div>
  );
}
