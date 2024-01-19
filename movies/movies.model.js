// model is table

import mongoose from "mongoose";

//set rules (schema)
const movieSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  genre: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
    min: 0,
  },
});

//create table
export const Movie = mongoose.model("Movies", movieSchema);
