class Logger {
  private app_name: string;
  private debug_mode = true;

  constructor(name: string) {
    this.app_name = name;
  }

  private log = (log_type: string, message: string, value: unknown = undefined) => {
    let log_row = ` ${this.app_name} | ${log_type} | ${message}`;
    if (value) {
      log_row += ` | ${JSON.stringify(value)}`;
    }
    console.log(log_row);
  };

  setDebugMode(mode: boolean) {
    this.debug_mode = mode;
  }

  debug = (message: string, value: unknown = undefined)  => {
    if (this.debug_mode === true) {
      this.log("DEBUG ", message, value);
    }
  };

  notice = (message: string, value: unknown = undefined)  => {
    this.log("NOTICE", message, value);
  };

  warning = (message: string, value: unknown = undefined)  => {
    this.log("WARN  ", message, value);
  };

  error = (message: string, value: unknown = undefined)  => {
    this.log("ERROR ", message, value);
  };
}

export const AppLogger = new Logger("MOVIES API");
