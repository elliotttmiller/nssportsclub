// frontend/src/lib/mock-data.ts
import { Game } from '@/types'; // Assuming you have a Game type defined

export const mockGames: Game[] = [
  {
    id: '1',
    leagueId: 'nba',
    sport: 'NBA',
    homeTeam: { id: 'gsw', name: 'Golden State Warriors', shortName: 'GSW' },
    awayTeam: { id: 'lal', name: 'Los Angeles Lakers', shortName: 'LAL' },
    start_time: '2024-10-25T02:30:00Z',
    odds: {
      moneyline: { home: -150, away: 130 },
      spread: { home: -3.5, away: 3.5 },
      total: 225.5,
    },
  },
  {
    id: '2',
    leagueId: 'nfl',
    sport: 'NFL',
    homeTeam: { id: 'kc', name: 'Kansas City Chiefs', shortName: 'KC' },
    awayTeam: { id: 'mia', name: 'Miami Dolphins', shortName: 'MIA' },
    start_time: '2024-10-26T20:00:00Z',
    odds: {
      moneyline: { home: -200, away: 170 },
      spread: { home: -4.5, away: 4.5 },
      total: 51.5,
    },
  },
];