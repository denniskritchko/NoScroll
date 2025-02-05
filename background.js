chrome.runtime.onInstalled.addListener(() => {
    chrome.alarms.create("reminder", { periodInMinutes: 0.5 });
});

chrome.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name === "reminder") {
        chrome.storage.sync.get("tasks", function (data) {
            if (data.tasks && data.tasks.length > 0) {
                const url = chrome.runtime.getURL("notifications.html");
                window.open(url, "Reminder", "width=300,height=150,top=10,right=10");
                
            }
        });
    }
});