import { style } from '@vanilla-extract/css';

export const actionIcon = style({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  fontSize: '70px',
  color: 'rgba(255, 255, 255, 0.7)',
  pointerEvents: 'none',
  zIndex: '10',
});
