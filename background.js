chrome.runtime.onInstalled.addListener(() => {
    chrome.alarms.create("reminder", { periodInMinutes: 0.5 });
});

chrome.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name === "reminder") {
        chrome.storage.sync.get("tasks", function (data) {
            if (data.tasks && data.tasks.length > 0) {
                const url = chrome.runtime.getURL("notifications.html");
                chrome.windows.create({
                    url: url,
                    type: "popup",
                    width: 300,
                    height: 150,
                    top: 10,
                    left: screen.availWidth - 310
                })

            }
        });
    }
});