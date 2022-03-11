const { Router } = require("express");
const Profile = require("../models/profile");

const router = Router();

router.get("/", (req, res) => {
  res.send("Hello, world.");
});

router.get("/profile", async (req, res) => {
  try {
      res.json(await Profile.find({}));
  } catch (error) {
      res.status(400).json(error);
  }
});

router.post("/profile", async (req, res) => {
  try {
      res.json(await Profile.create(req.body));
  } catch (error) {
      res.status(400).json(error);
  }
});

router.put("/profile/:id", async (req, res) => {
  try {
      res.json(
          await Profile.findByIdAndUpdate(req.params.id, req.body, { new: true })
      );
  } catch (error) {
      res.status(400).json(error);
  }
});

router.delete("/profile/:id", async (req, res) => {
  try {
      res.json(await Profile.findByIdAndRemove(req.params.id));
  } catch (error) {
      res.status(400).json(error);
  }
});

module.exports = router