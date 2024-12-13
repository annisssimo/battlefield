import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class LogService {
  static log(message: string) {
    toast(message);
  }

  static info(message: string, delay = 3000) {
    setTimeout(() => {
      toast.info(message, {
        autoClose: 10000,
      });
    }, delay);
  }
}

export default LogService;
