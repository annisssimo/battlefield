import { style, styleVariants } from '@vanilla-extract/css';

export const roundInfoContainer = style({
  padding: '20px',
  backgroundColor: '#f4f4f4f4',
  borderRadius: '8px',
  width: '300px',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  textAlign: 'left',
});

export const unitList = style({
  listStyle: 'none',
  padding: 0,
  margin: 0,
});

export const unitItem = styleVariants({
  default: {
    display: 'flex',
    alignItems: 'center',
    padding: '10px',
    margin: '5px 0',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease, transform 0.3s ease',
  },
  highlighted: {
    backgroundColor: 'rgba(255, 255, 0, 0.3)',
    transform: 'scale(1.05)',
  },
  current: {
    backgroundColor: '#00ff0060',
  },
});

export const unitImage = style({
  width: '30px',
  height: '30px',
  marginRight: '10px',
  borderRadius: '4px',
});
