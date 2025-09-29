"use client";

import React, { useState, useEffect, useMemo } from "react";
import { SmoothScrollContainer } from "@/components/VirtualScrolling";
import { useNavigation } from "@/context/NavigationContext";
import { Game } from "@/types";
import { Button } from "@/components/ui/button";
import { ProfessionalGameRow } from "@/components/ProfessionalGameRow";
import { CompactMobileGameRow } from "@/components/CompactMobileGameRow";
import { mockGames } from "@/lib/mock-data";
import useIsMobile from "@/hooks/useIsMobile";
import { motion, AnimatePresence } from "framer-motion";
import { CaretUp } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import Image from "next/image";

// const WorkspacePanel = () => {
const WorkspacePanel = () => {
  const { navigation, setMobilePanel } = useNavigation();
  const isMobile = useIsMobile();

  // State management
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    // Load mock games for selected league
    if (navigation.selectedLeague) {
      setGames(mockGames.filter(g => g.leagueId === navigation.selectedLeague));
    } else {
      setGames([]);
    }
  }, [navigation.selectedLeague]);

  // Sorting and filtering (simplified)
  const processedGames = useMemo(() => {
    const processed = [...games];
    // Sort by time only (mock)
    processed.sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime());
    return processed;
  }, [games]);

  const handleScrollToTop = () => {
    // Try to find the SmoothScrollContainer by class and scroll to top
    const el = document.querySelector(".universal-responsive-container");
    if (el) {
      el.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  if (!navigation.selectedLeague || games.length === 0) {
    return (
      <AnimatePresence mode="sync">
        <motion.div
          key="workspacepanel-empty"
          className="h-full flex items-center justify-center bg-background"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center px-4">
            <h3 className="text-lg font-medium text-foreground mb-2">
              Select a League
            </h3>
            <p className="text-muted-foreground mb-4">
              Choose a sport and league to view games and place bets.
            </p>
            {isMobile && (
              <motion.div whileTap={{ scale: 0.98 }}>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setMobilePanel("navigation")}
                  className="rounded-full px-4 py-2 mt-2 shadow-md"
                >
                  Open Sports
                </Button>
              </motion.div>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    );
  }

  return (
    <AnimatePresence mode="sync">
      <motion.div
        key="workspacepanel-main"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -30 }}
        transition={{ duration: 0.4, ease: [0.4, 0.0, 0.2, 1] }}
        className="h-full w-full flex flex-col bg-background"
      >
        {/* Stats header - hidden on mobile, compact on desktop */}
        <div className="hidden md:grid w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4 sm:px-8 lg:px-12 py-6 max-w-screen-lg mx-auto">
          <div className="flex flex-col items-center justify-center bg-card/80 border border-border rounded-xl shadow-sm p-6 min-h-[120px]">
            <span className="text-sm text-muted-foreground mb-1">Balance</span>
            <span className="text-2xl font-semibold text-foreground">
              $1,250.00
            </span>
          </div>
          <div className="flex flex-col items-center justify-center bg-card/80 border border-border rounded-xl shadow-sm p-6 min-h-[120px]">
            <span className="text-sm text-muted-foreground mb-1">Win Rate</span>
            <span className="text-2xl font-semibold text-foreground">68%</span>
          </div>
          <div className="flex flex-col items-center justify-center bg-card/80 border border-border rounded-xl shadow-sm p-6 min-h-[120px]">
            <span className="text-sm text-muted-foreground mb-1">Active</span>
            <span className="text-2xl font-semibold text-foreground">0</span>
          </div>
          <div className="flex flex-col items-center justify-center bg-card/80 border border-border rounded-xl shadow-sm p-6 min-h-[120px]">
            <span className="text-sm text-muted-foreground mb-1">
              This Week
            </span>
            <span className="text-2xl font-semibold text-foreground">
              +$340
            </span>
          </div>
        </div>
        {/* Games Container - always fills available height */}
        <div className="flex-1 min-h-0 w-full flex flex-col">
          <SmoothScrollContainer
            className={cn("h-full universal-responsive-container px-0 sm:px-4")}
            showScrollbar={false}
          >
            <div className="pt-2 pb-24 sm:pb-4 stats-header-container fluid-base-font">
              {/* Professional League Header - Mobile & Desktop */}
              {navigation.selectedLeague && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={cn(
                    "bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-4 mb-0",
                    isMobile ? "rounded-lg mx-2" : "rounded-t-lg mx-4",
                  )}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {/* League Logo + Name */}
                      {navigation.selectedLeague === "nfl" && (
                        <Image
                          src="/logos/nfl/NFL.svg"
                          alt="NFL logo"
                          width={32}
                          height={32}
                          className="w-8 h-8 object-contain drop-shadow-md min-w-[32px] min-h-[32px]"
                        />
                      )}
                      {navigation.selectedLeague === "nba" && (
                        <Image
                          src="/logos/nba/NBA.svg"
                          alt="NBA logo"
                          width={32}
                          height={32}
                          className="w-8 h-8 object-contain drop-shadow-md min-w-[32px] min-h-[32px]"
                        />
                      )}
                      {navigation.selectedLeague === "nhl" && (
                        <Image
                          src="/logos/nhl/NHL Logo.svg"
                          alt="NHL logo"
                          width={32}
                          height={32}
                          className="w-8 h-8 object-contain drop-shadow-md min-w-[32px] min-h-[32px]"
                        />
                      )}
                      <h2 className="text-lg font-bold">
                        {navigation.selectedLeague.toUpperCase()}
                      </h2>
                    </div>
                    <div>
                      <p className="text-sm opacity-90">
                        {new Date().toLocaleDateString("en-US", {
                          weekday: "short",
                          month: "short",
                          day: "numeric",
                        })}
                      </p>
                      <div className="text-sm opacity-90">
                        Week {Math.ceil(new Date().getDate() / 7)}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Professional Table Header - Desktop Only */}
              {!isMobile && processedGames.length > 0 && (
                <div className="bg-muted/50 border-b border-border mx-4 rounded-none">
                  <div className="grid grid-cols-[120px_2fr_1fr_1fr_1fr_48px] items-center justify-items-center">
                    <div className="mt-4"></div>
                    <div className="flex items-center justify-center w-full font-bold text-lg tracking-wide">TEAM</div>
                    <div className="flex justify-center items-center w-full">SPREAD</div>
                    <div className="flex justify-center items-center w-full">TOTAL</div>
                    <div className="flex justify-center items-center w-full">MONEY LINE</div>
                    <div></div>
                  </div>
                </div>
              )}

              {/* Games Container */}
              {isMobile ? (
                /* Mobile: Compact card layout with header */
                <div className="px-2">
                  {/* Mobile Table Header */}
                  <div className="bg-muted/40 border border-border rounded-t-lg px-3 py-2 mb-2">
                    <div className="grid grid-cols-4 gap-2 text-xs font-medium text-muted-foreground">
                      <div>TEAMS</div>
                      <div className="text-center">SPREAD</div>
                      <div className="text-center">TOTAL</div>
                      <div className="text-center">ML</div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <AnimatePresence mode="popLayout">
                      {processedGames.map((game, index) => (
                        <CompactMobileGameRow
                          key={game.id}
                          game={game}
                          index={index}
                        />
                      ))}
                    </AnimatePresence>
                  </div>
                </div>
              ) : (
                /* Desktop: Professional table layout */
                <div className="bg-card/30 border border-t-0 border-border mx-4 rounded-b-lg overflow-hidden">
                  <AnimatePresence mode="popLayout">
                    {processedGames.map((game, index) => {
                      const currentTime = new Date(
                        game.startTime,
                      ).toLocaleTimeString("en-US", {
                        hour: "numeric",
                        minute: "2-digit",
                        hour12: true,
                      });
                      const prevTime =
                        index > 0
                          ? new Date(
                              processedGames[index - 1].startTime,
                            ).toLocaleTimeString("en-US", {
                              hour: "numeric",
                              minute: "2-digit",
                              hour12: true,
                            })
                          : null;

                      const showTime = index === 0 || currentTime !== prevTime;
                      const isFirstInGroup = showTime && index > 0;

                      return (
                        <ProfessionalGameRow
                          key={game.id}
                          game={game}
                          isFirstInGroup={isFirstInGroup}
                          showTime={showTime}
                        />
                      );
                    })}
                  </AnimatePresence>
                </div>
              )}
            </div>
          </SmoothScrollContainer>

          {/* Floating Action Button - Scroll to top */}
          <AnimatePresence>
            {processedGames.length > 5 && (
              <motion.div
                className="fixed bottom-20 right-4 z-30 lg:bottom-6"
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 20 }}
                transition={{ duration: 0.2 }}
              >
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={handleScrollToTop}
                  className="rounded-full h-10 w-10 shadow-lg hover:shadow-xl transition-shadow bg-card/90 backdrop-blur-sm border border-border"
                >
                  <CaretUp size={16} />
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default WorkspacePanel;

