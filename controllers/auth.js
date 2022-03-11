require("dotenv").config();
const { Router } = require("express");
const Profile = require("../models/profile");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken"); 

const router = Router();

const { SECRET = "secret" } = process.env;

router.post("/signup", async (req, res) => {
  try {
    req.body.password = await bcrypt.hash(req.body.password, 10);
    console.log(req.body.password);
    const profile = await Profile.create(req.body);
    console.log(profile);
    res.json(profile);
  } catch (error) {
    res.status(400).json({ error });
  }
});

router.post("/login", async (req, res) => {
  try {
    const profile = await Profile.findOne({ username: req.body.username });
    if (profile) {
      const result = await bcrypt.compare(req.body.password, profile.password);
      if (result) {
        const token = await jwt.sign({ username: profile.username }, SECRET);
        res.json({ token });
      } else {
        res.status(400).json({ error: "Password doesn't match any known user." });
      }
    } else {
      res.status(400).json({ error: "User doesn't exist." });
    }
  } catch (error) {
    res.status(400).json({ error });
  }
});

module.exports = router;