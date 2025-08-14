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
        return 'bg-gradient-to-r from-hacksmith-orange/90 to-yellow-500/90 border-hacksmith-orange text-white';
      case 'success':
        return 'bg-green-900/90 border-green-500 text-green-100';
      case 'warning':
        return 'bg-yellow-900/90 border-yellow-500 text-yellow-100';
      case 'info':
        return 'bg-blue-900/90 border-blue-500 text-blue-100';
      default:
        return 'bg-gray-900/90 border-gray-500 text-gray-100';
    }
  };

  return (
    <>
      {/* Confetti effect for flag discoveries */}
      {showConfetti && <ConfettiEffect />}
      
      <div
        className={`
          fixed top-20 right-6 z-50 max-w-lg min-w-96 border-2 rounded-3xl shadow-2xl backdrop-blur-lg
          transform transition-all duration-700 ease-out
          ${isVisible ? 'translate-x-0 opacity-100 scale-100' : 'translate-x-full opacity-0 scale-95'}
          ${getColorClasses()}
        `}
      >
      {/* Header with enhanced styling */}
      <div className="p-6 border-b border-white/20 relative overflow-hidden">
        {/* Background accent */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent"></div>
        
        <div className="flex items-center justify-between relative z-10">
          <div className="flex items-center space-x-4">
            <div className="text-4xl p-3 bg-white/20 rounded-2xl backdrop-blur-sm border border-white/30 shadow-lg">
              {getIcon()}
            </div>
            <div>
              <h3 className="font-bold text-2xl mb-1">{title}</h3>
              {vulnerabilityType && (
                <div className="flex items-center space-x-2">
                  <span className="text-sm opacity-90 uppercase tracking-widest font-semibold bg-white/15 px-3 py-1 rounded-full border border-white/20">
                    {vulnerabilityType} VULNERABILITY
                  </span>
                </div>
              )}
              {points !== undefined && (
                <div className="flex items-center space-x-2 mt-2">
                  <span className="text-lg bg-gradient-to-r from-white/30 to-white/20 px-4 py-2 rounded-full font-bold border border-white/30 shadow-lg backdrop-blur-sm">
                    +{points} points
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
      <div className="p-6 relative">
        <p className="text-lg mb-5 leading-relaxed font-medium">{message}</p>
        
        {flag && (
          <div className="bg-black/50 rounded-2xl p-5 mb-5 border border-white/20 backdrop-blur-sm relative overflow-hidden">
            {/* Subtle background pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"></div>
            
            <div className="flex items-center justify-between mb-4 relative z-10">
              <span className="text-lg font-bold opacity-95 tracking-wide flex items-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.4 6L14 4H5v17h2v-7h5.6l.4 2h7V6h-5.6z"/>
                </svg>
                YOUR FLAG:
              </span>
              <button
                onClick={() => navigator.clipboard.writeText(flag)}
                className="text-base bg-white/30 hover:bg-white/40 px-4 py-2 rounded-xl transition-all duration-200 font-semibold border border-white/20 backdrop-blur-sm shadow-lg hover:shadow-xl"
              >
                Copy
              </button>
            </div>
            <code className="text-2xl font-bold break-all select-all block bg-black/40 p-4 rounded-xl border border-white/15 backdrop-blur-sm relative z-10">
              {flag}
            </code>
          </div>
        )}

        {/* Enhanced Timer */}
        <div className="flex items-center justify-between text-base opacity-90 bg-white/10 px-4 py-3 rounded-xl backdrop-blur-sm border border-white/20">
          <span className="font-medium">Auto-dismiss in {secondsLeft}s</span>
          <span className="font-bold">{Math.round(progressPercentage)}%</span>
        </div>
      </div>

      {/* Enhanced Progress bar */}
      <div className="h-3 bg-black/40 rounded-b-3xl overflow-hidden relative">
        <div
          className="h-full bg-gradient-to-r from-white/70 via-white/60 to-white/50 transition-all duration-1000 ease-linear relative"
          style={{ width: `${progressPercentage}%` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
        </div>
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
