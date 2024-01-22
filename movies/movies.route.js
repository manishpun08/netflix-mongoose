import express from "express";
import { Movie } from "./movies.model.js";
import mongoose from "mongoose";

const router = express.Router();

//add movie
router.post("/movie/add", async (req, res) => {
  console.log(req.body);
  const newMovie = req.body;

  await Movie.create(newMovie);

  return res.status(201).send({ message: "Movie is added successfully." });
});

//get movie details by id
router.get("/movie/details/:id", async (req, res) => {
  //extract id from req.params
  const movieId = req.params.id;
  //check if id is valid for mongo id
  const isValidMongoId = mongoose.Types.ObjectId.isValid(movieId);
  //if not mongo id, throw error
  if (!isValidMongoId) {
    return res.status(400).send({ message: "Invalid mongo Id." });
  }
  //find movie
  const requiredMovie = await Movie.findOne({ _id: movieId });
  //if not found, throw error
  if (!requiredMovie) {
    return res.status(404).send({ message: "Movie does not exist." });
  }
  //send appropriate response
  return res.status(200).send({ message: "Success", movie: requiredMovie });
});
//delete movie by id
router.delete("/movie/delete/:id", async (req, res) => {
  //extract id from req.params
  const movieId = req.params.id;
  //check if id is valid mongo id
  const isValidMongoId = mongoose.Types.ObjectId.isValid(movieId);
  //if not valid mongo id, throw error
  if (!isValidMongoId) {
    return res.status(400).send({ message: "Invalid movie id." });
  }
  //find movie
  const requiredMovie = await Movie.findOne({ _id: movieId });
  //if not found, throw error
  if (!requiredMovie) {
    return res.status(404).send({ message: "Movie does not exits." });
  }
  //delete movie by id
  await Movie.deleteOne({ _id: movieId });
  //send appropriate response
  return res
    .status(200)
    .send({ message: "Movie is deleted successfully.", movie: requiredMovie });
});
//edit movie by id
router.put("/movie/edit/:id", async (req, res) => {
  //extract id from req.params
  const movieId = req.params.id;
  //check if id is valid mongo id
  const isValidMongoId = mongoose.Types.ObjectId.isValid(movieId);
  //if not, throw error
  if (!isValidMongoId) {
    return res.status(400).send({ message: "Invalid mongo id." });
  }
  //find movie
  const requiredMovie = await Movie.findOne({ _id: movieId });
  //if not found movie, throw error
  if (!requiredMovie) {
    return res.status(404).send({ message: "Movie does not exist." });
  }
  //extract new value from req.body
  const newValues = req.body;
  //update new value
  await Movie.updateOne(
    { _id: movieId },
    {
      $set: {
        ...newValues,
      },
    }
  );

  //send appropriate response
  return res.status(200).send({ message: "Movie is updated successfully." });
});
export default router;
