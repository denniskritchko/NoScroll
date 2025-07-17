import { Task, ChromeStorageData, Settings } from '../types';

export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

// Default settings
export const DEFAULT_SETTINGS: Settings = {
  notificationInterval: 30,
  enabled: true,
};

export const getTasks = (): Promise<Task[]> => {
  return new Promise((resolve) => {
    chrome.storage.sync.get('tasks', (data: ChromeStorageData) => {
      resolve(data.tasks || []);
    });
  });
};

export const saveTasks = (tasks: Task[]): Promise<void> => {
  return new Promise((resolve) => {
    chrome.storage.sync.set({ tasks }, resolve);
  });
};

export const getSettings = (): Promise<Settings> => {
  return new Promise((resolve) => {
    chrome.storage.sync.get('settings', (data: ChromeStorageData) => {
      resolve(data.settings || DEFAULT_SETTINGS);
    });
  });
};

export const saveSettings = (settings: Settings): Promise<void> => {
  return new Promise((resolve) => {
    chrome.storage.sync.set({ settings }, resolve);
  });
};

export const updateNotificationInterval = async (interval: number): Promise<void> => {
  const settings = await getSettings();
  const updatedSettings = { ...settings, notificationInterval: interval };
  await saveSettings(updatedSettings);
  
  // Update the alarm with the new interval
  chrome.alarms.clear("reminder");
  if (updatedSettings.enabled) {
    // Chrome Alarms API requires minimum 1 minute, so we'll use delayInMinutes for sub-minute intervals
    if (interval < 1) {
      chrome.alarms.create("reminder", { delayInMinutes: interval });
    } else {
      chrome.alarms.create("reminder", { periodInMinutes: interval });
    }
  }
};

export const toggleNotifications = async (enabled: boolean): Promise<void> => {
  const settings = await getSettings();
  const updatedSettings = { ...settings, enabled };
  await saveSettings(updatedSettings);
  
  if (enabled) {
    if (settings.notificationInterval < 1) {
      chrome.alarms.create("reminder", { delayInMinutes: settings.notificationInterval });
    } else {
      chrome.alarms.create("reminder", { periodInMinutes: settings.notificationInterval });
    }
  } else {
    chrome.alarms.clear("reminder");
  }
};

export const addTask = async (taskText: string, priority: number = 1): Promise<Task> => {
  const tasks = await getTasks();
  const newTask: Task = {
    id: generateId(),
    text: taskText.trim(),
    priority,
    createdAt: Date.now(),
    completed: false,
  };
  
  const updatedTasks = [...tasks, newTask];
  await saveTasks(updatedTasks);
  return newTask;
};

export const deleteTask = async (taskId: string): Promise<void> => {
  const tasks = await getTasks();
  const updatedTasks = tasks.filter(task => task.id !== taskId);
  await saveTasks(updatedTasks);
};

export const toggleTaskComplete = async (taskId: string): Promise<void> => {
  const tasks = await getTasks();
  const updatedTasks = tasks.map(task =>
    task.id === taskId ? { ...task, completed: !task.completed } : task
  );
  await saveTasks(updatedTasks);
};

export const updateTaskPriority = async (taskId: string, priority: number): Promise<void> => {
  const tasks = await getTasks();
  const updatedTasks = tasks.map(task =>
    task.id === taskId ? { ...task, priority } : task
  );
  await saveTasks(updatedTasks);
};

export const clearAllTasks = async (): Promise<void> => {
  await saveTasks([]);
}; 