import { useContext } from 'react';
import CurrentUnitContext from '../context/CurrentUnitContext';

export const useCurrentUnit = () => {
  const context = useContext(CurrentUnitContext);
  if (!context) {
    throw new Error('useCurrentUnit must be used within a CurrentUnitProvider');
  }
  return context;
};
