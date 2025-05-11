function addTask() {
    let taskInput = document.getElementById("taskInput");
    let taskText = taskInput.value.trim();
    let dueDateInput = document.getElementById("dueDateInput");
    let dueDate = dueDateInput.value;
  
    if (taskText === "") return; // Ensure task is not empty
  
    // Create task list item
    let listItem = document.createElement("li");
  
    // Task text span
    let taskSpan = document.createElement("span");
    taskSpan.textContent = taskText;
    taskSpan.classList.add("task-text");
  
    // Due Date span
    let dueDateSpan = document.createElement("span");
    dueDateSpan.textContent = `Due: ${dueDate}`;
    dueDateSpan.classList.add("due-date");
  
    // Complete task on click
    taskSpan.onclick = function () {
      taskSpan.classList.toggle("completed");
    };
  
    // Edit button
    let editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.onclick = function () {
      let newText = prompt("Edit your task:", taskSpan.textContent);
      if (newText) taskSpan.textContent = newText;
    };
  
    // Delete button
    let deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.onclick = function () {
      listItem.remove();
      updateLocalStorage();
    };
  
    // Priority dropdown
    let prioritySelect = document.createElement("select");
    ["Low", "Medium", "High"].forEach(level => {
      let option = document.createElement("option");
      option.value = level;
      option.textContent = level;
      prioritySelect.appendChild(option);
    });
  
    prioritySelect.onchange = function () {
      listItem.style.borderLeft = {
        Low: "5px solid green",
        Medium: "5px solid orange",
        High: "5px solid red"
      }[prioritySelect.value];
    };
  
    // Append elements to listItem
    listItem.appendChild(taskSpan);
    listItem.appendChild(dueDateSpan);
    listItem.appendChild(editBtn);
    listItem.appendChild(deleteBtn);
    listItem.appendChild(prioritySelect);
  
    // Add listItem to task list
    document.getElementById("taskList").appendChild(listItem);
  
    // Clear input fields
    taskInput.value = "";
    dueDateInput.value = "";  // Clear due date input field
  
    // Save tasks to localStorage
    saveToLocalStorage();
  }
  
  // Save tasks to localStorage
  function saveToLocalStorage() {
    let tasks = [];
    let taskList = document.getElementById("taskList").children;
  
    for (let task of taskList) {
      tasks.push({
        text: task.children[0].textContent,
        dueDate: task.children[1].textContent,
        priority: task.children[4].value,
        completed: task.children[0].classList.contains("completed")
      });
    }
  
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
  
  // Load tasks from localStorage
  function loadFromLocalStorage() {
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    if (tasks) {
      tasks.forEach(task => {
        let listItem = document.createElement("li");
  
        let taskSpan = document.createElement("span");
        taskSpan.textContent = task.text;
        if (task.completed) taskSpan.classList.add("completed");
  
        let dueDateSpan = document.createElement("span");
        dueDateSpan.textContent = task.dueDate;
  
        let editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.onclick = function () {
          let newText = prompt("Edit your task:", taskSpan.textContent);
          if (newText) taskSpan.textContent = newText;
        };
  
        let deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.onclick = function () {
          listItem.remove();
          updateLocalStorage();
        };
  
        let prioritySelect = document.createElement("select");
        ["Low", "Medium", "High"].forEach(level => {
          let option = document.createElement("option");
          option.value = level;
          option.textContent = level;
          prioritySelect.appendChild(option);
        });
        prioritySelect.value = task.priority;
  
        prioritySelect.onchange = function () {
          listItem.style.borderLeft = {
            Low: "5px solid green",
            Medium: "5px solid orange",
            High: "5px solid red"
          }[prioritySelect.value];
        };
  
        listItem.appendChild(taskSpan);
        listItem.appendChild(dueDateSpan);
        listItem.appendChild(editBtn);
        listItem.appendChild(deleteBtn);
        listItem.appendChild(prioritySelect);
  
        document.getElementById("taskList").appendChild(listItem);
      });
    }
  }
  
  // Run the load function on page load
  window.onload = function () {
    loadFromLocalStorage();
  };
  