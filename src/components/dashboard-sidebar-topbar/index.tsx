"use client";
import React from "react";
import { DashboardSidebar } from "./dashboardSidebar";
import { Topbar } from "./topbar";
import { VideoBackground } from "@/components/ui/video-background";
import { MobileLayout } from "@/components/mobile";
import { useIsMobile } from "@/hooks/use-mobile";

const DashboardSidebarTopbar = ({ children }: { children: React.ReactNode }) => {
  const isMobile = useIsMobile();

  // Mobile Layout - iOS style with tab bar
  if (isMobile) {
    return (
      <MobileLayout>
        {children}
      </MobileLayout>
    );
  }

  // Desktop Layout - Sidebar + Topbar
  return (
    <div className="min-h-screen w-full relative">
      <VideoBackground />
      <DashboardSidebar collapsed={false} setCollapsed={() => {}} />

      <div className="pl-[290px] pt-4 pr-4 pb-4 relative z-10">
        <Topbar />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
};

export default DashboardSidebarTopbar;
