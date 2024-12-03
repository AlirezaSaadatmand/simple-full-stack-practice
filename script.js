function getRequest(url) {
    fetch(url, {
        headers: {
            Accept: "application/json",
        },
    })
        .then((response) => response.json())
        .then((text) => {
            return text;
        });
}

document.getElementById("addTaskBtn").addEventListener("click", function addTodoList(newTask) {
    const taskInput = document.getElementById("taskInput");
    const taskText = taskInput.value.trim();

    if (taskText !== "") {
        const taskList = document.getElementById("taskList");
        const newTask = document.createElement("li");
        const spanText = document.createElement("span");
        spanText.innerHTML = taskText;
        spanText.style.width = "130px";

        const btnEdit = document.createElement("button");
        btnEdit.textContent = "ویرایش";
        btnEdit.addEventListener("click", function () {
            editTodoList(newTask, spanText, taskInput);
        });

        const btnDelete = document.createElement("button");
        btnDelete.textContent = "حذف";
        btnDelete.addEventListener("click", function () {
            deleteTodoList(newTask);
        });

        newTask.addEventListener("click", function () {
            newTask.classList.toggle("completed");
        });

        taskList.appendChild(newTask);
        newTask.appendChild(spanText);
        newTask.appendChild(btnEdit);
        newTask.appendChild(btnDelete);
        taskInput.value = "";
        taskInput.focus();
    }
});

function deleteTodoList(newTask) {
    newTask.remove();
}

function editTodoList(newTask, spanText, taskInput) {
    taskInput.value = spanText.innerHTML;
    taskInput.focus();
    document.getElementById("addTaskBtn").addEventListener("click", function () {
        addTodoList(newTask);
    });
    newTask.remove();
}
