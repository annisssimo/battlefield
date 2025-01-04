import { createContext, useState, ReactNode } from 'react';
import Unit from '../../units/models/Unit';

const CurrentUnitContext = createContext<CurrentUnitContextType | undefined>(
  undefined
);

export const CurrentUnitProvider = ({ children }: CurrentUnitProviderProps) => {
  const [currentUnit, setCurrentUnit] = useState<Unit | null>(null);

  return (
    <CurrentUnitContext.Provider value={{ currentUnit, setCurrentUnit }}>
      {children}
    </CurrentUnitContext.Provider>
  );
};

interface CurrentUnitProviderProps {
  children: ReactNode;
}

interface CurrentUnitContextType {
  currentUnit: Unit | null;
  setCurrentUnit: (unit: Unit | null) => void;
}

export default CurrentUnitContext;
