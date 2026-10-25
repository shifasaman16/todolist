
const form = document.getElementById("taskForm");
const input = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const taskCount = document.getElementById("taskCount");
const emptyMessage = document.getElementById("emptyMessage");

function updateCount() {
    const tasks = [...taskList.children];
    const completed = tasks.filter(task =>
        task.classList.contains("done")
    ).length;

    taskCount.textContent = tasks.length;

    emptyMessage.hidden = tasks.length > 0;

    const percentage = tasks.length
        ? Math.round((completed / tasks.length) * 100)
        : 0;

    document.getElementById("progressText").textContent =
        percentage + "% completed";

    document.getElementById("progressFill").style.width =
        percentage + "%";
}
function addTask() {
    const text = input.value.trim();

    if (text === "") return;

    const li = document.createElement("li");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "task-check";
    checkbox.setAttribute("aria-label", "Complete task");

    const taskText = document.createElement("span");
    taskText.className = "task-text";
    taskText.textContent = text;

    checkbox.addEventListener("change", () => {
        li.classList.toggle("done", checkbox.checked);
        updateCount();
    });

    taskText.addEventListener("click", () => {
        checkbox.checked = !checkbox.checked;
        li.classList.toggle("done", checkbox.checked);
    });

    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.className = "delete-btn";
    deleteButton.textContent = "×";
    deleteButton.setAttribute("aria-label", "Delete task");

    deleteButton.addEventListener("click", () => {
        li.remove();
        updateCount();
    });

    li.append(checkbox, taskText, deleteButton);
    taskList.appendChild(li);

    input.value = "";
    input.focus();

    updateCount();
}

form.addEventListener("submit", event => {
    event.preventDefault();
    addTask();
});

updateCount();
