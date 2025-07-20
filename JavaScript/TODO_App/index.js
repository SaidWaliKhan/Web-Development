document.getElementById("addTaskBtn").addEventListener("click", function () {
  const input = document.getElementById("taskInput");
  const taskValue = input.value.trim();
  const errorMsg = document.getElementById("errorMsg");

  if (taskValue) {
    const template = document.getElementById("taskTemplate");
    const clone = template.content.cloneNode(true);
    clone.querySelector(".task-text").textContent = taskValue;
    document.getElementById("taskList").appendChild(clone);

    input.value = "";
    errorMsg.style.display = "none";
    saveTasks();
  } else {
    errorMsg.style.display = "block";
  }
});

document.getElementById("taskInput").addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    document.getElementById("addTaskBtn").click();
  }
});

document.getElementById("taskList").addEventListener("click", function (event) {
  const target = event.target;

  if (target.classList.contains("delete-btn")) {
    target.parentElement.remove();
    saveTasks();
  } else if (target.tagName === "LI" || target.classList.contains("task-text")) {
    const li = target.closest("li");
    li.classList.toggle("completed");
    saveTasks();
  }
});


function saveTasks() {
  const tasks = [];
  document.querySelectorAll("#taskList li").forEach((li) => {
    tasks.push({
      text: li.querySelector(".task-text").textContent,
      completed: li.classList.contains("completed"),
    });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}


function loadTasks() {
  const saved = JSON.parse(localStorage.getItem("tasks") || "[]");
  saved.forEach((task) => {
    const template = document.getElementById("taskTemplate");
    const clone = template.content.cloneNode(true);
    clone.querySelector(".task-text").textContent = task.text;
    if (task.completed) clone.querySelector("li").classList.add("completed");
    document.getElementById("taskList").appendChild(clone);
  });
}

window.onload = loadTasks;
