import { createContext, useContext, useEffect, useState } from 'react';
import { OnboardingAccount } from './accountAiInfo';
import { OnboardingCreditCard } from './creditCardAiInfo';

export interface OnboardingData {
  accounts: OnboardingAccount[];
  creditCards: OnboardingCreditCard[];
}

interface OnboardingContextValue {
  data: OnboardingData;
  update: (partial: Partial<OnboardingData>) => void;
}

const STORAGE_KEY = 'onboarding-data';

const OnboardingContext = createContext<OnboardingContextValue>({
  data: { accounts: [], creditCards: [] },
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  update: () => {},
});

export const OnboardingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<OnboardingData>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : { accounts: [], creditCards: [] };
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [data]);

  const update = (partial: Partial<OnboardingData>) =>
    setData((prev) => ({ ...prev, ...partial }));

  return (
    <OnboardingContext.Provider value={{ data, update }}>
      {children}
    </OnboardingContext.Provider>
  );
};

export const useOnboarding = () => useContext(OnboardingContext);

