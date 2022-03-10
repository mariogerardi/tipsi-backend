require("dotenv").config();
const { PORT = 3000, MONGODB_URI } = process.env;
const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const bcrypt = require('bcryptjs')

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
    currentSession: String,
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

app.get('/register', function (req, res) {
    res.render('register.ejs');
})

app.get('/login', function (req, res) {
    res.render('login.ejs');
})

app.post('/register', async function (req, res) {
    try {
        const foundProfile = await Profile.exists({email: req.body.email});
        if (foundProfile) {
            return res.redirect('/login')
        }
        const salt = await bcrypt.genSalt(12);
        const hash = await bcrypt.hash(req.body.password, salt);
        req.body.password = hash;
        const newProfile = await User.create(req.body);
        return res.redirect('/login');
    } catch (err) {
        return res.send(err);
    }
});

app.post('/login', async function (req, res) {
    try {
        const foundProfile = await Profile.findOne({email: req.body.email});
        if (!foundProfile) return res.send('Either email or password is incorrect.');
        const match = await bcrypt.compare(req.body.password, foundProfile.password);
        if (!match) return res.send('Either email or password is incorrect.');
        req.session.currentProfile = {
            id: foundProfile._id,
            username: foundProfile.email
        };
        const foundProf = await req.session.currentUser.id
        const foundSession = req.session.id
        const createdSession = await Profile.findByIdAndUpdate(foundProf, {currentSession: foundSession})
        return res.redirect('/home')
    } catch (err) {
        console.log(err);
        res.send(err);
    }
})

app.get('/logout', async function (req, res) {
    try {
        req.session.destroy();
        return res.redirect('/home');
    } catch (error) {
        return res.send(error);
    }
})

app.listen(PORT, () => {});