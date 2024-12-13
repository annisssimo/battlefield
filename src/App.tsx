import { ToastContainer } from 'react-toastify';
import Battlefield from './components/Battlefield/Battlefield';
import { CurrentUnitProvider } from './context/CurrentUnitContext.tsx';
import './global.css.ts';

function App() {
  return (
    <>
      <CurrentUnitProvider>
        <Battlefield />
        <ToastContainer
          position="top-left"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          draggable
          pauseOnHover
          theme="light"
        />
      </CurrentUnitProvider>
    </>
  );
}

export default App;
