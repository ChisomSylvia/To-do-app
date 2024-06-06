
const inputBox = document.getElementById("inputBox");
const dueDate = document.getElementById("date");
const submitBtn = document.getElementById("btn");
const taskList = document.getElementById("taskList");


// add event listener to the addtask button
submitBtn.addEventListener("click", addTask);

//Add Task Function
function addTask() {
    const input = inputBox.value;
    const date = dueDate.value;

    if (input === '' || date === '') {
        alert("Enter Your To Dos!");
    } 
    else {
        if (!document.getElementById("taskTitle")) {
            let title = document.createElement("h3");
            title.id = "taskTitle";
            title.textContent = "Task List";
            title.style.margin = "20px 0 5px";
            taskList.appendChild(title);
        }

        let list = document.createElement("li");
        list.textContent = `${date} ${input}`;
        taskList.appendChild(list);

        let delIcon = document.createElement("span");
        delIcon.innerHTML = "\xd7"
        delIcon.style.cursor = "pointer";
        list.appendChild(delIcon);
    }

    inputBox.value = "";
    dueDate.value = "";
    saveTask()
}


// toggle tasklist function
taskList.addEventListener("click", (completed) => {
    if (completed.target.tagName === "LI") {
        completed.target.classList.toggle("checked");
        saveTask()
    } 
    else if (completed.target.tagName === "SPAN") {
        completed.target.parentElement.remove();
        saveTask()
        checkTitle();
    } 
    else {
        false;
    } 
})


// Check if title should be displayed
function checkTitle() {
    const tasks = taskList.getElementsByTagName("li").length;
    const taskTitle = document.getElementById("taskTitle");

    if (tasks === 0 && taskTitle) {
        taskTitle.remove();
    }
}

// To save already created list
function saveTask() {
    localStorage.setItem("task", taskList.innerHTML);
}

function showTask() {
    taskList.innerHTML = localStorage.getItem("task");
}
showTask();


// Initial check for tasks on page load (in case tasks are loaded from storage)
window.onload = checkTitle();