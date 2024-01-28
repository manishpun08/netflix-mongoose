import mongoose from "mongoose";

// set rule(schema)

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    maxlength: 55,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    maxlength: 55,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    maxlength: 55,
    required: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    max_length: 20,
    min_length: 6,
    trim: true,
  },
  dob: {
    type: Date,
    required: false,
    default: null,
  },
  gender: {
    type: String,
    required: false,
    default: null,
    enum: ["male", "female", "other"],
  },
});

// create table
export const User = mongoose.model("User", userSchema);
