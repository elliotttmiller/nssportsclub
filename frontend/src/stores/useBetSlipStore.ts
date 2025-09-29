import { create } from 'zustand';
import { Bet } from '@/types'; // Ensure this path matches your type definitions

type BetSlipState = {
  bets: Bet[];
  addBet: (bet: Bet) => void;
  removeBet: (betId: string) => void;
  clearBets: () => void;
  updateStake: (betId: string, stake: number) => void;
};

export const useBetSlipStore = create<BetSlipState>((set) => ({
  bets: [],
  addBet: (bet) =>
    set((state) => {
      // Prevent duplicate bets
      if (state.bets.find((b) => b.id === bet.id)) {
        return state;
      }
      return { bets: [...state.bets, bet] };
    }),
  removeBet: (betId) =>
    set((state) => ({
      bets: state.bets.filter((b) => b.id !== betId),
    })),
  clearBets: () => set({ bets: [] }),
  updateStake: (betId, stake) =>
    set((state) => ({
      bets: state.bets.map((bet) =>
        bet.id === betId ? { ...bet, stake } : bet
      ),
    })),
}));
