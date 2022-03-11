const {Schema, model} = require("../db/connection")

const CocktailSchema = new Schema({ 
    idDrink: String 
});

const IngredientSchema = new Schema({ 
    idIngredient: String 
});

const ProfileSchema = new Schema({
    age: {type: Number, required: true},
    username: {type: String, unique: true, required: true},
    image: {type: String},
    email: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    currentSession: {type: String},
    cocktails: [CocktailSchema],
    ingredients: [IngredientSchema]
});
  
const Profile = model("Profile", ProfileSchema);

module.exports = Profile;