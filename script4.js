document.addEventListener("DOMContentLoaded", loadTasks);

function addTask() {
    let taskInput = document.getElementById("taskInput");
    let taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Please enter a task!");
        return;
    }

    let taskList = document.getElementById("taskList");

    let li = document.createElement("li");
    li.textContent = taskText;

    let removeBtn = document.createElement("button");
    removeBtn.textContent = "X";
    removeBtn.onclick = function () {
        taskList.removeChild(li);
        saveTasks();
    };

    li.appendChild(removeBtn);
    taskList.appendChild(li);

    taskInput.value = "";
    saveTasks();
}

function saveTasks() {
    let tasks = [];
    document.querySelectorAll("#taskList li").forEach((li) => {
        tasks.push(li.textContent.slice(0, -1)); // Remove 'X' from text
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    let storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    let taskList = document.getElementById("taskList");

    storedTasks.forEach((taskText) => {
        let li = document.createElement("li");
        li.textContent = taskText;

        let removeBtn = document.createElement("button");
        removeBtn.textContent = "X";
        removeBtn.onclick = function () {
            taskList.removeChild(li);
            saveTasks();
        };

        li.appendChild(removeBtn);
        taskList.appendChild(li);
    });
}
