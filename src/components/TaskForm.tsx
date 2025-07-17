import React, { useState } from 'react';
import { addTask } from '../utils/storage';

interface TaskFormProps {
  onTaskAdded: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onTaskAdded }) => {
  const [taskText, setTaskText] = useState('');
  const [priority, setPriority] = useState(2);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskText.trim() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      await addTask(taskText, priority);
      setTaskText('');
      setPriority(2);
      onTaskAdded();
    } catch (error) {
      console.error('Error adding task:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const priorityOptions = [
    { value: 1, label: 'Low', color: 'bg-green-500' },
    { value: 2, label: 'Medium', color: 'bg-yellow-500' },
    { value: 3, label: 'High', color: 'bg-red-500' },
  ];

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 mb-4 shadow-sm">
      <div className="space-y-3">
        {/* Task Input */}
        <div>
          <textarea
            value={taskText}
            onChange={(e) => setTaskText(e.target.value)}
            placeholder="What do you need to accomplish?"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
            rows={2}
            disabled={isSubmitting}
          />
        </div>

        {/* Priority Selection */}
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Priority:</label>
          <div className="flex space-x-2">
            {priorityOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => setPriority(option.value)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 ${
                  priority === option.value
                    ? `${option.color} text-white shadow-md`
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={!taskText.trim() || isSubmitting}
          className="w-full bg-gradient-to-r from-primary-500 to-primary-600 text-white py-2 px-4 rounded-lg font-medium hover:from-primary-600 hover:to-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
        >
          {isSubmitting ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Adding...</span>
            </div>
          ) : (
            'Add Task'
          )}
        </button>
      </div>
    </form>
  );
};

export default TaskForm; 