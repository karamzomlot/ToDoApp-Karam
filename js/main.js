// Open Form to Add Task
let openBtn = document.querySelector(".add-sec .sec-top .btn.open-btn");
let addForm = document.querySelector(".add-sec .form.add-form");

openBtn.addEventListener("click", () => {
    addForm.classList.toggle("open-form");
    openBtn.classList.toggle("close");
});

// Open & Close Form to Edit Task
let secTop = document.querySelector(".add-sec .sec-top");
let closeEditBtn = document.querySelector(".add-sec .sec-top .btn.close-btn");
let editForm = document.querySelector(".add-sec .form.edit-form");
let tasksList = document.querySelector(".view-sec .tasks-list");

tasksList.addEventListener("click", (e) => {
    if (e.target.dataset.id == "edit"){
        // Close Add Form If It Open
        if (addForm.classList.contains("open-form")){
            addForm.classList.remove("open-form");
            openBtn.classList.remove("close");
        }

        // Open Edit Form
        editForm.classList.add("open-form");
        secTop.classList.add("edit-opened");

        // Scroll To Top Page To Edit Data
        window.scrollTo({top: 0})
    }
});

closeEditBtn.addEventListener("click", () => {
    editForm.classList.remove("open-form")
    secTop.classList.remove("edit-opened");
})

// Get Task Info

let taskTitle = document.getElementById("task-title");
let taskDay = document.getElementById("task-day");
let taskTime = document.getElementById("task-time");
let saveBtn = document.getElementById("save-btn");

let getData = (e) => {
    e.preventDefault();

    console.log(taskTitle.value)
    console.log(taskDay.value)
    console.log(taskTime.value)
}

saveBtn.addEventListener("click", getData);


// Done Task
let singleTask = document.querySelector(".tasks-list .single-task");
let doneTaskBtn = document.querySelector(".single-task .done-btn");

let doneTask = () => {
    singleTask.classList.toggle("done-task");
}


doneTaskBtn.addEventListener("click", doneTask)
