"use client";

import './globals.css';
import { SideNavPanel } from '@/components/panels/SideNavPanel';
import { ActionHubPanel } from '@/components/panels/ActionHubPanel';
import { BetSlipProvider } from '@/context/BetSlipContext';
import { NavigationProvider } from '@/context/NavigationContext';
import WorkspacePanel from '@/components/panels/WorkspacePanel';
import { useState } from "react";
import { cn } from '@/lib/utils';
import { CaretLeft, CaretRight } from "@phosphor-icons/react";

export default function RootLayout() {
  const [showSidebar, setShowSidebar] = useState(true);
  const [showBetSlip, setShowBetSlip] = useState(true);

  return (
    <html lang="en">
      <body>
        <BetSlipProvider>
          <NavigationProvider>
            <div className="flex flex-col min-h-screen bg-gradient-to-b from-[#181C20] to-[#101215] rounded-xl">
              {/* Header */}
              <header className="w-full px-8 py-4 flex items-center justify-between bg-[#101215] shadow-md border-b border-border/10 rounded-b-xl">
                <div className="flex items-center gap-3">
                  <span className="font-bold text-xl text-white tracking-wide">NSSPORTSCLUB</span>
                </div>
              </header>
              {/* Main content */}
              <main className="flex flex-row flex-1 w-full rounded-xl relative">
                {/* Sidebar */}
                <aside
                  className={cn(
                    "w-[240px] bg-[#181C20] border-r border-border/10 p-4 flex flex-col gap-4 min-h-full shadow-md rounded-xl transition-all duration-300 relative",
                    showSidebar ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0 pointer-events-none"
                  )}
                >
                  <SideNavPanel />
                  {showSidebar && (
                    <button
                      className="absolute top-1/2 left-full -translate-y-1/2 -translate-x-1/2 z-20 bg-muted/80 hover:bg-accent text-muted-foreground hover:text-accent-foreground rounded-full shadow-lg w-8 h-8 flex items-center justify-center transition-all duration-200 border border-border focus:outline-none"
                      onClick={() => setShowSidebar(false)}
                      aria-label="Hide Sidebar"
                    >
                      <CaretLeft size={20} weight="bold" />
                    </button>
                  )}
                </aside>
                {!showSidebar && (
                  <button
                    className="fixed top-1/2 left-2 -translate-y-1/2 z-30 bg-muted/80 hover:bg-accent text-muted-foreground hover:text-accent-foreground rounded-full shadow-lg w-8 h-8 flex items-center justify-center transition-all duration-200 border border-border focus:outline-none"
                    onClick={() => setShowSidebar(true)}
                    aria-label="Show Sidebar"
                  >
                    <CaretRight size={20} weight="bold" />
                  </button>
                )}
                {/* Center panel */}
                <section className="flex-1 flex flex-col items-center justify-start px-8 py-6 rounded-xl">
                  <WorkspacePanel />
                </section>
                {/* Bet slip panel */}
                <aside
                  className={cn(
                    "w-[320px] bg-[#181C20] border-l border-border/10 p-6 flex flex-col gap-4 min-h-full shadow-md rounded-xl transition-all duration-300 relative",
                    showBetSlip ? "translate-x-0 opacity-100" : "translate-x-full opacity-0 pointer-events-none"
                  )}
                >
                  <ActionHubPanel />
                  {showBetSlip && (
                    <button
                      className="absolute top-1/2 right-full -translate-y-1/2 translate-x-1/2 z-20 bg-muted/80 hover:bg-accent text-muted-foreground hover:text-accent-foreground rounded-full shadow-lg w-8 h-8 flex items-center justify-center transition-all duration-200 border border-border focus:outline-none"
                      onClick={() => setShowBetSlip(false)}
                      aria-label="Hide Bet Slip"
                    >
                      <CaretRight size={20} weight="bold" />
                    </button>
                  )}
                </aside>
                {!showBetSlip && (
                  <button
                    className="fixed top-1/2 right-2 -translate-y-1/2 z-30 bg-muted/80 hover:bg-accent text-muted-foreground hover:text-accent-foreground rounded-full shadow-lg w-8 h-8 flex items-center justify-center transition-all duration-200 border border-border focus:outline-none"
                    onClick={() => setShowBetSlip(true)}
                    aria-label="Show Bet Slip"
                  >
                    <CaretLeft size={20} weight="bold" />
                  </button>
                )}
              </main>
            </div>
          </NavigationProvider>
        </BetSlipProvider>
      </body>
    </html>
  );
}