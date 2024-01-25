import express from "express";
import { validateReqBody } from "../middleware/user.middleware.js";
import { checkMongoIdValidity } from "../utils/check.mongo.id.validatiy.js";
import { Movie } from "./movies.model.js";
import { movieValidationSchema } from "./movies.validation.js";

const router = express.Router();

// add movie
router.post(
  "/movie/add",
  validateReqBody(movieValidationSchema),
  async (req, res) => {
    const newMovie = req.body;

    await Movie.create(newMovie);

    return res.status(200).send({ message: "Movie is added successfully." });
  }
);
// get movie details

router.get("/movie/details/:id", checkMongoIdValidity, async (req, res) => {
  const movieId = req.params.id;

  // find movie
  const movie = await Movie.findOne({ _id: movieId });

  // if not movie, throw error
  if (!movie) {
    return res.status(404).send({ message: "Movie does not exist." });
  }

  // send movie details as response

  return res.status(200).send(movie);
});
// delete movie
router.delete("/movie/delete/:id", checkMongoIdValidity, async (req, res) => {
  // extract id from req.params
  const movieId = req.params.id;

  // find movie
  const movie = await Movie.findOne({ _id: movieId });

  // if not movie, throw error
  if (!movie) {
    return res.status(404).send({ message: "Movie does not exist." });
  }

  // delete movie
  await Movie.deleteOne({ _id: movieId });

  // send response
  return res.status(200).send({ message: "Movie deleted successfully." });
});
// edit movie
router.put(
  "/movie/edit/:id",
  checkMongoIdValidity,
  validateReqBody(movieValidationSchema),
  async (req, res) => {
    // extract id from req.params
    const movieId = req.params.id;

    // extract new values from req.body
    const newValues = req.body;

    // find movie
    const movie = await Movie.findOne({ _id: movieId });

    // if not movie,throw error
    if (!movie) {
      return res.status(404).send({ message: "Movie does not exist." });
    }

    // edit movie
    await Movie.updateOne(
      { _id: movieId },
      {
        $set: {
          ...newValues,
        },
      }
    );

    // send response

    return res.status(200).send({ message: "Movie is updated successfully." });
  }
);

//get all movie
router.get("/movies", async (req, res) => {
  const allMovies = await Movie.find();
  return res.status(200).send(allMovies);
});
export default router;
