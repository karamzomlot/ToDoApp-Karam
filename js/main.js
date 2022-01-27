// Open Form to Add Task
let openBtn = document.querySelector('.add-sec .btn.open-btn');
let addForm = document.querySelector(".add-sec .add-form");

let slideDown = () => {
    addForm.classList.toggle('open-form');
    openBtn.classList.toggle('close');
}

openBtn.addEventListener('click', slideDown);


// Get Task Info

let taskTitle = document.getElementById('task-title');
let taskDay = document.getElementById('task-day');
let taskTime = document.getElementById('task-time');
let saveBtn = document.getElementById('save-btn');

let getData = (e) => {
    e.preventDefault();

    console.log(taskTitle.value)
    console.log(taskDay.value)
    console.log(taskTime.value)
}

saveBtn.addEventListener('click', getData);


// Done Task
let singleTask = document.querySelector('.tasks-list .single-task');
let doneTaskBtn = document.querySelector('.single-task .done-btn');

let doneTask = () => {
    singleTask.classList.toggle('done-task');
}


doneTaskBtn.addEventListener('click', doneTask)
