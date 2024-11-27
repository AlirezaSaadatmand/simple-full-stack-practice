const express = require("express");

const v1 = require("./src/routers/router");

const app = express();

app.use(express.json());

app.use(v1);

module.exports = app;
