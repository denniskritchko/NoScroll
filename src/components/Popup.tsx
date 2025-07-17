import React, { useState, useEffect } from 'react';
import { Task } from '../types';
import { getTasks, clearAllTasks } from '../utils/storage';
import TaskForm from './TaskForm';
import TaskItem from './TaskItem';

const Popup: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCompleted, setShowCompleted] = useState(false);

  const loadTasks = async () => {
    try {
      const loadedTasks = await getTasks();
      setTasks(loadedTasks);
    } catch (error) {
      console.error('Error loading tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handleClearAll = async () => {
    if (window.confirm('Are you sure you want to clear all tasks?')) {
      await clearAllTasks();
      setTasks([]);
    }
  };

  const filteredTasks = showCompleted 
    ? tasks 
    : tasks.filter(task => !task.completed);

  const completedCount = tasks.filter(task => task.completed).length;
  const pendingCount = tasks.filter(task => !task.completed).length;

  if (loading) {
    return (
      <div className="min-h-[500px] bg-gradient-to-br from-gray-50 to-gray-100 p-4">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded-lg w-3/4"></div>
          <div className="h-32 bg-gray-200 rounded-lg"></div>
          <div className="h-20 bg-gray-200 rounded-lg"></div>
          <div className="h-20 bg-gray-200 rounded-lg"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[500px] bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-accent-500 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <div>
              <h1 className="text-lg font-semibold text-gray-900">NoScroll</h1>
              <p className="text-xs text-gray-500">Stay focused, stay productive</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowCompleted(!showCompleted)}
              className={`px-2 py-1 text-xs rounded-full transition-colors ${
                showCompleted 
                  ? 'bg-primary-100 text-primary-700' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {showCompleted ? 'Hide' : 'Show'} Completed
            </button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="px-4 py-3 bg-white border-b border-gray-200">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-4">
            <span className="text-gray-600">
              <span className="font-medium text-primary-600">{pendingCount}</span> pending
            </span>
            <span className="text-gray-600">
              <span className="font-medium text-green-600">{completedCount}</span> completed
            </span>
          </div>
          {tasks.length > 0 && (
            <button
              onClick={handleClearAll}
              className="text-xs text-red-600 hover:text-red-700 hover:bg-red-50 px-2 py-1 rounded transition-colors"
            >
              Clear All
            </button>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-4">
        {/* Task Form */}
        <TaskForm onTaskAdded={loadTasks} />

        {/* Task List */}
        <div className="space-y-2">
          {filteredTasks.length === 0 ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {tasks.length === 0 ? 'No tasks yet' : 'No tasks to show'}
              </h3>
              <p className="text-gray-500 text-sm">
                {tasks.length === 0 
                  ? 'Add your first task to get started!' 
                  : showCompleted 
                    ? 'No completed tasks yet' 
                    : 'All tasks completed! 🎉'
                }
              </p>
            </div>
          ) : (
            filteredTasks
              .sort((a, b) => b.priority - a.priority || a.createdAt - b.createdAt)
              .map((task) => (
                <TaskItem key={task.id} task={task} onUpdate={loadTasks} />
              ))
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="px-4 py-3 bg-white border-t border-gray-200">
        <p className="text-xs text-gray-500 text-center">
          Reminders every 30 minutes • Stay focused!
        </p>
      </div>
    </div>
  );
};

export default Popup; 