document.addEventListener("DOMContentLoaded", () => {
    function formatText(text, maxCharsPerLine) {
        if (!text) return text;
        
        const words = text.split(/(\s+)/);
        let currentLine = "";
        let result = [];
        
        for (let i = 0; i < words.length; i++) {
            const word = words[i];
            
            if ((currentLine + word).length > maxCharsPerLine) {
                if (currentLine) {
                    result.push(currentLine.trimEnd());
                    currentLine = "";
                }
                if (word.trim().length > maxCharsPerLine) {
                    for (let j = 0; j < word.length; j += maxCharsPerLine) {
                        result.push(word.substr(j, maxCharsPerLine));
                    }
                } else {
                    currentLine = word;
                }
            } else {
                currentLine += word;
            }
        }
        
        if (currentLine) {
            result.push(currentLine.trimEnd());
        }
        
        return result.join('\n');
    }

    chrome.storage.sync.get("tasks", function (data) {
        const tasks = data.tasks && data.tasks.length > 0 ? data.tasks[0] : "No tasks";
        const formattedTasks = formatText(tasks, 32); // Adjusted to 32 characters per line
        const tasksElement = document.getElementById("tasks");
        tasksElement.textContent = formattedTasks;
    });
});