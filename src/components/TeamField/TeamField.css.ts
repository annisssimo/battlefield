import { style } from '@vanilla-extract/css';

export const teamContainer = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  padding: '10px',
});
