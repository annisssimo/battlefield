import Battlefield from './components/Battlefield/Battlefield';
import { CurrentUnitProvider } from './context/CurrentUnitContext.tsx';
import './global.css.ts';

function App() {
  return (
    <>
      <CurrentUnitProvider>
        <Battlefield />
      </CurrentUnitProvider>
    </>
  );
}

export default App;
