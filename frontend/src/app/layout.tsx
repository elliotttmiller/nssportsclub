"use client";

import './globals.css';
import { Header } from '@/components/Header';
import { SideNavPanel } from '@/components/panels/SideNavPanel';
import { ActionHubPanel } from '@/components/panels/ActionHubPanel';
import { BetSlipProvider } from '@/context/BetSlipContext';
import { NavigationProvider } from '@/context/NavigationContext';
import { useState } from 'react';
import { CaretLeft, CaretRight } from '@phosphor-icons/react';
import { motion, AnimatePresence } from 'framer-motion';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [showSidebar, setShowSidebar] = useState(true);
  const [showBetSlip, setShowBetSlip] = useState(true);

  return (
    <html lang="en">
      <body className="min-h-screen w-full overflow-auto">
        <BetSlipProvider>
          <NavigationProvider>
            <div className="flex flex-col min-h-screen w-full bg-gradient-to-b from-[#181C20] to-[#101215]">
              <Header />
              <main className="flex flex-row flex-1 w-full min-h-0 min-w-0">
                <AnimatePresence mode="wait">
                  {showSidebar && (
                    <motion.aside
                      key="sidebar"
                      initial={{ x: -80, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: -80, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="max-w-[240px] w-full bg-[#181C20] border-r border-border/10 p-2 flex flex-col min-h-0 flex-shrink-0 shadow-md relative min-w-0 z-20"
                    >
                      <SideNavPanel />
                      <button
                        className="absolute top-1/2 left-full -translate-y-1/2 -translate-x-1/2 z-30 bg-muted/80 hover:bg-accent text-muted-foreground hover:text-accent-foreground rounded-full shadow-lg w-8 h-8 flex items-center justify-center transition-all duration-200 border border-border focus:outline-none"
                        onClick={() => setShowSidebar(false)}
                        aria-label="Hide Sidebar"
                      >
                        <CaretLeft size={20} weight="bold" />
                      </button>
                    </motion.aside>
                  )}
                </AnimatePresence>
                {!showSidebar && (
                  <button
                    className="fixed top-1/2 left-2 -translate-y-1/2 z-30 bg-muted/80 hover:bg-accent text-muted-foreground hover:text-accent-foreground rounded-full shadow-lg w-8 h-8 flex items-center justify-center transition-all duration-200 border border-border focus:outline-none"
                    onClick={() => setShowSidebar(true)}
                    aria-label="Show Sidebar"
                  >
                    <CaretRight size={20} weight="bold" />
                  </button>
                )}
                <section className="flex-1 flex flex-col min-w-0 min-h-0">
                  <div className="w-full max-w-6xl mx-auto px-2 md:px-8 lg:px-12 min-h-full bg-background">
                    {children}
                  </div>
                </section>
                <AnimatePresence mode="wait">
                  {showBetSlip && (
                    <motion.aside
                      key="betslip"
                      initial={{ x: 80, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: 80, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="max-w-[320px] w-full bg-[#181C20] border-l border-border/10 p-4 flex flex-col min-h-0 flex-shrink-0 shadow-md relative min-w-0 z-20"
                    >
                      <ActionHubPanel />
                      <button
                        className="absolute top-1/2 right-full -translate-y-1/2 translate-x-1/2 z-30 bg-muted/80 hover:bg-accent text-muted-foreground hover:text-accent-foreground rounded-full shadow-lg w-8 h-8 flex items-center justify-center transition-all duration-200 border border-border focus:outline-none"
                        onClick={() => setShowBetSlip(false)}
                        aria-label="Hide Bet Slip"
                      >
                        <CaretRight size={20} weight="bold" />
                      </button>
                    </motion.aside>
                  )}
                </AnimatePresence>
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