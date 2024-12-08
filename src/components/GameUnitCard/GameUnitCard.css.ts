import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

export const unitState = recipe({
  base: {
    cursor: 'pointer',
    border: '1px solid #000',
    margin: '5px 30px',
    padding: '4px',
    borderRadius: '4px',
    transition:
      'background-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease',
  },
  variants: {
    isDefending: {
      true: {
        backgroundColor: 'lightblue',
        border: '2px solid blue',
      },
      false: {},
    },
    isHighlighted: {
      true: {
        boxShadow: '0 0 15px 5px rgba(255, 215, 0, 0.9)',
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
        backgroundColor: '#ffa21f',
      },
    },
  },
});

export const unitFigure = style({
  display: 'flex',
  alignItems: 'center',
});

export const unitImage = style({
  width: '100px',
  height: 'auto',
  borderRadius: '3px',
  marginRight: '10px',
});

export const unitCaption = style({
  textAlign: 'left',
});

export const hp = style({
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
  position: 'relative',
});

export const heartIcon = style({
  color: '#db0000',
  fontSize: '24px',
});

export const healthPoints = style({
  position: 'absolute',
  top: '3px',
  left: '4px',
  color: 'white',
  fontSize: '12px',
});
