'use client';

// Helper for professional spread formatting
function formatSpreadLine(line: number): string {
  if (line === 0) return "PK";
  if (line > 0) return `+${line}`;
  if (line < 0) return `${line}`;
  return "";
}
import { motion, AnimatePresence } from "framer-motion";
import { useState, memo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatTotalLine, formatTime } from "@/lib/formatters";
import { TeamLogo } from "@/components/TeamLogo";
import { cn } from "@/lib/utils";

import type { Game } from "@/types";

interface GameCardProps {
  game: Game;
  className?: string;
  compact?: boolean;
}

export const GameCard = memo(
  function GameCard({ game, className, compact = false }: GameCardProps) {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
      <motion.div layout className={cn("w-full", className)}>
        <Card
          className={cn(
            "w-full max-w-4xl mx-auto rounded-lg border border-border/20 bg-[color:var(--color-card)]/85 transition-all duration-200 group backdrop-blur-md min-h-[72px] md:min-h-[88px] hover:-translate-y-0.5 hover:scale-[1.01] cursor-pointer flex flex-col justify-between",
            compact ? "max-w-xl" : "",
          )}
          onClick={() => setIsExpanded((v) => !v)}
        >
          {/* League Header */}
          <div className="flex items-center justify-between px-6 py-2 bg-green-600 rounded-t-lg">
            <div className="flex items-center gap-2">
              <TeamLogo team={game.leagueId} size="sm" />
              <span className="font-bold text-white text-base">{game.leagueId}</span>
            </div>
            <span className="text-white text-xs font-medium">{formatTime(game.startTime)}</span>
          </div>
          <CardContent className="p-0">
            {/* Main Row: Time, Teams, Spread, Total, Moneyline, Add */}
            <div className="flex flex-row items-center gap-4 px-6 py-4 w-full">
              {/* Time */}
              <div className="flex flex-col items-center min-w-[60px]">
                <span className="text-xs text-muted-foreground">TIME</span>
                <span className="text-sm font-medium text-white">{formatTime(game.startTime)}</span>
              </div>
              {/* Teams */}
              <div className="flex flex-col flex-1 gap-2 min-w-0">
                <div className="flex items-center gap-2">
                  <TeamLogo team={game.homeTeam.shortName || game.homeTeam.name} league={game.leagueId} size="sm" className="max-w-[40px] max-h-[40px] aspect-square overflow-hidden flex-shrink-0" />
                  <span className="font-bold text-white text-base">{game.homeTeam.name}</span>
                  <span className="text-xs text-muted-foreground">({game.homeTeam.shortName})</span>
                </div>
                <div className="flex items-center gap-2">
                  <TeamLogo team={game.awayTeam.shortName || game.awayTeam.name} league={game.leagueId} size="sm" className="max-w-[40px] max-h-[40px] aspect-square overflow-hidden flex-shrink-0" />
                  <span className="font-bold text-white text-base">{game.awayTeam.name}</span>
                  <span className="text-xs text-muted-foreground">({game.awayTeam.shortName})</span>
                </div>
              </div>
              {/* Spread */}
              <div className="flex flex-col items-center min-w-[80px]">
                <span className="text-xs text-muted-foreground">SPREAD</span>
                <div className="flex flex-col gap-1">
                  <span className="text-sm text-white">{formatSpreadLine(game.odds?.spread?.home?.line ?? 0)} {game.odds?.spread?.home?.odds ?? ""}</span>
                  <span className="text-sm text-white">{formatSpreadLine(game.odds?.spread?.away?.line ?? 0)} {game.odds?.spread?.away?.odds ?? ""}</span>
                </div>
              </div>
              {/* Total */}
              <div className="flex flex-col items-center min-w-[80px]">
                <span className="text-xs text-muted-foreground">TOTAL</span>
                <div className="flex flex-col gap-1">
                  <span className="text-sm text-white">O{formatTotalLine(game.odds?.total?.over?.line ?? 0)} - {game.odds?.total?.over?.odds ?? ""}</span>
                  <span className="text-sm text-white">U{formatTotalLine(game.odds?.total?.under?.line ?? 0)} - {game.odds?.total?.under?.odds ?? ""}</span>
                </div>
              </div>
              {/* Money Line */}
              <div className="flex flex-col items-center min-w-[80px]">
                <span className="text-xs text-muted-foreground">MONEY LINE</span>
                <div className="flex flex-col gap-1">
                  <span className="text-sm text-white">{game.odds?.moneyline?.home?.odds ?? ""}</span>
                  <span className="text-sm text-white">{game.odds?.moneyline?.away?.odds ?? ""}</span>
                </div>
              </div>
              {/* Add Bet Button */}
              <div className="flex flex-col items-center min-w-[40px]">
                <span className="text-xs text-muted-foreground">ADD</span>
                <Button variant="outline" size="icon" className="mt-1">
                  +
                </Button>
              </div>
            </div>
            {/* Expanded Section: Status, Venue, Start Date */}
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  className="overflow-hidden px-6 pb-5"
                >
                  <Separator className="my-3" />
                  <div className="flex flex-col gap-2">
                    <span className="text-xs text-muted-foreground">Status: <span className="font-bold text-white">{game.status}</span></span>
                    <span className="text-xs text-muted-foreground">Venue: <span className="font-bold text-white">{game.venue}</span></span>
                    <span className="text-xs text-muted-foreground">League: <span className="font-bold text-white">{game.leagueId}</span></span>
                    <span className="text-xs text-muted-foreground">Start: <span className="font-bold text-white">{formatTime(game.startTime)}</span></span>
                    <span className="text-xs text-muted-foreground">Click row to expand/collapse additional game information</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>
        </Card>
      </motion.div>
    );
  },
  (prevProps, nextProps) => {
    // Custom comparison for performance optimization
    return (
      prevProps.game.id === nextProps.game.id &&
      prevProps.game.odds === nextProps.game.odds &&
      prevProps.game.status === nextProps.game.status &&
      prevProps.compact === nextProps.compact &&
      prevProps.className === nextProps.className
    );
  },
);
