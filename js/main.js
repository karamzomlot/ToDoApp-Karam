/* *************************************************************
    Style The Page 
************************************************************* */

// Open Form to Add Task
let openBtn = document.querySelector(".add-sec .sec-top .btn.open-btn");
let addForm = document.querySelector(".add-sec .form.add-form");

openBtn.addEventListener("click", () => {
    closeAddForm();
});

function closeAddForm(){
    addForm.classList.toggle("open-form");
    openBtn.classList.toggle("close");
}

// Open & Close Form to Edit Task
let secTop = document.querySelector(".add-sec .sec-top");
let closeEditBtn = document.querySelector(".add-sec .sec-top .btn.close-btn");
let editForm = document.querySelector(".add-sec .form.edit-form");
let tasksList = document.querySelector(".view-sec .tasks-list");

tasksList.addEventListener("click", (e) => {
    if (e.target.dataset.id == "edit"){
        openEditForm();
    }
});

function openEditForm(){
    // Close Add Form If It Open
    if (addForm.classList.contains("open-form")){
        addForm.classList.remove("open-form");
        openBtn.classList.remove("close");
    }

    // Open Edit Form
    editForm.classList.add("open-form");
    secTop.classList.add("edit-opened");

    // Scroll To Top Page To Edit Data
    window.scrollTo({top: 0});
}

closeEditBtn.addEventListener("click", () => {
    closeEditForm();
});

function closeEditForm () {
    editForm.classList.remove("open-form")
    secTop.classList.remove("edit-opened");
}

/* *************************************************************
    Add Task  
************************************************************* */
// Array Of Tasks
let tasks = [];

if (window.localStorage.getItem("tasks")){
    tasks = JSON.parse(window.localStorage.getItem("tasks"));
}

getTasksFromLocalStorage();

setTasksInfo(tasks);

// Add Task

let taskTitle = document.getElementById("task-title");
let taskDay = document.getElementById("task-day");
let taskTime = document.getElementById("task-time");
let saveBtn = document.getElementById("save-btn");

saveBtn.addEventListener("click", (e) => {
    e.preventDefault();

    if (taskTitle.value !== "" && taskDay.value !== "" && taskTime.value !== ""){
        // Add To Tasks 
        addToTasks(taskTitle.value, taskDay.value, taskTime.value);
        // Clear task values
        taskTitle.value = "";
        taskDay.value = "";
        taskTime.value = "";

    }
    else {
        alert("All Fields Are Required!")
    }
});

// Add Task to arr
function addToTasks(title, day, time){
    // Task Details
    const task = {
        id: Date.now(),
        title: title,
        day: day,
        time: time,
        status: false
    }

    // Push Task to arr
    tasks.push(task);

    // Add Tasks to Page
    addTasksToPage(tasks);

    // Close Add Form 
    closeAddForm();

    // Add Task To Local Storage
    addTaskToLocalStorage(tasks);
}


// Add Tasks To Page Function
function addTasksToPage(tasks) {
    // Remove anything on Tasks List
    tasksList.innerHTML = "";

    // Add Tasks To List
    tasks.forEach(task => {
        tasksList.innerHTML += 
        `<li class="single-task ${task.status == true? "completed" : " "}" data-id="${task.id}">
            <!-- Done Button -->
            <button class="done-btn" data-id="status">
                <span class="not-done-icon ri-checkbox-blank-circle-line icon"></span>
                <span class="done-icon ri-checkbox-circle-line icon"></span>
            </button>
            <!-- Tasks Details -->
            <div class="task-details">
                <p class="task-name">${task.title}</p>
                <div class="day-time">
                    <p class="day">
                        <span class="ri-calendar-line icon"></span>
                        <span class="value day">${task.day}</span>
                    </p>
                    <p class="time">
                        <span class="ri-time-line icon"></span>
                        <span class="value day">${task.time}</span>
                    </p>
                </div>
            </div>
            <!-- Edit & Delete Button -->
            <button class="edit-btn" data-id="edit">
                <span class="trash-icon ri-pencil-line icon"></span>
            </button>
            <button class="trash-btn" data-id="delete">
                <span class="trash-icon ri-delete-bin-6-line icon"></span>
            </button>
        </li>`;
    });

    setTasksInfo(tasks);
}


// Add Task To Local Storage
function addTaskToLocalStorage(tasks){
    window.localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Get Tasks From Local Storage
function getTasksFromLocalStorage(){
    let data = window.localStorage.getItem("tasks");
    if (data) {
        let TasksData = JSON.parse(data);
        addTasksToPage(TasksData);
    }
}


// Delete & Complete & Edit Task 

// Edit Form Inputs
let editTitle = document.getElementById("edit-title");
let editDay = document.getElementById("edit-day");
let editTime = document.getElementById("edit-time");
let editBtn = document.getElementById("edit-btn");

tasksList.addEventListener("click", (e) => {
    // Delete Task
    if (e.target.dataset.id == "delete"){
        e.target.parentElement.remove();
        tasks = tasks.filter(task => task.id != e.target.parentElement.dataset.id);
        setTasksInfo(tasks);
        addTaskToLocalStorage(tasks);
    }
    // Complete Task
    else if (e.target.dataset.id == "status"){
        e.target.parentElement.classList.toggle('completed')
        let thisId = e.target.parentElement.dataset.id;

        for (let i = 0; i < tasks.length; i++){
            if (tasks[i].id == thisId){
                tasks[i].status == false ? (tasks[i].status = true) : (tasks[i].status = false);
            }
        }
        setTasksInfo(tasks);
        addTaskToLocalStorage(tasks);
    }
    // Edit Task
    else if (e.target.dataset.id == "edit"){
        let thisTask = tasks.filter(task => task.id == e.target.parentElement.dataset.id);
        
        // Get Tasks Info From Arr
        editTitle.value = thisTask[0].title;
        editDay.value = thisTask[0].day;
        editTime.value = thisTask[0].time;
        // Open Edit Form
        openEditForm();
        
        editBtn.addEventListener("click", (e) => {
            e.preventDefault();
            
            thisTask[0].title = editTitle.value;
            thisTask[0].day = editDay.value;
            thisTask[0].time = editTime.value;

            // Close Edit Form
            closeEditForm();
            // Resave Tasks
            addTaskToLocalStorage(tasks);
            addTasksToPage(tasks);
        });
    }
});


// Set Tasks info

function setTasksInfo(tasks){
    let allTasksValue = document.querySelector(".tasks-info .value.all-tasks");
    let compltedTasksValue = document.querySelector(".tasks-info .value.completed");

    // Set All Tasks Value
    allTasksValue.innerHTML = tasks.length;

    // Set Completed Tasks Value
    let completedTasks = tasks.filter(task => task.status == true);
    compltedTasksValue.innerHTML = completedTasks.length;
}