import { GiCrossedSwords, GiPotionBall } from 'react-icons/gi';
import { MdHealthAndSafety } from 'react-icons/md';

import * as style from './ActionIcon.css';
import { GeneralActionType } from '../../types/types';

const ActionIcon = ({ showActionIcon, actionType }: ActionIconProps) => {
  if (!showActionIcon) return null;

  switch (actionType) {
    case 'attack':
      return <GiCrossedSwords className={style.actionIcon} />;
    case 'heal':
      return <MdHealthAndSafety className={style.actionIcon} />;
    case 'paralyze':
      return <GiPotionBall className={style.actionIcon} />;
    default:
      return null;
  }
};

export default ActionIcon;

interface ActionIconProps {
  showActionIcon: boolean;
  actionType: GeneralActionType;
}
