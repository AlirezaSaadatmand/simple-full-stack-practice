let state = "new";
function getRequest(url) {
    fetch(url, {
        method: "GET",
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
            const taskList = document.getElementById("taskList");
            taskList.innerHTML = "";
            data.tasks.forEach((task) => {
                const newTask = document.createElement("li");
                const spanText = document.createElement("span");
                spanText.innerHTML = task.task;
                spanText.style.width = "130px";

                const btnEdit = document.createElement("button");
                btnEdit.textContent = "Edit";
                btnEdit.addEventListener("click", function () {
                    editTodoList(taskList, spanText, task.id);
                });

                const btnDelete = document.createElement("button");
                btnDelete.textContent = "Delete";
                btnDelete.addEventListener("click", function () {
                    deleteRequest("http://localhost:3000/api/tasks/" + task.id, newTask);
                });

                newTask.addEventListener("click", function () {
                    newTask.classList.toggle("completed");
                });

                taskList.appendChild(newTask);
                newTask.appendChild(spanText);
                newTask.appendChild(btnEdit);
                newTask.appendChild(btnDelete);
            });
        });
}

getRequest("http://localhost:3000/api/tasks");

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
            getRequest("http://localhost:3000/api/tasks");
            return data;
        });
}

const taskInput = document.getElementById("taskInput");

function deleteRequest(url, newTask) {
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
            newTask.remove();
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
        .then((data) => getRequest("http://localhost:3000/api/tasks"));
}

function editTodoList(taskList, spanText, id) {
    taskList.innerHTML = "";
    taskInput.value = spanText.innerHTML;
    taskInput.focus();
    state = `${id}`;
}

document.getElementById("addTaskBtn").addEventListener("click", () => {
    const taskText = taskInput.value.trim();
    if (taskText !== "") {
        const body = {
            task: taskText,
            taskStatus: "undone",
        };
        if (state == "new") {
            postRequest("http://localhost:3000/api/tasks", body);
        } else {
            patchRequest(`http://localhost:3000/api/tasks/${state}`, body);
            state = "new";
        }
        taskInput.value = "";
        taskInput.focus();
    }
});
