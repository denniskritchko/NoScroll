document.addEventListener("DOMContentLoaded", function() {
    const taskInput = document.getElementById("taskInput");
    const taskButton = document.getElementById("addTask");
    const taskList = document.getElementById("taskList");

    const style = document.createElement("style");
    style.textContent = `
        li {
            display: flex;
            align-items: flex-start;
            width: 230px;
        }
        .task-content {
            flex: 1;
            white-space: pre-wrap;
            word-wrap: break-word;
            padding-left: 15px;
        }
        .delete {
            flex-shrink: 0;
            padding-right: 5px;
            width: 15px;
        }
    `;

    document.head.appendChild(style);
    
    chrome.storage.sync.get("tasks", function (data) {
        if (data.tasks){
            data.tasks.forEach(task => addTaskToDOM(task));
        }
    });

    taskButton.addEventListener("click", function() {
        const task = taskInput.value.trim();
        if (task) {
            chrome.storage.sync.get("tasks", function(data) {
                let tasks = data.tasks || [];
                tasks.push(task);
                chrome.storage.sync.set({"tasks": tasks});
                addTaskToDOM(task);
                taskInput.value = "";
            });
        }
    });

    function addTaskToDOM(task) {
        const li = document.createElement("li");
        const maxLength = 25;
        
        const deleteButton = document.createElement("span");

        deleteButton.textContent = "X";
        deleteButton.className = "delete";
        deleteButton.addEventListener("click", function() {
            deleteTask(task, li);
        });

        const taskContent = document.createElement("span");
        taskContent.className = "task-content";
        const formattedText = splitIntoParagraphs(task, maxLength);
        taskContent.innerHTML = formattedText.split('\n').join('<br>');

        li.appendChild(deleteButton);
        li.appendChild(taskContent);
        taskList.appendChild(li);
    }

    function deleteTask(task, taskElement) {
        chrome.storage.sync.get("tasks", function(data) {
            const tasks = data.tasks || [];
            const updatedTasks = tasks.filter(t => t !== task);
            chrome.storage.sync.set({"tasks": updatedTasks}, function() {
                taskList.removeChild(taskElement);
            });
        });
    }

    function splitIntoParagraphs(text, maxLength) {
        if (text.length <= maxLength) { return text; }

        const words = text.split(' ');
        let currentLine = "";
        let result = [];

        for (const word of words){
            if (word.length > maxLength) {
                if (currentLine.length > 0) {
                    result.push(currentLine.trim());
                }

                for (let i = 0; i < word.length; i += maxLength){
                    result.push(word.substr(i, maxLength));
                }
                currentLine = "";
                continue;
            }

            if ((currentLine + " " + word).trim().length > maxLength) {
                result.push(currentLine.trim());
                currentLine = word;
            } else {
                currentLine += (currentLine.length > 0 ? " " : "") + word;  
            }
        }
        if (currentLine.length > 0) {
            result.push(currentLine.trim());
        }
        return result.join('\n');
    }
});
