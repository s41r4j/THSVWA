import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const heroSlides = [
    {
      title: "Hacksmith Forge Collection",
      subtitle: "Premium Black & Orange Tech Gear",
      description: "Discover our exclusive range of engineering-inspired merchandise and tools."
    },
    {
      title: "CTF Challenge Ready",
      subtitle: "Test Your Security Skills",
      description: "Built with intentional vulnerabilities for educational purposes."
    },
    {
      title: "Professional Grade Tools", 
      subtitle: "For the Modern Hacker",
      description: "From SQL injectors to XSS scripts - everything you need."
    }
  ];

  const featuredProducts = [
    { id: 1, name: 'Hacksmith Hoodie', price: 49, image: '🧥', category: 'Apparel' },
    { id: 3, name: 'SQL Injector Pro', price: 299, image: '💉', category: 'Tools' },
    { id: 4, name: 'XSS Scripter Elite', price: 399, image: '⚡', category: 'Tools' },
    { id: 5, name: 'Command Blaster', price: 199, image: '💥', category: 'Tools' },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  return (
    <div className="min-h-screen">
      {/* Hero Section with Carousel */}
      <section className="relative h-96 md:h-[500px] overflow-hidden bg-gradient-to-r from-hacksmith-dark via-hacksmith-gray to-hacksmith-dark">
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 h-full flex items-center justify-center text-center px-6">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-6xl font-bold text-hacksmith-orange mb-4 animate-glow">
              {heroSlides[currentSlide].title}
            </h1>
            <h2 className="text-xl md:text-2xl text-white mb-4 font-light">
              {heroSlides[currentSlide].subtitle}
            </h2>
            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
              {heroSlides[currentSlide].description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/shop" className="btn-primary inline-block">
                Explore Collection
              </Link>
              <Link href="/flag" className="btn-secondary inline-block">
                Submit Flag
              </Link>
            </div>
          </div>
        </div>
        
        {/* Slide Indicators */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentSlide === index ? 'bg-hacksmith-orange' : 'bg-white/30'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-hacksmith-orange mb-4">
              Featured Products
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Discover our most popular items, carefully crafted for the modern hacksmith
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <div key={product.id} className="product-card card card-hover group">
                <div className="h-48 mb-4 rounded-lg bg-gradient-to-br from-hacksmith-gray to-hacksmith-light-gray flex items-center justify-center text-6xl">
                  {product.image}
                </div>
                <div className="text-sm text-hacksmith-orange font-semibold mb-2">
                  {product.category}
                </div>
                <h3 className="font-bold text-lg mb-2 group-hover:text-hacksmith-orange transition-colors">
                  {product.name}
                </h3>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-hacksmith-orange">
                    ${product.price}
                  </span>
                  <Link 
                    href={`/item/${product.id}`} 
                    className="bg-hacksmith-orange text-black px-4 py-2 rounded-lg font-semibold hover:bg-orange-400 transition-colors"
                  >
                    View
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6 bg-hacksmith-gray">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-hacksmith-orange mb-4">
              Why Choose Hacksmith Shop?
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-hacksmith-orange rounded-full flex items-center justify-center mx-auto mb-4 text-black text-2xl font-bold">
                🔒
              </div>
              <h3 className="text-xl font-bold mb-3">Security Focused</h3>
              <p className="text-gray-400">
                Educational vulnerabilities built-in for learning and testing purposes
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-hacksmith-orange rounded-full flex items-center justify-center mx-auto mb-4 text-black text-2xl font-bold">
                ⚡
              </div>
              <h3 className="text-xl font-bold mb-3">High Performance</h3>
              <p className="text-gray-400">
                Professional-grade tools designed for modern cybersecurity professionals
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-hacksmith-orange rounded-full flex items-center justify-center mx-auto mb-4 text-black text-2xl font-bold">
                🎯
              </div>
              <h3 className="text-xl font-bold mb-3">CTF Ready</h3>
              <p className="text-gray-400">
                Perfect for Capture The Flag competitions and security training
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-hacksmith-orange mb-4">
            Stay Updated
          </h2>
          <p className="text-gray-400 mb-8">
            Subscribe to get the latest updates on new tools and security challenges
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="input-field flex-1"
            />
            <button className="btn-primary whitespace-nowrap">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
