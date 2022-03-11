require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const AuthRouter = require("./controllers/auth")
const ProfileRouter = require("./controllers/profile")

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use("/auth", AuthRouter)
app.use("/profile", ProfileRouter)

app.listen(process.env.PORT || 4000);