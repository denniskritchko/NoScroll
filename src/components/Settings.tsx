import React, { useState, useEffect } from 'react';
import { Settings as SettingsType } from '../types';
import { getSettings, updateNotificationInterval, toggleNotifications } from '../utils/storage';

interface SettingsProps {
  isOpen: boolean;
  onClose: () => void;
}

const Settings: React.FC<SettingsProps> = ({ isOpen, onClose }) => {
  const [settings, setSettings] = useState<SettingsType>({
    notificationInterval: 30,
    enabled: true,
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (isOpen) {
      loadSettings();
    }
  }, [isOpen]);

  const loadSettings = async () => {
    try {
      const loadedSettings = await getSettings();
      setSettings(loadedSettings);
    } catch (error) {
      console.error('Error loading settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleIntervalChange = async (interval: number) => {
    setSaving(true);
    try {
      await updateNotificationInterval(interval);
      setSettings(prev => ({ ...prev, notificationInterval: interval }));
    } catch (error) {
      console.error('Error updating interval:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleToggleNotifications = async (enabled: boolean) => {
    setSaving(true);
    try {
      await toggleNotifications(enabled);
      setSettings(prev => ({ ...prev, enabled }));
    } catch (error) {
      console.error('Error toggling notifications:', error);
    } finally {
      setSaving(false);
    }
  };

  const intervalOptions = [
    { value: 0.5, label: '30 seconds', color: 'bg-purple-500' },
    { value: 15, label: '15 minutes' },
    { value: 30, label: '30 minutes' },
    { value: 45, label: '45 minutes' },
    { value: 60, label: '1 hour' },
    { value: 90, label: '1.5 hours' },
    { value: 120, label: '2 hours' },
  ];

  const formatInterval = (minutes: number): string => {
    if (minutes < 1) {
      return `${minutes * 60} seconds`;
    } else if (minutes < 60) {
      return `${minutes} minutes`;
    } else if (minutes === 60) {
      return '1 hour';
    } else {
      const hours = minutes / 60;
      return `${hours} hours`;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full mx-4 animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Settings</h2>
          <button
            onClick={onClose}
            className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-4 space-y-6">
          {loading ? (
            <div className="animate-pulse space-y-4">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
              <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
            </div>
          ) : (
            <>
              {/* Notification Toggle */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white">Notifications</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Enable or disable task reminders</p>
                  </div>
                  <button
                    onClick={() => handleToggleNotifications(!settings.enabled)}
                    disabled={saving}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 ${
                      settings.enabled ? 'bg-primary-600' : 'bg-gray-200 dark:bg-gray-700'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        settings.enabled ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* Notification Interval */}
              <div className="space-y-3">
                <div>
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white">Reminder Interval</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">How often to show task reminders</p>
                </div>
                
                <div className="grid grid-cols-2 gap-2">
                  {intervalOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => handleIntervalChange(option.value)}
                      disabled={saving || !settings.enabled}
                      className={`px-3 py-2 text-sm rounded-lg border transition-all duration-200 ${
                        settings.notificationInterval === option.value
                          ? option.value === 0.5 
                            ? 'bg-purple-50 dark:bg-purple-900/30 border-purple-200 dark:border-purple-700 text-purple-700 dark:text-purple-300'
                            : 'bg-primary-50 dark:bg-primary-900/30 border-primary-200 dark:border-primary-700 text-primary-700 dark:text-primary-300'
                          : 'bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-500'
                      } ${
                        !settings.enabled ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Status */}
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3">
                <div className="flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full ${
                    settings.enabled ? 'bg-green-500' : 'bg-gray-400 dark:bg-gray-500'
                  }`} />
                  <span className="text-xs text-gray-600 dark:text-gray-300">
                    {settings.enabled 
                      ? `Reminders every ${formatInterval(settings.notificationInterval)}`
                      : 'Notifications disabled'
                    }
                  </span>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700/50 rounded-b-lg">
          <button
            onClick={onClose}
            className="w-full bg-primary-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings; 