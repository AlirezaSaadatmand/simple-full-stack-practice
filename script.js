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
                    editTodoList(newTask, spanText, taskInput);
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

document.getElementById("addTaskBtn").addEventListener("click", () => {
    const taskInput = document.getElementById("taskInput");
    const taskText = taskInput.value.trim();

    if (taskText !== "") {
        const body = {
            task: taskText,
            taskStatus: "undone",
        };
        postRequest("http://localhost:3000/api/tasks", body);
        taskInput.value = "";
        taskInput.focus();
    }
});

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
            return data;
        });

    newTask.remove();
}

// function patchRequest(url, body) {
//     fetch(url, {
//         method: "PATCH",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify(body),
//     })
//         .then((response) => {
//             if (!response.ok) {
//                 throw new Error(`HTTP error! Status: ${response.status}`);
//             }
//             return response.json();
//         })
//         .then((data) => console.log("PUT Response:", data))
//         .catch((error) => console.error("Error:", error));
// }

// // function editTodoList(newTask, spanText, taskInput) {
// //     taskInput.value = spanText.innerHTML;
// //     taskInput.focus();
// //     document.getElementById("addTaskBtn").addEventListener("click", function () {
// //         addTodoList(newTask);
// //     });
// //     newTask.remove();
// // }
