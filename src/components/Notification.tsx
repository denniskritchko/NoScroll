import React, { useState, useEffect } from 'react';
import { getTasks } from '../utils/storage';

const Notification: React.FC = () => {
  const [task, setTask] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadHighestPriorityTask = async () => {
      try {
        const tasks = await getTasks();
        const pendingTasks = tasks.filter(t => !t.completed);
        if (pendingTasks.length > 0) {
          // Sort by priority (highest first) and then by creation time (oldest first)
          const sortedTasks = pendingTasks.sort((a, b) => {
            if (b.priority !== a.priority) {
              return b.priority - a.priority;
            }
            return a.createdAt - b.createdAt;
          });
          setTask(sortedTasks[0].text);
        } else {
          setTask('No pending tasks');
        }
      } catch (error) {
        console.error('Error loading tasks:', error);
        setTask('Error loading tasks');
      } finally {
        setLoading(false);
      }
    };

    loadHighestPriorityTask();
  }, []);

  if (loading) {
    return (
      <div className="w-[350px] h-[150px] bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-4">
        <div className="animate-pulse space-y-3">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
          </div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-[350px] h-[150px] bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div className="p-4 h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center space-x-3 mb-3">
          <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full flex items-center justify-center animate-bounce-gentle">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Time to Focus!</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">Your highest priority task awaits</p>
          </div>
        </div>

        {/* Task Content */}
        <div className="flex-1 bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 p-3">
          <p className="text-sm text-gray-700 dark:text-gray-200 leading-relaxed line-clamp-3">
            {task}
          </p>
        </div>

        {/* Action Button */}
        <div className="mt-3 flex justify-end">
          <button
            onClick={() => window.close()}
            className="px-4 py-2 bg-gradient-to-r from-primary-500 to-primary-600 text-white text-sm font-medium rounded-lg hover:from-primary-600 hover:to-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-all duration-200"
          >
            Got it!
          </button>
        </div>
      </div>
    </div>
  );
};

export default Notification; 