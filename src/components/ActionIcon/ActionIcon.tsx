import { GiCrossedSwords, GiPotionBall } from 'react-icons/gi';
import { MdHealthAndSafety } from 'react-icons/md';

import * as style from './ActionIcon.css';
import { GeneralActionType } from '../../shared/types/types';

const ActionIcon = ({ actionType }: ActionIconProps) => {
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
  actionType: GeneralActionType;
}
