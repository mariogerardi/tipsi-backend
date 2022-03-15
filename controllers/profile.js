const { Router } = require("express");
const Profile = require("../models/profile");

const router = Router();

router.get("/", async (req, res) => {
  try {
      res.json(await Profile.find({}));
  } catch (error) {
      res.status(400).json(error);
  }
});

router.post("/", async (req, res) => {
  try {
      res.json(await Profile.create(req.body));
  } catch (error) {
      res.status(400).json(error);
  }
});

router.get("/:username", async (req, res) => {
  try {
      res.json(
          await Profile.findOne(req.params)
      );
  } catch (error) {
      res.status(400).json(error);
  }
});

router.put("/:id", async (req, res) => {
  try {
      res.json(
          await Profile.findByIdAndUpdate(req.params.id, req.body)
      );
  } catch (error) {
      res.status(400).json(error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
      res.json(await Profile.findByIdAndRemove(req.params.id));
  } catch (error) {
      res.status(400).json(error);
  }
});

module.exports = router