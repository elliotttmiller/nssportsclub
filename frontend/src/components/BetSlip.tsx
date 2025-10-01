
'use client';

import { useState, ChangeEvent, ReactNode, ButtonHTMLAttributes, InputHTMLAttributes } from 'react';
import { useBetSlipStore } from '@/stores/useBetSlipStore';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash, Calculator } from 'lucide-react';
import { Bet } from '@/types';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  value: string | number;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Button = ({ children, ...props }: ButtonProps) => (
  <button {...props} className={`w-full p-2 rounded-md font-semibold transition-colors ${props.className || ''}`}>{children}</button>
);
const Input = ({ value, onChange, className, ...props }: InputProps) => (
  <input type="number" value={value} onChange={onChange} className={`w-20 h-8 text-sm bg-background/60 border border-border rounded-md text-right ${className || ''}`} placeholder="Stake" aria-label="Stake" {...props} />
);

export function BetSlip() {
  const { bets, removeBet, clearBets } = useBetSlipStore();
  const [mode, setMode] = useState<'single' | 'parlay'>(bets.length > 1 ? 'parlay' : 'single');

  const totalStake = bets.reduce((sum, bet) => sum + (bet.stake || 10), 0);
  const potentialPayout = bets.reduce((sum, bet) => sum + (bet.potentialPayout || bet.odds * (bet.stake || 10)), 0);

  return (
    <div className="flex h-full flex-col p-4 bg-secondary/30 rounded-lg">
      <div className="flex items-center justify-between pb-4 border-b border-border">
        <div className="flex items-center gap-3">
          <Calculator size={20} className="text-accent" />
          <h2 className="text-lg font-bold">Bet Slip</h2>
        </div>
        {bets.length > 0 && (
          <button onClick={clearBets} className="text-xs text-muted-foreground hover:text-destructive" title="Clear All Bets">
            Clear All
          </button>
        )}
      </div>
      {bets.length > 1 && (
        <div className="flex rounded-md bg-background p-1 my-4">
          <button onClick={() => setMode('single')} className={`w-1/2 rounded p-1.5 text-center text-xs font-medium ${mode === 'single' ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'}`} title="Single Bets">
            Single
          </button>
          <button onClick={() => setMode('parlay')} className={`w-1/2 rounded p-1.5 text-center text-xs font-medium ${mode === 'parlay' ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'}`} title="Parlay Bets">
            Parlay
          </button>
        </div>
      )}
      <div className="flex-1 min-h-0 overflow-y-auto py-4">
        <AnimatePresence>
          {bets.length === 0 ? (
            <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center h-full text-center text-muted-foreground">
              <Calculator size={36} className="mb-4" />
              <p className="font-semibold">Ready to Bet</p>
              <p className="text-xs">Click on odds to add them here.</p>
            </motion.div>
          ) : (
            <motion.ul>
              {bets.map((bet: Bet, index: number) => (
                <motion.li
                  key={bet.id}
                  layout
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: 30 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 30, delay: index * 0.05 }}
                  className="mb-3 bg-secondary p-3 rounded-lg border border-border"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1 pr-2">
                      <p className="font-bold text-sm">{bet.selection.charAt(0).toUpperCase() + bet.selection.slice(1)} {bet.betType.charAt(0).toUpperCase() + bet.betType.slice(1)}</p>
                      <p className="text-xs text-muted-foreground">{bet.game.awayTeam.name} @ {bet.game.homeTeam.name}</p>
                    </div>
                    <button onClick={() => removeBet(bet.id)} className="text-muted-foreground hover:text-destructive p-1" title={`Remove bet on ${bet.selection}`} aria-label={`Remove bet on ${bet.selection}`}>
                      <Trash size={14} />
                    </button>
                  </div>
                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-border/50">
                    <span className="text-xs font-mono bg-primary/20 text-primary px-2 py-1 rounded">{bet.odds > 0 ? `+${bet.odds}` : bet.odds}{bet.line !== undefined ? ` (${bet.line})` : ''}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs">Stake:</span>
                      <Input value={bet.stake || 10} onChange={() => {}} />
                    </div>
                  </div>
                </motion.li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
      {bets.length > 0 && (
        <div className="mt-auto border-t border-border pt-4 space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Total Stake:</span>
            <span className="font-semibold">${totalStake.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Potential Payout:</span>
            <span className="font-bold text-accent text-base">${potentialPayout.toFixed(2)}</span>
          </div>
          <Button className="bg-accent text-accent-foreground h-12 text-base" title="Place Bet">
            Place Bet
          </Button>
        </div>
      )}
    </div>
  );
}