import { useState, useEffect } from 'react';
import { useNotifications } from '../contexts/NotificationContext';

// Enhanced confetti component for celebrations
function ConfettiEffect() {
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
    // Generate colorful paper-roll confetti particles
    const colors = [
      '#ff7a00', '#ffdd00', '#ff3366', '#33ff66', '#3366ff', '#ff6633',
      '#9933ff', '#ff3399', '#33ffdd', '#ffaa33', '#aa33ff', '#33aaff'
    ];
    
    const newParticles = Array.from({length: 50}, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      color: colors[Math.floor(Math.random() * colors.length)],
      delay: Math.random() * 1.5,
      size: 6 + Math.random() * 6, // 6-12px
      shape: ['rectangle', 'circle', 'curl'][Math.floor(Math.random() * 3)] as 'rectangle' | 'circle' | 'curl',
      rotation: Math.random() * 360,
      duration: 3 + Math.random() * 1.5 // 3-4.5 seconds
    }));
    setParticles(newParticles);

    // Clean up after animation completes
    setTimeout(() => setParticles([]), 5000);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      <style jsx>{`
        @keyframes confetti-fall {
          0% {
            transform: translateY(-100vh) rotateZ(0deg);
            opacity: 1;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotateZ(720deg);
            opacity: 0;
          }
        }
        
        .confetti-rectangle {
          border-radius: 2px;
          animation: confetti-fall linear forwards;
        }
        
        .confetti-circle {
          border-radius: 50%;
          animation: confetti-fall linear forwards;
        }
        
        .confetti-curl {
          border-radius: 50% 10px;
          animation: confetti-fall linear forwards;
        }
      `}</style>
      {particles.map(particle => (
        <div
          key={particle.id}
          className={`confetti-${particle.shape} absolute`}
          style={{
            left: `${particle.left}%`,
            top: '-20px',
            width: `${particle.size}px`,
            height: `${particle.size * (particle.shape === 'rectangle' ? 2 : 1)}px`,
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

interface NotificationItemProps {
  id: string;
  type: 'success' | 'warning' | 'info' | 'flag';
  title: string;
  message: string;
  flag?: string;
  duration?: number;
  vulnerabilityType?: string;
  points?: number;
  onRemove: (id: string) => void;
}

function NotificationItem({ id, type, title, message, flag, duration = 60000, vulnerabilityType, points, onRemove }: NotificationItemProps) {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isVisible, setIsVisible] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    // Animation entrance
    setTimeout(() => setIsVisible(true), 100);
    
    // Show confetti for flag discoveries
    if (type === 'flag') {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 5000);
    }

    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1000) {
          onRemove(id);
          return 0;
        }
        return prev - 1000;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [id, onRemove, type]);

  const progressPercentage = (timeLeft / duration) * 100;
  const secondsLeft = Math.ceil(timeLeft / 1000);

  const getIcon = () => {
    switch (type) {
      case 'flag':
        return (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14.4 6L14 4H5v17h2v-7h5.6l.4 2h7V6h-5.6z"/>
          </svg>
        );
      case 'success':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
        );
      case 'warning':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        );
      case 'info':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      default:
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
    }
  };

  const getColorClasses = () => {
    switch (type) {
      case 'flag':
        return 'bg-hacksmith-gray/95 border-hacksmith-orange/50 text-white';
      case 'success':
        return 'bg-hacksmith-gray/95 border-green-400/50 text-green-100';
      case 'warning':
        return 'bg-hacksmith-gray/95 border-yellow-400/50 text-yellow-100';
      case 'info':
        return 'bg-hacksmith-gray/95 border-blue-400/50 text-blue-100';
      default:
        return 'bg-hacksmith-gray/95 border-gray-400/50 text-gray-100';
    }
  };

  return (
    <>
      {/* Confetti effect for flag discoveries */}
      {showConfetti && <ConfettiEffect />}
      
      <div
        className={`
          fixed top-20 right-6 z-50 max-w-md min-w-80 border rounded-2xl shadow-xl backdrop-blur-sm
          transform transition-all duration-700 ease-out
          ${isVisible ? 'translate-x-0 opacity-100 scale-100' : 'translate-x-full opacity-0 scale-95'}
          ${getColorClasses()}
        `}
      >
      {/* Header with enhanced styling */}
      <div className="p-4 border-b border-white/10 relative overflow-hidden">
        {/* Background accent */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/3 to-transparent"></div>
        
        <div className="flex items-center justify-between relative z-10">
          <div className="flex items-center space-x-3">
            <div className="text-2xl p-2 bg-white/10 rounded-xl backdrop-blur-sm border border-white/20 shadow-sm">
              {getIcon()}
            </div>
            <div>
              <h3 className="font-bold text-lg mb-1">{title}</h3>
              {vulnerabilityType && (
                <div className="flex items-center space-x-2">
                  <span className="text-xs opacity-90 uppercase tracking-widest font-semibold bg-white/10 px-2 py-1 rounded-full border border-white/15">
                    {vulnerabilityType} VULNERABILITY
                  </span>
                </div>
              )}
            </div>
          </div>
          <button
            onClick={() => onRemove(id)}
            className="text-white/60 hover:text-white transition-all duration-200 p-3 hover:bg-white/15 rounded-xl backdrop-blur-sm"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      {/* Enhanced Content */}
      <div className="p-4 relative">
        <p className="text-sm mb-4 leading-relaxed">{message}</p>
        
        {flag && (
          <div className="bg-black/30 rounded-xl p-4 mb-4 border border-white/15 backdrop-blur-sm relative overflow-hidden">
            {/* Subtle background pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/3 to-transparent"></div>
            
            <div className="flex items-center justify-between mb-3 relative z-10">
              <span className="text-sm font-semibold opacity-90 tracking-wide flex items-center">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.4 6L14 4H5v17h2v-7h5.6l.4 2h7V6h-5.6z"/>
                </svg>
                YOUR FLAG:
              </span>
              <button
                onClick={() => navigator.clipboard.writeText(flag)}
                className="text-xs bg-white/20 hover:bg-white/30 px-3 py-1 rounded-lg transition-all duration-200 font-medium border border-white/15 backdrop-blur-sm shadow-sm hover:shadow-md"
              >
                Copy
              </button>
            </div>
            <code className="text-lg font-mono break-all select-all block bg-black/30 p-3 rounded-lg border border-white/10 backdrop-blur-sm relative z-10">
              {flag}
            </code>
          </div>
        )}

      </div>

      {/* Simple Progress bar - reverse loading */}
      <div className="h-2 bg-black/20 rounded-b-2xl overflow-hidden relative">
        <div
          className="h-full bg-gradient-to-r from-white/40 via-white/30 to-white/20 transition-all duration-1000 ease-linear"
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
    </div>
    </>
  );
}

export default function NotificationContainer() {
  const { notifications, removeNotification } = useNotifications();

  return (
    <div className="fixed top-0 right-0 z-50 pointer-events-none">
      <div className="pointer-events-auto space-y-4">
        {notifications.map((notification) => (
          <NotificationItem
            key={notification.id}
            {...notification}
            onRemove={removeNotification}
          />
        ))}
      </div>
    </div>
  );
}
