import { style } from '@vanilla-extract/css';

export const messagesPanel = style({
  height: '100px',
  overflowY: 'scroll',
  backgroundColor: '#f4f4f8',
  padding: '10px',
  border: '1px solid #ccc',
  borderRadius: '4px',
});

export const message = style({
  marginBottom: '5px',
  fontSize: '14px',
  color: '#333',
});
