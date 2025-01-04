import { globalStyle } from '@vanilla-extract/css';

globalStyle('*', { margin: 0, padding: 0, boxSizing: 'border-box' });

globalStyle('#root', {
  maxWidth: '1280px',
  margin: '0 auto',
  textAlign: 'center',
});

globalStyle('body', {
  margin: 0,
  padding: 0,
  fontFamily: 'Inter, system-ui, Avenir, Helvetica, Arial, sans-serif',
  backgroundColor: '#f0f0f0',
  textAlign: 'center',
  display: 'flex',
  placeItems: 'center',
  minWidth: '320px',
  minHeight: '100vh',
  backgroundImage: 'url(../assets/background.png)',
  backgroundSize: 'cover',
  overflow: 'hidden',
});

globalStyle('h1', {
  color: '#333',
});
