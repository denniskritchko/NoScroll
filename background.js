chrome.runtime.onInstalled.addListener(() => {
    chrome.alarms.create("reminder", {periodInMinutes: 30});
});

chrome.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name == "reminder") {
        chrome.storage.sync.get("tasks", function (data) {
            if (data.tasks && data.tasks.length > 0) {
                chrome.notifications.create({
                    type: "basic",
                    iconUrl: "icon.png",
                    title: "To-Do Reminder",
                    message: "Don't forget you tasks! " + data.tasks.join(", "),
                    priority: 2    
                });
            }
        });
    }
});