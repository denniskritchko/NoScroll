import { Task, ChromeStorageData } from '../types';

export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
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