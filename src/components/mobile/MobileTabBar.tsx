"use client";

import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Home, Search, Wallet, Bell, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useNativeFeatures } from '@/hooks/use-native-features';

interface TabItem {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  path: string;
}

const tabs: TabItem[] = [
  { icon: Home, label: 'Home', path: '/marketplace' },
  { icon: Search, label: 'Search', path: '/search' },
  { icon: Wallet, label: 'Wallet', path: '/wallet' },
  { icon: Bell, label: 'Alerts', path: '/notifications' },
  { icon: User, label: 'Profile', path: '/settings' },
];

export function MobileTabBar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { hapticSelection } = useNativeFeatures();

  const handleTabPress = async (path: string) => {
    await hapticSelection();
    navigate(path);
  };

  const isActive = (path: string) => {
    if (path === '/marketplace') {
      return location.pathname === '/' || location.pathname === '/marketplace';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <nav 
      className="fixed bottom-0 left-0 right-0 z-50 pb-safe"
      style={{
        background: 'rgba(11, 11, 13, 0.85)',
        backdropFilter: 'blur(40px) saturate(1.8)',
        WebkitBackdropFilter: 'blur(40px) saturate(1.8)',
        borderTop: '0.5px solid rgba(255, 255, 255, 0.1)',
      }}
    >
      <div className="flex items-center justify-around h-[50px] max-w-md mx-auto px-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const active = isActive(tab.path);
          
          return (
            <button
              key={tab.path}
              onClick={() => handleTabPress(tab.path)}
              className={cn(
                "flex flex-col items-center justify-center gap-0.5 flex-1 py-1 transition-all duration-200 active:scale-95",
                active ? "text-primary" : "text-muted-foreground"
              )}
            >
              <Icon className={cn("h-6 w-6", active && "drop-shadow-[0_0_8px_hsl(var(--primary))]")} />
              <span className="text-[10px] font-medium">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
