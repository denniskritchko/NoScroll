document.addEventListener("DOMContentLoaded", function() {
    const taskInput = document.getElementById("taskInput");
    const taskButton = document.getElementById("addTask");
    const taskList = document.getElementById("taskList");

    chrome.storage.sync.get("tasks", function (data) {
        if (data.tasks){
            data.tasks.forEach(task => addTaskToDOM(task));
        }
    });

    addTaskButton.addEventListener("click", function() {
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
    })

    function addTaskToDOM(task) {
        const li = document.createElement("li");
        li.textContent = task;
        taskList.appendChild(li);
    }
});