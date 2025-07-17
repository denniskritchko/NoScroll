import React, { useState, useEffect } from 'react';
import { Task } from '../types';
import { getTasks } from '../utils/storage';

const Notification: React.FC = () => {
  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(true);
  const [taskCount, setTaskCount] = useState(0);

  useEffect(() => {
    const loadHighestPriorityTask = async () => {
      try {
        const tasks = await getTasks();
        const pendingTasks = tasks.filter(t => !t.completed);
        setTaskCount(pendingTasks.length);
        
        if (pendingTasks.length > 0) {
          // Sort by priority (highest first) and then by creation time (oldest first)
          const sortedTasks = pendingTasks.sort((a, b) => {
            if (b.priority !== a.priority) {
              return b.priority - a.priority;
            }
            return a.createdAt - b.createdAt;
          });
          setTask(sortedTasks[0]);
        } else {
          setTask(null);
        }
      } catch (error) {
        console.error('Error loading tasks:', error);
        setTask(null);
      } finally {
        setLoading(false);
      }
    };

    loadHighestPriorityTask();
  }, []);

  const priorityColors = {
    1: 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 border-green-200 dark:border-green-800',
    2: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 border-yellow-200 dark:border-yellow-800',
    3: 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 border-red-200 dark:border-red-800',
  };

  const priorityLabels = {
    1: 'Low',
    2: 'Medium',
    3: 'High',
  };

  const priorityIcons = {
    1: '🟢',
    2: '🟡',
    3: '🔴',
  };

  if (loading) {
    return (
      <div className="w-full h-full bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 shadow-2xl border border-gray-200 dark:border-gray-700 p-6">
        <div className="animate-pulse space-y-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
            <div className="space-y-2">
              <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-32"></div>
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
            </div>
          </div>
          <div className="h-16 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
          <div className="flex justify-between items-center">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!task) {
    return (
      <div className="w-full h-full bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="p-6 h-full flex flex-col">
          {/* Header */}
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">All Caught Up!</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">No pending tasks</p>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 p-4 flex items-center justify-center">
            <div className="text-center">
              <div className="text-4xl mb-2">🎉</div>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Great job! You've completed all your tasks.
              </p>
            </div>
          </div>

          {/* Action Button */}
          <div className="mt-4 flex justify-end">
            <button
              onClick={() => window.close()}
              className="px-6 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white text-sm font-medium rounded-lg hover:from-green-600 hover:to-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-all duration-200"
            >
              Awesome!
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div className="p-6 h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full flex items-center justify-center animate-bounce-gentle">
            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Time to Focus!</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {taskCount} task{taskCount !== 1 ? 's' : ''} remaining
            </p>
          </div>
          <div className="text-2xl">
            {priorityIcons[task.priority as keyof typeof priorityIcons]}
          </div>
        </div>

        {/* Task Content */}
        <div className="flex-1 bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 p-4">
          <div className="flex items-start space-x-3">
            <div className="flex-1">
              <p className="text-sm text-gray-700 dark:text-gray-200 leading-relaxed mb-2">
                {task.text}
              </p>
              <div className="flex items-center space-x-2">
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${priorityColors[task.priority as keyof typeof priorityColors]}`}>
                  {priorityLabels[task.priority as keyof typeof priorityLabels]} Priority
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  Created {new Date(task.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-4 flex justify-between items-center">
          <span className="text-xs text-gray-500 dark:text-gray-400">
            Next reminder in 30 minutes
          </span>
          <div className="flex space-x-2">
            <button
              onClick={() => window.close()}
              className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm font-medium rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-all duration-200"
            >
              Later
            </button>
            <button
              onClick={() => window.close()}
              className="px-6 py-2 bg-gradient-to-r from-primary-500 to-primary-600 text-white text-sm font-medium rounded-lg hover:from-primary-600 hover:to-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-all duration-200"
            >
              Got it!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notification; 