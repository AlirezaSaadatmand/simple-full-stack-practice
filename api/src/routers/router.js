const { Router } = require("express");
const fs = require("fs");

const router = Router();

const data = require("../database/database.json");

router.get("/api/tasks", (req, res) => {
    res.send(data);
});

router.get("/api/tasks/:id", (req, res) => {
    let id = req.params.id;
    id = parseInt(id);
    if (isNaN(id)) return res.status(400).send({ message: "Bad Request" });

    const task = data.tasks.find((task) => task.id === id);
    if (!task) res.status(404).send({ message: "Task not found" });
    return res.send(task);
});

router.post("/api/tasks", (req, res) => {
    const { task, taskStatus } = req.body;

    if (!task || !taskStatus) return res.sendStatus(400);
    data.tasks.push({ id: data.tasks.length + 1, task: task, taskStatus: taskStatus });
    fs.writeFile("./src/database/database.json", JSON.stringify(data, null, 4), (err) => {
        if (err) throw err;
    });

    return res.status(200).send({ message: "Task Added" });
});

router.delete("/api/tasks/:id", (req, res) => {
    const { id } = req.params;
    if (isNaN(parseInt(id))) res.status(400).send({ message: "Bad Request" });
    const index = data.tasks.findIndex((task) => task.id === parseInt(id));
    if (index === -1) return res.status(404).send({ message: "Task not found" });
    data.tasks.splice(index, 1);
    fs.writeFile("./src/database/database.json", JSON.stringify(data, null, 4), (err) => {
        if (err) throw err;
    });
    return res.send({ message: "Task deleted" });
});

router.put("/api/tasks/:id", (req, res) => {
    const {
        body,
        params: { id },
    } = req;

    const parsedId = parseInt(id);
    if (isNaN(parsedId)) return res.sendStatus(400);

    const findTask = data.tasks.findIndex((task) => task.id === parsedId);

    if (findTask === -1) return res.sendStatus(404);

    data.tasks[findTask] = { id: parsedId, ...body };
    fs.writeFile("./src/database/database.json", JSON.stringify(data, null, 4), (err) => {
        if (err) throw err;
    });
    return res.status(200).send({ message: "Task updated" });
});

router.patch("/api/tasks/:id", (req, res) => {
    const {
        body,
        params: { id },
    } = req;

    const parsedId = parseInt(id);
    if (isNaN(parsedId)) return res.sendStatus(400);

    const findTask = data.tasks.findIndex((task) => task.id === parsedId);

    if (findTask === -1) return res.sendStatus(404);
    data.tasks[findTask] = { ...data.tasks[findTask], ...body };

    fs.writeFile("./src/database/database.json", JSON.stringify(data, null, 4), (err) => {
        if (err) throw err;
    });
    return res.status(200).send({ message: "Task updated" });
});

module.exports = router;
