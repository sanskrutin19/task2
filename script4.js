document.addEventListener("DOMContentLoaded", function () {
    const taskInput = document.getElementById("taskInput");
    const addTaskBtn = document.getElementById("addTaskBtn");
    const categorySelect = document.getElementById("categorySelect");
    const tasksContainer = document.getElementById("tasksContainer");
    const taskCategories = document.getElementById("taskCategories");

    // Ensure 'tasks' is always an array
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    if (!Array.isArray(tasks)) {
        tasks = [];
    }

    function renderTasks(filter = "All") {
        tasksContainer.innerHTML = "";

        const filteredTasks = filter === "All" ? tasks : tasks.filter(task => task.category === filter);
        
        if (!Array.isArray(filteredTasks)) {
            console.error("filteredTasks is not an array:", filteredTasks);
            return;
        }

        const categories = [...new Set(filteredTasks.map(task => task.category))];

        categories.forEach(category => {
            const categoryDiv = document.createElement("div");
            categoryDiv.classList.add("task-category");
            categoryDiv.innerHTML = `<h3>${category}</h3>`;

            filteredTasks
                .filter(task => task.category === category)
                .forEach(task => {
                    const listItem = document.createElement("div");
                    listItem.classList.add("task-item");

                    const checkbox = document.createElement("input");
                    checkbox.type = "checkbox";
                    checkbox.checked = task.completed;

                    const pencil = document.createElement("span");
                    pencil.textContent = "✏";
                    pencil.classList.add("pencil");

                    const highlight = document.createElement("span");
                    highlight.textContent = "🖍";
                    highlight.classList.add("highlight");

                    const taskSpan = document.createElement("span");
                    taskSpan.textContent = task.text;
                    if (task.completed) {
                        taskSpan.style.textDecoration = "line-through";
                    }

                    listItem.appendChild(checkbox);
                    listItem.appendChild(taskSpan);
                    listItem.appendChild(pencil);
                    listItem.appendChild(highlight);
                    categoryDiv.appendChild(listItem);

                    checkbox.addEventListener("click", function () {
                        task.completed = checkbox.checked;
                        localStorage.setItem("tasks", JSON.stringify(tasks));
                        renderTasks(filter);
                    });

                    pencil.addEventListener("click", function () {
                        listItem.style.textDecoration = "line-through";
                        setTimeout(() => {
                            tasks = tasks.filter(t => t.text !== task.text);
                            localStorage.setItem("tasks", JSON.stringify(tasks));
                            renderTasks(filter);
                        }, 500);
                    });

                    highlight.addEventListener("click", function () {
                        taskSpan.style.backgroundColor = prompt("Enter highlight color (e.g., yellow, pink, lightblue):", "yellow");
                    });
                });

            tasksContainer.appendChild(categoryDiv);
        });
    }

    addTaskBtn.addEventListener("click", function () {
        const taskText = taskInput.value.trim();
        if (taskText === "") return;

        const category = categorySelect.value;

        // Ensure 'tasks' is still an array before pushing
        if (!Array.isArray(tasks)) {
            tasks = [];
        }

        tasks.push({ text: taskText, category, completed: false });
        localStorage.setItem("tasks", JSON.stringify(tasks));

        taskInput.value = "";
        renderTasks(category);
    });

    taskCategories.addEventListener("click", function (e) {
        if (e.target.tagName === "LI") {
            renderTasks(e.target.dataset.category);
        }
    });

    renderTasks();
});
