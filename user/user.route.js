import express from "express";
import { addUserSchema } from "./user.validation.js";
import { User } from "./user.model.js";

const router = express.Router();

// add user

router.post("/user/add", async (req, res) => {
  // extract new user from req.body
  const newUser = req.body;

  // validate the new user
  let validatedUserData;
  try {
    validatedUserData = await addUserSchema.validate(newUser);
  } catch (error) {
    return res.status(400).send({ message: error.message });
  }

  //   check if user with email already exists
  const user = await User.findOne({ email: newUser.email });

  // if user, throw error
  if (user) {
    return res
      .status(409)
      .send({ message: "User with this email already exists." });
  }

  await User.create(validatedUserData);

  return res.status(201).send({ message: "User is added successfully." });
});

export default router;
