import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

export const unitState = recipe({
  base: {
    cursor: 'pointer',
    border: '1px solid #000',
    margin: '5px 30px',
    padding: '4px',
    borderRadius: '4px',
  },
  variants: {
    isDefending: {
      true: {
        backgroundColor: 'lightblue',
        border: '2px solid blue',
      },
      false: {},
    },
    color: {
      red: {
        border: '2px solid black',
        backgroundColor: '#ff9c9c',
      },
      orange: {
        border: '2px solid black',
        backgroundColor: '#ffd478',
      },
    },
  },
});

export const unitImage = style({
  width: '100px',
  height: 'auto',
  borderRadius: '3px',
});
