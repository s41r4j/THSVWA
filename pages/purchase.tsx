import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import { useNotifications } from '../contexts/NotificationContext';

export default function Purchase() {
  const router = useRouter();
  const { showFlagNotification } = useNotifications();
  const [product, setProduct] = useState<any>(null);
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(0);
  const [file, setFile] = useState('');
  const [fileContent, setFileContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  // Product catalog (same as on home page)
  const products = {
    '1': { name: 'Professional Hammer', price: 89.99, image: '/assets/hammer.png', description: 'Heavy-duty hammer for precision work' },
    '2': { name: 'Heat-Resistant Gloves', price: 45.99, image: '/assets/gloves.png', description: 'Professional grade heat protection' },
    '3': { name: 'Precision Tongs', price: 67.99, image: '/assets/tongs.png', description: 'Multi-purpose forging tongs' },
    '4': { name: 'Steel Anvil', price: 299.99, image: '/assets/anvil.png', description: 'Professional grade steel anvil' },
    '5': { name: 'Precision Chisels Set', price: 124.99, image: '/assets/chisels.png', description: 'Complete set of forging chisels' },
    '6': { name: 'Fire Bucket', price: 78.99, image: '/assets/forge_fire_bucket.png', description: 'Safety fire bucket for workshop' },
    '7': { name: 'Steel Punches Kit', price: 95.99, image: '/assets/punches.png', description: 'Professional punching tools' },
    '8': { name: 'Heavy-Duty Vise', price: 189.99, image: '/assets/vise.png', description: 'Industrial strength workshop vise' }
  } as Record<string, any>;

  // LFI Vulnerability - Files accessible through URL parameter
  const files = {
    'order_template.txt': 'Order Processing Template:\n\nOrder ID: ORD-2024-001\nStatus: Pending\nCreated: 2024-01-15\nLast Updated: 2024-03-10\n\nStandard processing time: 3-5 business days',
    'shipping_info.txt': 'Shipping Information:\n\nCarriers: FedEx, UPS, DHL\nProcessing Time: 1-2 business days\nShipping Zones: Domestic and International\nTracking: Available 24 hours after dispatch',
    '../admin_orders.txt': '# Admin Order Dashboard\n# CONFIDENTIAL - Internal Use Only\n\nFL4G{LF1_0RD3R_4DM1N}\n\nRecent high-value orders:\n- Order #1001: $2,999.99 (Steel Anvil x10)\n- Order #1002: $1,249.95 (Precision Tools)\n- Order #1003: $899.99 (Custom Hammer Set)\n\nAdmin access: /admin/orders\nPassword: order_admin_2024',
    '../../customer_data.txt': '=== CUSTOMER DATABASE ACCESS ===\n\nFL4G{LF1_CU5T0M3R_D4T4}\n\nRecent customer information:\n- Customer ID: 12345\n  Email: john.doe@email.com\n  Phone: +1-555-0123\n  Address: 123 Main St, City, State\n\n- Customer ID: 12346\n  Email: jane.smith@email.com\n  Phone: +1-555-0124\n  Address: 456 Oak Ave, City, State\n\nDatabase credentials:\nHost: customer-db.internal\nUser: customer_read\nPass: cust_db_2024',
    '/etc/payment.conf': '# Payment Gateway Configuration\n# CRITICAL: Secure file - should not be accessible\n\nFL4G{LF1_P4YM3NT_C0NF}\n\npayment_gateway_key=pk_live_abc123def456ghi789\npayment_secret=sk_live_xyz987uvw654rst321\nwebhook_secret=whsec_payment_hook_secret_123\napi_endpoint=https://api.payments.com/v1\nmerchant_id=MERCH_HACKSMITH_2024\n\nTest mode: false\nDebug logging: enabled',
    '/var/log/orders.log': '# Order Processing Logs\n[2024-03-10 12:34:56] Order #1001 created - Total: $299.99\n[2024-03-10 12:35:01] Payment processed - Order #1001\n[2024-03-10 12:35:15] Order #1001 shipped - Tracking: 1Z999AA1234567890\n[2024-03-10 13:20:30] Suspicious order attempt - IP: 192.168.1.100\n[2024-03-10 13:21:45] Admin access - User: order_admin\n\nFL4G{LF1_0RD3R_L0G5}',
    '../../../config/payment_keys.json': '{\n  "environment": "production",\n  "payment_processor": {\n    "stripe": {\n      "public_key": "pk_live_abc123def456",\n      "secret_key": "sk_live_xyz987uvw654",\n      "webhook_secret": "whsec_secret_123"\n    },\n    "paypal": {\n      "client_id": "AX123456789",\n      "client_secret": "EX987654321"\n    }\n  },\n  "flags": {\n    "lfi_payment": "FL4G{LF1_P4YM3NT_K3Y5}"\n  },\n  "admin": {\n    "dashboard_url": "/admin/payments",\n    "api_key": "admin_payment_2024"\n  }\n}',
    '../../../../windows/system32/config/payment.ini': '; Windows Payment Configuration\n; CONFIDENTIAL SYSTEM FILE\n\n[PaymentGateway]\nProvider=SecurePayments\nMerchantID=WIN_HACKSMITH_2024\nAPIKey=win_api_key_abc123\nSecretKey=win_secret_xyz789\n\n[Security]\nEncryption=AES256\nTokenExpiry=3600\n\n[Flags]\nLFIFlag=FL4G{LF1_W1N_P4YM3NT}\n\n[Logging]\nLevel=DEBUG\nPath=C:\\\\logs\\\\payment.log'
  } as Record<string, string>;

  useEffect(() => {
    const { product: productId, file: fileParam } = router.query;
    
    if (productId && products[productId as string]) {
      const selectedProduct = products[productId as string];
      setProduct(selectedProduct);
      setPrice(selectedProduct.price);
    }

    // LFI Vulnerability - Check for file parameter in URL
    if (fileParam && typeof fileParam === 'string') {
      setFile(fileParam);
      handleFileLoad(fileParam);
    }
  }, [router.query]);

  // Handle LFI vulnerability
  const handleFileLoad = (filename: string) => {
    const content = files[filename] || 'File not found or access denied.';
    setFileContent(content);
    
    // Check for LFI flags and show notifications
    if (content.includes('FL4G{LF1_')) {
      const flagMatch = content.match(/FL4G\{[^}]+\}/);
      if (flagMatch) {
        showFlagNotification(flagMatch[0], 'LFI', 'File Inclusion Exploited!');
      }
    }
  };

  // Price Manipulation Vulnerability - Process order with manipulated price
  const handlePurchase = async () => {
    if (!product) return;

    setIsLoading(true);

    try {
      // Simulate API call with price manipulation vulnerability
      const orderData = {
        productId: router.query.product,
        productName: product.name,
        quantity: quantity,
        unitPrice: product.price,  // Original price
        totalPrice: price * quantity,  // User-manipulated price used for calculation
        customerInfo: {
          name: 'John Doe',
          email: 'john@example.com',
          address: '123 Main St, City, State'
        },
        timestamp: new Date().toISOString()
      };

      // Check if price has been manipulated
      const originalTotal = product.price * quantity;
      const submittedTotal = price * quantity;
      
      if (submittedTotal < originalTotal) {
        // Price manipulation detected - show flag
        const savings = originalTotal - submittedTotal;
        showFlagNotification(
          'FL4G{PR1C3_M4N1PUL4T10N}', 
          'Price Manipulation', 
          `Price manipulated! Saved $${savings.toFixed(2)}`
        );
      }

      // Simulate successful order processing
      setTimeout(() => {
        setIsLoading(false);
        setOrderSuccess(true);
      }, 2000);

    } catch (error) {
      setIsLoading(false);
      console.error('Order processing error:', error);
    }
  };

  const handleFileExplore = () => {
    if (file) {
      router.push(`/purchase?product=${router.query.product}&file=${encodeURIComponent(file)}`);
    }
  };

  if (!product) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-red-600 mb-4">Product Not Found</h1>
            <p className="text-gray-600 mb-6">The requested product could not be found.</p>
            <button
              onClick={() => router.push('/')}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Return to Shop
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  if (orderSuccess) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="max-w-md mx-auto text-center bg-white p-8 rounded-lg shadow-lg">
            <div className="text-green-600 text-6xl mb-4">✓</div>
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Order Successful!</h1>
            <p className="text-gray-600 mb-6">
              Your order for {product.name} has been processed successfully.
              Total: ${(price * quantity).toFixed(2)}
            </p>
            <div className="space-y-3">
              <button
                onClick={() => router.push('/')}
                className="w-full px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Continue Shopping
              </button>
              <button
                onClick={() => setOrderSuccess(false)}
                className="w-full px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Place Another Order
              </button>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6">
              <h1 className="text-2xl font-bold">Complete Your Purchase</h1>
              <p className="text-blue-100 mt-2">Secure checkout for {product.name}</p>
            </div>

            <div className="p-6">
              <div className="grid md:grid-cols-2 gap-8">
                {/* Product Information */}
                <div>
                  <div className="border rounded-lg p-4 mb-6">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-48 object-contain mb-4"
                    />
                    <h2 className="text-xl font-bold text-gray-800 mb-2">{product.name}</h2>
                    <p className="text-gray-600 mb-4">{product.description}</p>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-semibold">Unit Price:</span>
                        <span className="text-lg font-bold text-green-600">${product.price}</span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <label htmlFor="quantity" className="text-lg font-semibold">Quantity:</label>
                        <input
                          id="quantity"
                          type="number"
                          min="1"
                          max="10"
                          value={quantity}
                          onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                          className="w-20 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>

                      {/* Price Manipulation Vulnerability */}
                      <div className="flex items-center justify-between border-t pt-4">
                        <label htmlFor="price" className="text-lg font-semibold">Price per item:</label>
                        <input
                          id="price"
                          type="number"
                          step="0.01"
                          min="0"
                          value={price}
                          onChange={(e) => setPrice(parseFloat(e.target.value) || 0)}
                          className="w-32 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      
                      <div className="flex items-center justify-between border-t pt-4">
                        <span className="text-xl font-bold">Total:</span>
                        <span className="text-xl font-bold text-green-600">
                          ${(price * quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={handlePurchase}
                    disabled={isLoading}
                    className="w-full py-3 px-6 bg-gradient-to-r from-green-600 to-green-700 text-white font-bold rounded-lg hover:from-green-700 hover:to-green-800 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing Order...
                      </span>
                    ) : (
                      'Complete Purchase'
                    )}
                  </button>
                </div>

                {/* File Explorer Section (LFI Vulnerability) */}
                <div>
                  <div className="border rounded-lg p-4">
                    <h3 className="text-lg font-bold text-gray-800 mb-4">📋 Order Documentation</h3>
                    <p className="text-gray-600 mb-4">Access order templates and shipping information:</p>
                    
                    <div className="space-y-3">
                      <div>
                        <label htmlFor="file" className="block text-sm font-semibold text-gray-700 mb-2">
                          Select Document:
                        </label>
                        <input
                          id="file"
                          type="text"
                          value={file}
                          onChange={(e) => setFile(e.target.value)}
                          placeholder="e.g., order_template.txt, ../admin_orders.txt"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      
                      <button
                        onClick={handleFileExplore}
                        className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        📂 Load Document
                      </button>

                      {fileContent && (
                        <div className="mt-4">
                          <h4 className="font-semibold text-gray-800 mb-2">Document Content:</h4>
                          <div className="bg-gray-100 border rounded-lg p-3 max-h-64 overflow-y-auto">
                            <pre className="text-sm text-gray-800 whitespace-pre-wrap font-mono">
                              {fileContent}
                            </pre>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="mt-6 text-xs text-gray-500">
                      <p className="mb-2">📄 Available documents:</p>
                      <ul className="space-y-1 text-gray-400">
                        <li>• order_template.txt</li>
                        <li>• shipping_info.txt</li>
                        <li>• Try exploring with ../ for more files</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
