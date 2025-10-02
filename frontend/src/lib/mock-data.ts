// frontend/src/lib/mock-data.ts
import { Game } from '@/types'; // Assuming you have a Game type defined

export const mockGames: Game[] = [
  {
    id: '1',
    leagueId: 'nba',
    status: 'upcoming',
    homeTeam: {
  id: 'gsw',
      name: 'Golden State Warriors',
      shortName: 'GSW',
      logo: '/logos/nba/golden-state-warriors.svg',
    },
    awayTeam: {
  id: 'lal',
      name: 'Los Angeles Lakers',
      shortName: 'LAL',
      logo: '/logos/nba/los-angeles-lakers.svg',
    },
    startTime: new Date('2024-10-25T02:30:00Z'),
    odds: {
      moneyline: {
        home: { odds: -150, lastUpdated: new Date() },
        away: { odds: 130, lastUpdated: new Date() },
      },
      spread: {
        home: { odds: -110, line: -3.5, lastUpdated: new Date() },
        away: { odds: -110, line: 3.5, lastUpdated: new Date() },
      },
      total: {
        home: { odds: -110, line: 225.5, lastUpdated: new Date() },
        away: { odds: -110, line: 225.5, lastUpdated: new Date() },
      },
    },
  },
  {
    id: '2',
    leagueId: 'nfl',
    status: 'upcoming',
    homeTeam: {
  id: 'kc',
      name: 'Kansas City Chiefs',
      shortName: 'KC',
      logo: '/logos/nfl/kansas-city-chiefs.svg',
    },
    awayTeam: {
  id: 'mia',
      name: 'Miami Dolphins',
      shortName: 'MIA',
      logo: '/logos/nfl/miami-dolphins.svg',
    },
    startTime: new Date('2024-10-26T20:00:00Z'),
    odds: {
      moneyline: {
        home: { odds: -200, lastUpdated: new Date() },
        away: { odds: 170, lastUpdated: new Date() },
      },
      spread: {
        home: { odds: -110, line: -4.5, lastUpdated: new Date() },
        away: { odds: -110, line: 4.5, lastUpdated: new Date() },
      },
      total: {
        home: { odds: -110, line: 51.5, lastUpdated: new Date() },
        away: { odds: -110, line: 51.5, lastUpdated: new Date() },
      },
    },
  },
];