import { createContext, useContext, useState, ReactNode } from 'react';

interface HintContextType {
  hintsVisible: boolean;
  toggleHints: () => void;
}

const HintContext = createContext<HintContextType | undefined>(undefined);

export function HintProvider({ children }: { children: ReactNode }) {
  const [hintsVisible, setHintsVisible] = useState(false);

  const toggleHints = () => {
    setHintsVisible(!hintsVisible);
  };

  return (
    <HintContext.Provider value={{ hintsVisible, toggleHints }}>
      {children}
    </HintContext.Provider>
  );
}

export function useHints() {
  const context = useContext(HintContext);
  if (context === undefined) {
    throw new Error('useHints must be used within a HintProvider');
  }
  return context;
}
