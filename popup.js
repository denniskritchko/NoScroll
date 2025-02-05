document.addEventListener("DOMContentLoaded", function() {
    const taskInput = document.getElementById("taskInput");
    const taskButton = document.getElementById("addTask");
    const taskList = document.getElementById("taskList");

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
        const maxLength = 34;
        const paragraphs = splitIntoParagraphs(task, maxLength);
        paragraphs.forEach(paragraph => {
            const p = document.createElement("p");
            p.textContent = paragraph;
            li.appendChild(p);
        });

        const deleteButton = document.createElement("span");
        deleteButton.textContent = "✖";
        deleteButton.className = "delete";
        deleteButton.addEventListener("click", function() {
            deleteTask(task, li);
        });

        li.appendChild(deleteButton);
        taskList.appendChild(li);
    }

    function deleteTask(task, taskElement) {
        chrome.storage.sync.get("tasks", function(data) {
            const tasks = data.tasks || [];
            const updatedTasks = tasks.filter(t => t !== task);
            chrome.storage.sync.set({"tasks": updatedTasks}, function() {
                taskList.removeChild(taskElement);
            })
        })
    }

    function splitIntoParagraphs(text, maxLength) {
        const words = text.split(" ");
        let paragraph = "";
        const paragraphs = [];

        words.forEach(word => {
            if ((paragraph+word).length > maxLength) {
                paragraphs.push(paragraph.trim());
                paragraph = word + " ";
            } else {
                paragraph += word + " "
            }
        });
        if (paragraph.trim()) {
            paragraphs.push(paragraph.trim());
        }
        return paragraphs;
    }
});
