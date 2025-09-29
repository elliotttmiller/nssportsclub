'use client';

import React from "react";

interface League {
  id: string;
  name: string;
}
interface Sport {
  id: string;
  name: string;
  leagues: League[];
}
interface LiveGamesFilterProps {
  sports: Sport[];
  onSportChange: (sportId: string) => void;
  onLeagueChange: (leagueId: string) => void;
  selectedSport: string;
  selectedLeague: string;
}

export function LiveGamesFilter({ sports, onSportChange, onLeagueChange, selectedSport, selectedLeague }: LiveGamesFilterProps) {
  return (
    <div className="flex gap-4 mb-4 p-4 rounded-2xl bg-card/80 shadow-lg border border-border/30 transition-all duration-200 hover:shadow-xl">
      <select
        aria-label="Select sport"
        value={selectedSport}
        onChange={e => {
          onSportChange(e.target.value);
          onLeagueChange("");
        }}
        className="px-3 py-2 rounded-xl border border-border bg-muted/30 text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-accent transition-all duration-200 hover:bg-muted/50"
      >
        <option value="">All Sports</option>
        {sports.map((sport: Sport) => (
          <option key={sport.id} value={sport.id}>{sport.name}</option>
        ))}
      </select>
      <select
        aria-label="Select league"
        value={selectedLeague}
        onChange={e => onLeagueChange(e.target.value)}
        className="px-3 py-2 rounded-xl border border-border bg-muted/30 text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-accent transition-all duration-200 hover:bg-muted/50"
        disabled={!selectedSport}
      >
        <option value="">All Leagues</option>
        {selectedSport && sports.find((s: Sport) => s.id === selectedSport)?.leagues.map((league: League) => (
          <option key={league.id} value={league.id}>{league.name}</option>
        ))}
      </select>
    </div>
  );
}
