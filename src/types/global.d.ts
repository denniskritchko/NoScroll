declare global {
  const chrome: {
    storage: {
      sync: {
        get: (keys: string | string[] | object | null, callback: (result: any) => void) => void;
        set: (items: object, callback?: () => void) => void;
      };
    };
    alarms: {
      create: (name: string, alarmInfo: { periodInMinutes?: number; delayInMinutes?: number }) => void;
      onAlarm: {
        addListener: (callback: (alarm: { name: string }) => void) => void;
      };
    };
    runtime: {
      onInstalled: {
        addListener: (callback: () => void) => void;
      };
      getURL: (path: string) => string;
    };
    system: {
      display: {
        getInfo: (callback: (displays: Array<{ isPrimary: boolean; workArea: { width: number; height: number } }>) => void) => void;
      };
    };
    windows: {
      create: (createData: {
        url: string;
        type: string;
        width: number;
        height: number;
        top: number;
        left: number;
      }) => void;
    };
  };
}

export {}; 