// function to load DOM content into popup.html
document.addEventListener("DOMContentLoaded", function() {
    const taskInput = document.getElementById("taskInput");
    const taskButton = document.getElementById("addTask");
    const taskList = document.getElementById("taskList");

    // style for task list
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

    // add style to head
    document.head.appendChild(style);
    
    // sync storage from sessions
    chrome.storage.sync.get("tasks", function (data) {
        if (data.tasks){
            data.tasks.forEach(task => addTaskToDOM(task));
        }
    });

    // add functionality from add button
    taskButton.addEventListener("click", function() {
    taskInput.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            taskButton.click();
        }
    });
        const task = taskInput.value.trim();
        if (task) {
            chrome.storage.sync.get("tasks", function(data) {
                let tasks = data.tasks || [];
                tasks.push(task);
                chrome.storage.sync.set({"tasks": tasks});
                addTaskToDOM(task);
                taskInput.value = "";
                const audio = document.getElementById("addsound");
                audio.play().catch(error => console.error("Error playing audio: ", error));
            });
        }
    });

    // push task onto DOM and create elements for deletion
    function addTaskToDOM(task) {
        const li = document.createElement("li");
        const maxLength = 25;
        
        const deleteButton = document.createElement("span");

        deleteButton.textContent = "X";
        deleteButton.className = "delete";
        deleteButton.addEventListener("click", function() {
            const audio = document.getElementById("deletesound");
            audio.play().catch(error => console.error("Error playing audio: ", error));
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

    // delete task from DOM and storage
    function deleteTask(task, taskElement) {
        chrome.storage.sync.get("tasks", function(data) {
            const tasks = data.tasks || [];
            const updatedTasks = tasks.filter(t => t !== task);
            chrome.storage.sync.set({"tasks": updatedTasks}, function() {
                taskList.removeChild(taskElement);
            });
        });
    }

    // split long text into paragraphs, maxLength set to 25
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
