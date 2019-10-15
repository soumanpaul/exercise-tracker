var express = require("express");
var router = express.Router();

let user = require("../models/user.model");

router.route("/").get((req, res) => {
  user
    .find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const username = req.body.username;

  const newUser = new user({ username });

  newUser
    .save()
    .then(() => res.json("User added!"))
    .catch(err => res.status(400).json("Error:" + err));
});

module.exports = router;
