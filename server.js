require("dotenv").config();
const { PORT = 3000 } = process.env;
const express = require("express");
const app = express();

app.get("/", (req, res) => {
    res.send("Hello, world.");
});

app.listen(PORT, () => {});