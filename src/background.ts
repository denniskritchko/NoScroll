import { getSettings, DEFAULT_SETTINGS } from './utils/storage';

// Create alarm that triggers based on user settings
chrome.runtime.onInstalled.addListener(async () => {
  try {
    const settings = await getSettings();
    if (settings.enabled) {
      chrome.alarms.create("reminder", { periodInMinutes: settings.notificationInterval });
    }
  } catch (error) {
    console.error('Error setting up initial alarm:', error);
    // Fallback to default settings
    chrome.alarms.create("reminder", { periodInMinutes: DEFAULT_SETTINGS.notificationInterval });
  }
});

// When reminder alarm rings, check tasks in storage and create notification popup
chrome.alarms.onAlarm.addListener(async (alarm) => {
  if (alarm.name === "reminder") {
    try {
      const settings = await getSettings();
      
      // Only show notification if enabled
      if (!settings.enabled) {
        return;
      }

      chrome.storage.sync.get("tasks", function (data) {
        if (data.tasks && data.tasks.length > 0) {
          const url = chrome.runtime.getURL("notification.html");
          chrome.system.display.getInfo((displays) => {
            const primaryDisplay = displays.find(display => display.isPrimary === true) || displays[0];
            const screenWidth = primaryDisplay.workArea.width;
            const screenHeight = primaryDisplay.workArea.height;

            chrome.windows.create({
              url: url,
              type: "popup",
              width: 350,
              height: 150,
              top: 10,
              left: screenWidth - 310
            });
          });
        }
      });
    } catch (error) {
      console.error('Error handling alarm:', error);
    }
  }
}); 