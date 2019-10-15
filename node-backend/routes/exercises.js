var express = require("express");
var router = express.Router();

let Exercise = require("../models/exercise.model");

router.route("/").get((req, res) => {
  Exercise.find()
    .then(express => res.json(express))
    .catch(err => res.status(400).json("Error:" + err));
});

router.route("/add").post((req, res) => {
  const username = req.body.username;
  const description = req.body.description;
  const duration = Number(req.body.duration);
  const date = Date.parse(req.body.date);

  const newExercise = new Exercise({
    username,
    description,
    duration,
    date
  });

  newExercise
    .save()
    .then(() => res.json("Exercise added!"))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/:id").get((req, res) => {
  Exercise.findById(req.params.id)
    .then(express => res.json(express))
    .catch(err => res.status(400).json("Error:" + err));
});

router.route("/:id").delete((req, res) => {
  Exercise.findByIdAndDelete(req.params.id)
    .then(() => res.json("Exercises deleted."))
    .catch(err => res.status(400).json("Error:" + err));
});

router.route("/update/:id").post((req, res) => {
  Exercise.findById(req.params.id)
    .then(express => {
      express.username = req.body.username;
      express.description = req.body.description;
      express.duration = Number(req.body.duration);
      express.date = Date.parse(req.body.date);

      express
        .save()
        .then(() => res.json("Exercise Update!"))
        .catch(err => res.status(400).json("Error: " + err));
    })
    .catch(err => res.status(400).json("Error: " + err));
});

module.exports = router;
