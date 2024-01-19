import express from "express";
import { Movie } from "./movies.model.js";

const router = express.Router();

//add movie
router.post("/movie/add", async (req, res) => {
  console.log(req.body);
  const newMovie = req.body;

  await Movie.create(newMovie);

  return res.status(201).send({ message: "Movie is added successfully." });
});

export default router;
