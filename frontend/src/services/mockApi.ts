import { Sport, Bet, BetSlip } from '@/types';

export const getSports = (): Sport[] => [
  {
    id: '1',
    name: 'Football',
    icon: '⚽',
    leagues: [],
  },
  {
    id: '2',
    name: 'Basketball',
    icon: '🏀',
    leagues: [],
  },
  {
    id: '3',
    name: 'Baseball',
    icon: '⚾',
    leagues: [],
  },
];

export function calculatePayout(betOrBetSlip: Bet | BetSlip): number {
  if ('bets' in betOrBetSlip) {
    // BetSlip
    return betOrBetSlip.bets.reduce((sum, bet) => sum + (bet.odds * (bet.stake || 1)), 0);
  }
  // Single Bet
  return (betOrBetSlip.odds || 1) * (betOrBetSlip.stake || 1);
}
