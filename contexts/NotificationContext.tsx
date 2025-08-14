import React, { createContext, useContext, useState, useEffect } from 'react';
import { useHints } from './HintContext';

interface Notification {
  id: string;
  type: 'success' | 'warning' | 'info' | 'flag';
  title: string;
  message: string;
  flag?: string;
  duration?: number;
  vulnerabilityType?: string;
  points?: number;
}

interface NotificationContextType {
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, 'id'>) => void;
  removeNotification: (id: string) => void;
  showFlagNotification: (flag: string, vulnerabilityType: string, title: string) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = (notification: Omit<Notification, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newNotification = { ...notification, id };
    setNotifications(prev => [...prev, newNotification]);

    // Auto-remove after duration (default 60 seconds for flags, 5 seconds for others)
    const duration = notification.duration || (notification.type === 'flag' ? 60000 : 5000);
    setTimeout(() => {
      removeNotification(id);
    }, duration);
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const showFlagNotification = (flag: string, vulnerabilityType: string, title: string) => {
    // Always show full points in notification - actual scoring happens on flag submission
    const points = 100;
    
    addNotification({
      type: 'flag',
      title,
      message: `Congratulations! You've discovered a ${vulnerabilityType} vulnerability!`,
      flag,
      vulnerabilityType,
      points,
      duration: 60000 // 1 minute
    });
  };

  return (
    <NotificationContext.Provider value={{ notifications, addNotification, removeNotification, showFlagNotification }}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
}
