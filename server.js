require("dotenv").config();
const { PORT = 3000, MONGODB_URI } = process.env;
const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");

const mongoose = require("mongoose");

mongoose.connect(MONGODB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
});

mongoose.connection
    .on("open", () => console.log("You are connected to mongoose."))
    .on("close", () => console.log("You are disconnected from mongoose."))
    .on("error", (error) => console.log(error));

const CocktailSchema = new mongoose.Schema({ 
    idDrink: String 
});

const IngredientSchema = new mongoose.Schema({ 
    idIngredient: String 
});

const ProfileSchema = new mongoose.Schema({
    age: Number,
    username: String,
    image: String,
    email: String,
    password: String,
    cocktails: [CocktailSchema],
    ingredients: [IngredientSchema]
});
  
const Profile = mongoose.model("Profile", ProfileSchema);
const Cocktail = mongoose.model("Cocktail", CocktailSchema);
const Ingredient = mongoose.model("Ingredient", IngredientSchema);

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello, world.");
});

app.get("/profile", async (req, res) => {
    try {
        res.json(await Profile.find({}));
    } catch (error) {
        res.status(400).json(error);
    }
});

app.post("/profile", async (req, res) => {
    try {
        res.json(await Profile.create(req.body));
    } catch (error) {
        res.status(400).json(error);
    }
});

app.put("/profile/:id", async (req, res) => {
    try {
        res.json(
            await Profile.findByIdAndUpdate(req.params.id, req.body, { new: true })
        );
    } catch (error) {
        res.status(400).json(error);
    }
});
  
app.delete("/profile/:id", async (req, res) => {
    try {
        res.json(await Profile.findByIdAndRemove(req.params.id));
    } catch (error) {
        res.status(400).json(error);
    }
});

app.listen(PORT, () => {});