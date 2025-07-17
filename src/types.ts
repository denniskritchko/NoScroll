export interface Task {
  id: string;
  text: string;
  priority: number;
  createdAt: number;
  completed: boolean;
}

export interface TaskFormData {
  text: string;
  priority: number;
}

export interface ChromeStorageData {
  tasks?: Task[];
  settings?: Settings;
}

export interface Settings {
  notificationInterval: number; // in minutes
  enabled: boolean;
} 