"use client";

import PropTypes from "prop-types";
import {
  createContext,
  useContext,
  useCallback,
  useState,
  ReactNode,
} from "react";

interface UserProfile {
  username: string;
  email: string;
  balance: number;
  depositHistory: { amount: number; date: string }[];
  betHistory: string[]; // Array of betslip IDs
}

interface UserContextType {
  user: UserProfile | null;
  updateUser: (profile: Partial<UserProfile>) => Promise<void>;
  addDeposit: (amount: number) => Promise<void>;
  addBetSlipToHistory: (betslipId: string) => Promise<void>;
}

const defaultUser: UserProfile = {
  username: "Demo",
  email: "demo@email.com",
  balance: 1000,
  depositHistory: [],
  betHistory: [],
};

export const UserContext = createContext<UserContextType | undefined>(
  undefined,
);

interface UserProviderProps {
  children: ReactNode;
}
export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(defaultUser);

  const updateUser = useCallback(
    async (profile: Partial<UserProfile>) => {
      const nextUser: UserProfile = {
        username: profile.username ?? user?.username ?? "",
        email: profile.email ?? user?.email ?? "",
        balance: profile.balance ?? user?.balance ?? 0,
        depositHistory: profile.depositHistory ?? user?.depositHistory ?? [],
        betHistory: profile.betHistory ?? user?.betHistory ?? [],
      };
      setUser(nextUser);
    },
    [user],
  );

  const addDeposit = useCallback(
    async (amount: number) => {
      const deposit = { amount, date: new Date().toISOString() };
      const nextUser: UserProfile = {
        username: user?.username ?? "",
        email: user?.email ?? "",
        balance: (user?.balance || 0) + amount,
        depositHistory: [...(user?.depositHistory || []), deposit],
        betHistory: user?.betHistory ?? [],
      };
      setUser(nextUser);
    },
    [user],
  );

  const addBetSlipToHistory = useCallback(
    async (betslipId: string) => {
      const nextUser: UserProfile = {
        username: user?.username ?? "",
        email: user?.email ?? "",
        balance: user?.balance ?? 0,
        depositHistory: user?.depositHistory ?? [],
        betHistory: [...(user?.betHistory || []), betslipId],
      };
      setUser(nextUser);
    },
    [user],
  );

  const value: UserContextType = {
    user,
    updateUser,
    addDeposit,
    addBetSlipToHistory,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUserContext must be used within a UserProvider.");
  }
  return context;
};
