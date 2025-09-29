"use client";

import React, { memo, useCallback, useState } from "react";
import { Game } from "@/types";
import { TeamLogo } from "./TeamLogo";
import {
  formatOdds,
  formatSpreadLine,
  formatTotalLine,
} from "@/lib/formatters";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./ui/button";
import { useBetSlip } from "@/context/BetSlipContext";
import { cn } from "@/lib/utils";
import { provideBetFeedback } from "@/lib/betInteractions";

interface ProfessionalGameRowProps {
  game: Game;
  isFirstInGroup?: boolean;
  showTime?: boolean;
}

export const ProfessionalGameRow = memo(
  ({ game, isFirstInGroup }: ProfessionalGameRowProps) => {
    const { addBet, removeBet, betSlip } = useBetSlip();
    const [isExpanded, setIsExpanded] = useState(false);

    const gameDate = new Date(game.startTime);

    // Helper to check if a bet is in the bet slip
    const getBetId = useCallback(
      (betType: string, selection: string) => {
        return `${game.id}-${betType}-${selection}`;
      },
      [game.id],
    );

    const isBetInSlip = useCallback(
      (betType: string, selection: string) => {
        const betId = getBetId(betType, selection);
        return (
          Array.isArray(betSlip?.bets) &&
          betSlip.bets.some((b) => b.id === betId)
        );
      },
      [betSlip, getBetId],
    );

    const handleBetClick = (
      betType: "spread" | "total" | "moneyline",
      selection: "away" | "home" | "over" | "under",
      e?: React.MouseEvent,
    ) => {
      e?.stopPropagation(); // Prevent card expansion
      const betId = getBetId(betType, selection);
      const isSelected = isBetInSlip(betType, selection);

      if (isSelected) {
        removeBet(betId);
        provideBetFeedback(false, betType, selection);
        return;
      }

      let odds: number;
      let line: number | undefined;

      switch (betType) {
        case "spread":
          odds =
            selection === "away"
              ? game.odds.spread.away.odds
              : game.odds.spread.home.odds;
          line =
            selection === "away"
              ? game.odds.spread.away.line
              : game.odds.spread.home.line;
          break;
        case "total":
          odds =
            selection === "over"
              ? game.odds.total.over?.odds || 0
              : game.odds.total.under?.odds || 0;
          line =
            selection === "over"
              ? game.odds.total.over?.line
              : game.odds.total.under?.line;
          break;
        case "moneyline":
          odds =
            selection === "away"
              ? game.odds.moneyline.away.odds
              : game.odds.moneyline.home.odds;
          line = undefined;
          break;
        default:
          return;
      }

      addBet(game, betType, selection, odds, line);

      // Provide feedback
      const teamName =
        selection === "away" ? game.awayTeam.name : game.homeTeam.name;
      provideBetFeedback(true, betType, selection, teamName);
    };

    return (
      <motion.div
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ backgroundColor: "rgba(var(--muted), 0.5)" }}
        className={cn(
          "group transition-colors duration-200 border-b border-border/20 last:border-b-0 cursor-pointer",
          isFirstInGroup && "border-t border-border",
        )}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {/* Game Row */}
        <div className="grid grid-cols-[120px_2fr_1fr_1fr_1fr_48px] gap-4 items-center py-2 px-6 min-h-[64px] bg-card rounded-lg border border-transparent shadow-xl">
          {/* NFL and Time - horizontally centered together */}
          <div className="relative h-full">
            <div className="flex items-center justify-center h-full w-full flex-col">
              <span className="font-bold text-green-600 text-lg tracking-wide mb-1">
                NFL
              </span>
              <span className="text-base font-bold text-foreground mt-0">
                {gameDate.toLocaleTimeString("en-US", {
                  hour: "numeric",
                  minute: "2-digit",
                })}
              </span>
            </div>
          </div>
          {/* Away Team */}
          <div className="flex items-center gap-4 min-w-0">
            <TeamLogo team={game.awayTeam.id || game.awayTeam.shortName || game.awayTeam.name} league={game.leagueId} size="lg" className="shadow-lg rounded-md bg-white" />
            <span className="font-bold text-xl text-foreground truncate max-w-[160px]">
              {game.awayTeam.name}
            </span>
            <span className="text-base text-muted-foreground">
              ({game.awayTeam.shortName})
            </span>
          </div>
          {/* Away Odds */}
          <Button
            variant={isBetInSlip("spread", "away") ? "default" : "outline"}
            size="sm"
            onClick={(e) => handleBetClick("spread", "away", e)}
            className={cn(
              "h-8 text-xs px-2 transition-all duration-200 font-medium w-full",
              isBetInSlip("spread", "away")
                ? "bg-accent text-accent-foreground shadow-md ring-2 ring-accent/20"
                : "hover:bg-accent hover:text-accent-foreground hover:shadow-sm",
            )}
          >
            {formatSpreadLine(game.odds.spread.away.line || 0)}{" "}
            {formatOdds(game.odds.spread.away.odds)}
          </Button>
          <Button
            variant={isBetInSlip("total", "over") ? "default" : "outline"}
            size="sm"
            onClick={(e) => handleBetClick("total", "over", e)}
            className={cn(
              "h-8 text-xs px-2 transition-all duration-200 font-medium w-full",
              isBetInSlip("total", "over")
                ? "bg-accent text-accent-foreground shadow-md ring-2 ring-accent/20"
                : "hover:bg-accent hover:text-accent-foreground hover:shadow-sm",
            )}
          >
            O{formatTotalLine(game.odds.total.over?.line || 0)}{" "}
            {formatOdds(game.odds.total.over?.odds || 0)}
          </Button>
          <Button
            variant={isBetInSlip("moneyline", "away") ? "default" : "outline"}
            size="sm"
            onClick={(e) => handleBetClick("moneyline", "away", e)}
            className={cn(
              "h-8 text-xs px-2 transition-all duration-200 font-medium w-full",
              isBetInSlip("moneyline", "away")
                ? "bg-accent text-accent-foreground shadow-md ring-2 ring-accent/20"
                : "hover:bg-accent hover:text-accent-foreground hover:shadow-sm",
            )}
          >
            {formatOdds(game.odds.moneyline.away.odds)}
          </Button>
          {/* Single '+' button for the gamecard */}
          <div className="flex items-center justify-end pr-2 min-w-[48px]">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full shadow-lg text-xl ml-2"
            >
              +
            </Button>
          </div>
        </div>
        {/* Home Team Row - no NFL/time or '+' button */}
        <div className="grid grid-cols-[120px_2fr_1fr_1fr_1fr_48px] gap-4 items-center py-2 px-6 min-h-[64px] bg-card rounded-lg border border-transparent shadow-xl">
          <div></div>
          <div className="flex items-center gap-4 min-w-0">
            <TeamLogo team={game.homeTeam.id || game.homeTeam.shortName || game.homeTeam.name} league={game.leagueId} size="lg" className="shadow-lg rounded-md bg-white" />
            <span className="font-bold text-xl text-foreground truncate max-w-[160px]">
              {game.homeTeam.name}
            </span>
            <span className="text-base text-muted-foreground">
              ({game.homeTeam.shortName})
            </span>
          </div>
          <Button
            variant={isBetInSlip("spread", "home") ? "default" : "outline"}
            size="sm"
            onClick={(e) => handleBetClick("spread", "home", e)}
            className={cn(
              "h-8 text-xs px-2 transition-all duration-200 font-medium w-full",
              isBetInSlip("spread", "home")
                ? "bg-accent text-accent-foreground shadow-md ring-2 ring-accent/20"
                : "hover:bg-accent hover:text-accent-foreground hover:shadow-sm",
            )}
          >
            {formatSpreadLine(game.odds.spread.home.line || 0)}{" "}
            {formatOdds(game.odds.spread.home.odds)}
          </Button>
          <Button
            variant={isBetInSlip("total", "under") ? "default" : "outline"}
            size="sm"
            onClick={(e) => handleBetClick("total", "under", e)}
            className={cn(
              "h-8 text-xs px-2 transition-all duration-200 font-medium w-full",
              isBetInSlip("total", "under")
                ? "bg-accent text-accent-foreground shadow-md ring-2 ring-accent/20"
                : "hover:bg-accent hover:text-accent-foreground hover:shadow-sm",
            )}
          >
            U{formatTotalLine(game.odds.total.under?.line || 0)}{" "}
            {formatOdds(game.odds.total.under?.odds || 0)}
          </Button>
          <Button
            variant={isBetInSlip("moneyline", "home") ? "default" : "outline"}
            size="sm"
            onClick={(e) => handleBetClick("moneyline", "home", e)}
            className={cn(
              "h-8 text-xs px-2 transition-all duration-200 font-medium w-full",
              isBetInSlip("moneyline", "home")
                ? "bg-accent text-accent-foreground shadow-md ring-2 ring-accent/20"
                : "hover:bg-accent hover:text-accent-foreground hover:shadow-sm",
            )}
          >
            {formatOdds(game.odds.moneyline.home.odds)}
          </Button>
          <div></div>
        </div>
        {/* Expanded Section */}
        <AnimatePresence mode="wait">
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="overflow-hidden border-t border-border/30 bg-muted/20"
            >
              <div className="p-4 space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Status: </span>
                    <span className="font-medium">{game.status || "Scheduled"}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">League: </span>
                    <span className="font-medium">{game.leagueId}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Venue: </span>
                    <span className="font-medium">{game.venue || "TBD"}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Start: </span>
                    <span className="font-medium">{new Date(game.startTime).toLocaleDateString()}</span>
                  </div>
                </div>
                <div className="pt-2 text-xs text-muted-foreground text-center">Click row to expand/collapse additional game information</div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  },
);

ProfessionalGameRow.displayName = "ProfessionalGameRow";
