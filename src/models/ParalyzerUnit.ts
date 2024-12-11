import { ActionType } from '../types/types';
import Unit from './Unit';

class ParalyzerUnit extends Unit {
  getActionType(): ActionType {
    return 'paralyze';
  }
}

export default ParalyzerUnit;
