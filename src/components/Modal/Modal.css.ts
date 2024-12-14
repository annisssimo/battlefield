import { style } from '@vanilla-extract/css';

export const modalOverlay = style({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  background: 'rgba(0, 0, 0, 0.85)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1000,
  backdropFilter: 'blur(5px)',
});

export const modalContent = style({
  background: 'linear-gradient(135deg, #1e293b, #0f172a)',
  padding: '30px',
  borderRadius: '16px',
  textAlign: 'center',
  boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.9)',
  color: '#f8fafc',
  textTransform: 'uppercase',
});

export const restartButton = style({
  marginTop: '20px',
  padding: '12px 24px',
  backgroundColor: '#16a34a',
  color: '#f8fafc',
  border: '2px solid #facc15',
  borderRadius: '12px',
  cursor: 'pointer',
  fontFamily: '"Press Start 2P", cursive',
  letterSpacing: '1px',
  textShadow: '0px 0px 5px #000',
  transition: 'all 0.3s ease',
  ':hover': {
    backgroundColor: '#22c55e',
    transform: 'scale(1.1)',
    boxShadow: '0px 0px 15px #16a34a',
  },
});
