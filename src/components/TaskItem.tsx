import React from 'react';
import { Task } from '../types';
import { deleteTask, toggleTaskComplete, updateTaskPriority } from '../utils/storage';

interface TaskItemProps {
  task: Task;
  onUpdate: () => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onUpdate }) => {
  const handleDelete = async () => {
    await deleteTask(task.id);
    onUpdate();
  };

  const handleToggle = async () => {
    await toggleTaskComplete(task.id);
    onUpdate();
  };

  const handlePriorityChange = async (priority: number) => {
    await updateTaskPriority(task.id, priority);
    onUpdate();
  };

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

  return (
    <div className={`group relative bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 mb-3 shadow-sm hover:shadow-md transition-all duration-200 ${
      task.completed ? 'opacity-60' : ''
    }`}>
      <div className="flex items-start space-x-3">
        {/* Checkbox */}
        <button
          onClick={handleToggle}
          className={`flex-shrink-0 w-5 h-5 rounded-full border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 ${
            task.completed
              ? 'bg-primary-500 border-primary-500'
              : 'border-gray-300 dark:border-gray-600 hover:border-primary-400 dark:hover:border-primary-500'
          }`}
        >
          {task.completed && (
            <svg className="w-3 h-3 text-white mx-auto" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          )}
        </button>

        {/* Task Content */}
        <div className="flex-1 min-w-0">
          <p className={`text-sm leading-relaxed ${
            task.completed ? 'line-through text-gray-500 dark:text-gray-400' : 'text-gray-900 dark:text-white'
          }`}>
            {task.text}
          </p>
          
          {/* Priority Badge */}
          <div className="flex items-center mt-2 space-x-2">
            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${priorityColors[task.priority as keyof typeof priorityColors]}`}>
              {priorityLabels[task.priority as keyof typeof priorityLabels]}
            </span>
            
            {/* Priority Controls */}
            <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              {[1, 2, 3].map((priority) => (
                <button
                  key={priority}
                  onClick={() => handlePriorityChange(priority)}
                  className={`w-2 h-2 rounded-full transition-all duration-200 ${
                    task.priority === priority
                      ? 'bg-current'
                      : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
                  }`}
                  style={{ backgroundColor: priority === 1 ? '#10b981' : priority === 2 ? '#f59e0b' : '#ef4444' }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Delete Button */}
        <button
          onClick={handleDelete}
          className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-all duration-200 p-1 text-gray-400 dark:text-gray-500 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default TaskItem; 