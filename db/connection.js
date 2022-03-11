require("dotenv").config()
const mongoose = require("mongoose")

const {MONGODB_URI} = process.env 

mongoose.connect = mongoose.connect(MONGODB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
});

mongoose.connection
    .on("open", () => console.log("You are connected to mongoose."))
    .on("close", () => console.log("You are disconnected from mongoose."))
    .on("error", (error) => console.log(error));

module.exports = mongoose;