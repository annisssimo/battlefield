import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

export const unitState = recipe({
  base: {
    position: 'relative',
    cursor: 'pointer',
    border: '1px solid #000',
    margin: '5px 30px',
    padding: '4px',
    borderRadius: '4px',
    transition:
      'background-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease',
  },
  variants: {
    isHighlighted: {
      true: {
        boxShadow: '0 0 15px 5px rgba(255, 215, 0, 0.9)',
      },
    },
    isCurrent: {
      true: {
        boxShadow: '0 0 40px lime',
      },
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
    isDying: {
      true: {
        filter: 'grayscale(0.3) brightness(0.9)',
      },
    },
    isDead: {
      true: {
        filter: 'grayscale(1) brightness(0.7)',
      },
    },
    isPossibleTarget: {
      true: {
        border: '3px solid red',
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

export const heartIcon = recipe({
  base: {
    color: '#db0000',
    fontSize: '24px',
  },
  variants: {
    isDefending: {
      true: {
        color: '#007bff',
      },
      false: {},
    },
  },
});

export const healthPoints = style({
  position: 'absolute',
  top: '3px',
  left: '4px',
  color: 'white',
  fontSize: '12px',
});

export const defendButton = recipe({
  base: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: 'gray',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease, transform 0.2s ease',
    ':hover': {
      color: '#007bff',
    },
  },
  variants: {
    isDefending: {
      true: {
        color: '#007bff',
      },
      false: {},
    },
  },
});
