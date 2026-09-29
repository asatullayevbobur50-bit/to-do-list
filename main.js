var taskInput = document.getElementById("taskInput");
var addBtn = document.getElementById("addBtn");
var taskList = document.getElementById("taskList");
var taskCount = document.getElementById("taskCount");
var emptyState = document.getElementById("emptyState");
var searchInput = document.getElementById("searchInput");
var today = document.getElementById("today");

var tasks = [];


today.innerText = new Date().toLocaleDateString("uz-UZ");


addBtn.addEventListener("click", addTask);


taskInput.addEventListener("keydown", function(e) {
    if (e.key === "Enter") {
        addTask();
    }
});


function addTask() {

    var text = taskInput.value.trim();

    if (text === "") {
        alert("Avval vazifa yozing!");
        return;
    }

    var task = {
        id: Date.now(),
        text: text,
        completed: false
    };

    tasks.push(task);

    taskInput.value = "";

    showTasks();
}


function showTasks() {

    taskList.innerHTML = "";

    var searchText = searchInput.value.toLowerCase();

    var filteredTasks = tasks.filter(function(task) {
        return task.text.toLowerCase().includes(searchText);
    });


    filteredTasks.forEach(function(task) {

        var taskBox = document.createElement("div");
        taskBox.className = "task";

        if (task.completed) {
            taskBox.classList.add("completed");
        }


        var check = document.createElement("div");
        check.className = "check";


        var taskText = document.createElement("div");
        taskText.className = "task-text";
        taskText.innerText = task.text;


        var deleteBtn = document.createElement("button");
        deleteBtn.className = "delete";
        deleteBtn.innerText = "×";


        check.addEventListener("click", function() {
            task.completed = !task.completed;
            showTasks();
        });


        deleteBtn.addEventListener("click", function() {

            tasks = tasks.filter(function(item) {
                return item.id !== task.id;
            });

            showTasks();
        });


        taskBox.appendChild(check);
        taskBox.appendChild(taskText);
        taskBox.appendChild(deleteBtn);

        taskList.appendChild(taskBox);
    });


    taskCount.innerText = tasks.length;


    if (filteredTasks.length === 0) {
        emptyState.style.display = "block";
    } else {
        emptyState.style.display = "none";
    }
}


searchInput.addEventListener("input", function() {
    showTasks();
});


showTasks();