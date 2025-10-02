"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, memo } from "react";
import { Button } from "@/components/ui/button";
import { formatTotalLine, formatTime } from "@/lib/formatters";
import { TeamLogo } from "@/components/TeamLogo";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useBetSlip } from "@/context/BetSlipContext";

import type { Game } from "@/types";

// Helper for professional spread formatting
function formatSpreadLine(line: number): string {
  if (line === 0) return "PK";
  if (line > 0) return `+${line}`;
  if (line < 0) return `${line}`;
  return "";
}

interface GameCardProps {
  game: Game;
  className?: string;
}

export const GameCard = memo(
  function GameCard({ game, className }: GameCardProps) {
    const [isExpanded] = useState(false);
    const { addBet } = useBetSlip();
    const handleBetClick = (
      e: React.MouseEvent,
      betType: "spread" | "moneyline" | "total",
      selection: "home" | "away" | "over" | "under",
      odds: number,
      line?: number,
    ) => {
      e.stopPropagation();
      addBet(game, betType, selection, odds, line);
      toast.success("Bet added to slip!", { duration: 1200, position: "bottom-center" });
    };
    return (
      <div className={cn("w-full flex flex-col items-center", className)}>
        {/* Card Header */}
        <div className="w-full max-w-4xl mx-auto rounded-t-2xl bg-green-600 flex items-center justify-between px-6 py-3 shadow-lg">
          <div className="flex items-center gap-3">
            <TeamLogo team={game.leagueId} size="md" />
            <span className="font-bold text-white text-lg tracking-wide">{game.leagueId}</span>
          </div>
          <span className="text-white text-sm font-semibold">{formatTime(game.startTime)}</span>
        </div>
        {/* Card Body */}
        <div className="w-full max-w-4xl mx-auto bg-[#181C20] rounded-b-2xl shadow-lg px-6 py-4">
          <div className="grid grid-cols-[100px_1.5fr_1fr_1fr_1fr_40px] gap-4 items-center text-center">
            {/* TIME */}
            <div className="flex flex-col items-center justify-center">
              <span className="text-xs text-muted-foreground font-semibold mb-1">TIME</span>
              <span className="text-sm font-bold text-white">{formatTime(game.startTime)}</span>
            </div>
            {/* TEAM */}
            <div className="flex flex-col gap-2 items-start">
              <div className="flex items-center gap-2">
                <TeamLogo team={game.homeTeam.shortName || game.homeTeam.name} league={game.leagueId} size="sm" />
                <span className="font-bold text-white text-base">{game.homeTeam.name}</span>
                <span className="text-xs text-muted-foreground">({game.homeTeam.shortName})</span>
              </div>
              <div className="flex items-center gap-2">
                <TeamLogo team={game.awayTeam.shortName || game.awayTeam.name} league={game.leagueId} size="sm" />
                <span className="font-bold text-white text-base">{game.awayTeam.name}</span>
                <span className="text-xs text-muted-foreground">({game.awayTeam.shortName})</span>
              </div>
            </div>
            {/* SPREAD */}
            <div className="flex flex-col gap-2">
              <Button variant="ghost" size="sm" className="bg-[#22272b] text-white rounded-lg px-3 py-1 font-semibold shadow hover:bg-green-700"
                onClick={e => handleBetClick(e, "spread", "home", game.odds?.spread?.home?.odds ?? 0, game.odds?.spread?.home?.line)}>
                {formatSpreadLine(game.odds?.spread?.home?.line ?? 0)} {game.odds?.spread?.home?.odds ?? ""}
              </Button>
              <Button variant="ghost" size="sm" className="bg-[#22272b] text-white rounded-lg px-3 py-1 font-semibold shadow hover:bg-green-700"
                onClick={e => handleBetClick(e, "spread", "away", game.odds?.spread?.away?.odds ?? 0, game.odds?.spread?.away?.line)}>
                {formatSpreadLine(game.odds?.spread?.away?.line ?? 0)} {game.odds?.spread?.away?.odds ?? ""}
              </Button>
            </div>
            {/* TOTAL */}
            <div className="flex flex-col gap-2">
              <Button variant="ghost" size="sm" className="bg-[#22272b] text-white rounded-lg px-3 py-1 font-semibold shadow hover:bg-green-700"
                onClick={e => handleBetClick(e, "total", "over", game.odds?.total?.over?.odds ?? 0, game.odds?.total?.over?.line)}>
                O{formatTotalLine(game.odds?.total?.over?.line ?? 0)} {game.odds?.total?.over?.odds ?? ""}
              </Button>
              <Button variant="ghost" size="sm" className="bg-[#22272b] text-white rounded-lg px-3 py-1 font-semibold shadow hover:bg-green-700"
                onClick={e => handleBetClick(e, "total", "under", game.odds?.total?.under?.odds ?? 0, game.odds?.total?.under?.line)}>
                U{formatTotalLine(game.odds?.total?.under?.line ?? 0)} {game.odds?.total?.under?.odds ?? ""}
              </Button>
            </div>
            {/* MONEY LINE */}
            <div className="flex flex-col gap-2">
              <Button variant="ghost" size="sm" className="bg-[#22272b] text-white rounded-lg px-3 py-1 font-semibold shadow hover:bg-green-700"
                onClick={e => handleBetClick(e, "moneyline", "home", game.odds?.moneyline?.home?.odds ?? 0)}>
                {game.odds?.moneyline?.home?.odds ?? ""}
              </Button>
              <Button variant="ghost" size="sm" className="bg-[#22272b] text-white rounded-lg px-3 py-1 font-semibold shadow hover:bg-green-700"
                onClick={e => handleBetClick(e, "moneyline", "away", game.odds?.moneyline?.away?.odds ?? 0)}>
                {game.odds?.moneyline?.away?.odds ?? ""}
              </Button>
            </div>
            {/* ADD BUTTON */}
            <div className="flex flex-col gap-2 items-center">
              <Button variant="ghost" size="icon" className="bg-green-700 text-white rounded-full shadow hover:bg-green-800"
                onClick={e => handleBetClick(e, "moneyline", "home", game.odds?.moneyline?.home?.odds ?? 0)}>
                +
              </Button>
            </div>
          </div>
          {/* Expanded Section */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
                className="overflow-hidden px-2 pb-3 mt-4"
              >
                <div className="flex flex-col gap-2 text-left">
                  <span className="text-xs text-muted-foreground">Status: <span className="font-bold text-white">{game.status}</span></span>
                  <span className="text-xs text-muted-foreground">Venue: <span className="font-bold text-white">{game.venue}</span></span>
                  <span className="text-xs text-muted-foreground">League: <span className="font-bold text-white">{game.leagueId}</span></span>
                  <span className="text-xs text-muted-foreground">Start: <span className="font-bold text-white">{formatTime(game.startTime)}</span></span>
                  <span className="text-xs text-muted-foreground">Click row to expand/collapse additional game information</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    );
  },
  (prevProps, nextProps) => {
    // Custom comparison for performance optimization
    return (
      prevProps.game.id === nextProps.game.id &&
      prevProps.game.odds === nextProps.game.odds &&
      prevProps.game.status === nextProps.game.status &&
      prevProps.className === nextProps.className
    );
  },
);

