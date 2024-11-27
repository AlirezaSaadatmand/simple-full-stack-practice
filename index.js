const app = require("./app");

app.get("/", async (req, res) => {
    res.send("Welcome to todo app");
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on ${port}`));
