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

function postRequest(url, body) {
    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then((data) => {
            return data;
        });
}

function deleteRequest(url) {
    fetch(url, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then((data) => {
            return data;
        });
}

function patchRequest(url, body) {
    fetch(url, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then((data) => console.log("PUT Response:", data))
        .catch((error) => console.error("Error:", error));
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
