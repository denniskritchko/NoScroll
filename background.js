chrome.runtime.onInstalled.addListener(() => {
    chrome.alarms.create("reminder", { periodInMinutes: 0.1 });
});

chrome.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name === "reminder") {
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
    }
});