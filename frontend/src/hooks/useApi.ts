"use client";

import { useState } from 'react';
import type { BetSlip } from '@/types';

// Mock hook for active bet slip
export function useActiveBetSlip(): { data: BetSlip | null } {
  // Replace with mock bet slip if needed
  const [activeBetSlip] = useState<BetSlip | null>(null);
  return { data: activeBetSlip };
}

// Mock hook for setting active bet slip
export function useSetActiveBetSlip(): (betSlip: BetSlip | null) => void {
  const [, setActiveBetSlip] = useState<BetSlip | null>(null);
  return setActiveBetSlip;
}
