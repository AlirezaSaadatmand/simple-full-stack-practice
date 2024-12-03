const express = require("express");
const cors = require("cors");
const v1 = require("./src/routers/router");

const app = express();

app.use(express.json());
app.use(cors());

app.use(v1);

module.exports = app;
