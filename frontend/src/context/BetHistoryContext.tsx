import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  ReactNode,
} from "react";
// Removed broken imports. Replace with local state and placeholder functions.
import { BetSlip } from "@/types";
import PropTypes from "prop-types";

// Integrate real user ID from AuthContext here when available
const USER_ID = "demo";

interface BetHistoryContextType {
  betHistory: BetSlip[];
  refreshHistory: () => void;
  addBetSlipToHistory: (betslipId: string) => Promise<void>;
}

export const BetHistoryContext = createContext<
  BetHistoryContextType | undefined
>(undefined);

interface BetHistoryProviderProps {
  children: ReactNode;
}
export const BetHistoryProvider: React.FC<BetHistoryProviderProps> = ({
  children,
}) => {
  const [betHistory, setBetHistory] = useState<BetSlip[]>([]);

  // Placeholder for adding bet slip to history
  const addRemoteBetSlip = async (_userId: string, _betslipId: string) => {
    // Implement actual logic or API call here if needed
    return Promise.resolve();
  };

  // Optionally hydrate betHistory from API here if needed

  const refreshHistory = useCallback(() => {
    // Just re-run the hook by updating state (if needed)
    // No-op here, as useBetSlipHistory will update automatically
  }, []);

  const addBetSlipToHistory = useCallback(
    async (betslipId: string) => {
      await addRemoteBetSlip(USER_ID, betslipId);
      // Optionally, you could trigger a refresh here if needed
    },
    [addRemoteBetSlip],
  );

  const value: BetHistoryContextType = {
    betHistory,
    refreshHistory,
    addBetSlipToHistory,
  };

  return (
    <BetHistoryContext.Provider value={value}>
      {children}
    </BetHistoryContext.Provider>
  );
};
BetHistoryProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export function useBetHistoryContext() {
  const context = useContext(BetHistoryContext);
  if (context === undefined) {
    throw new Error(
      "useBetHistoryContext must be used within a BetHistoryProvider",
    );
  }
  return context;
}
