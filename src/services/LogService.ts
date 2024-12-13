class LogService {
  private static listeners: ((message: string) => void)[] = [];

  static subscribe(listener: (message: string) => void) {
    LogService.listeners.push(listener);
  }

  static unsubscribe(listener: (message: string) => void) {
    LogService.listeners = LogService.listeners.filter((l) => l !== listener);
  }

  static log(message: string) {
    LogService.listeners.forEach((listener) => listener(message));
  }
}

export default LogService;
