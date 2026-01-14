"use client";

import React, { useState } from 'react';
import { MobileHeader } from './MobileHeader';
import { MobileTabBar } from './MobileTabBar';
import { MobileMenuSheet } from './MobileMenuSheet';
import { cn } from '@/lib/utils';

interface MobileLayoutProps {
  children: React.ReactNode;
  title?: string;
  showHeader?: boolean;
  showTabBar?: boolean;
  showBack?: boolean;
  largeTitle?: boolean;
  transparentHeader?: boolean;
  rightAction?: React.ReactNode;
  className?: string;
}

export function MobileLayout({
  children,
  title,
  showHeader = true,
  showTabBar = true,
  showBack = true,
  largeTitle = false,
  transparentHeader = false,
  rightAction,
  className
}: MobileLayoutProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {showHeader && (
        <MobileHeader
          title={title}
          showBack={showBack}
          showMenu={false}
          large={largeTitle}
          transparent={transparentHeader}
          rightAction={rightAction}
          onMenuClick={() => setMenuOpen(true)}
        />
      )}

      <main 
        className={cn(
          "min-h-screen",
          showHeader && !largeTitle && "pt-[calc(44px+env(safe-area-inset-top))]",
          showHeader && largeTitle && "pt-[calc(88px+env(safe-area-inset-top))]",
          showTabBar && "pb-[calc(50px+env(safe-area-inset-bottom))]",
          className
        )}
      >
        {children}
      </main>

      {showTabBar && <MobileTabBar />}

      <MobileMenuSheet open={menuOpen} onOpenChange={setMenuOpen} />
    </div>
  );
}
