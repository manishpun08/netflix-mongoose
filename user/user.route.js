import express from "express";
import { addUserSchema } from "./user.validation.js";
import { User } from "./user.model.js";
import { validateReqBody } from "../middleware/user.middleware.js";

const router = express.Router();

// add user

router.post("/user/add", validateReqBody(addUserSchema), async (req, res) => {
  // extract new user from req.body
  const newUser = req.body;

  //   check if user with email already exists
  const user = await User.findOne({ email: newUser.email });

  // if user, throw error
  if (user) {
    return res
      .status(409)
      .send({ message: "User with this email already exists." });
  }
  //create user
  await User.create(newUser);
  //send proper response
  return res.status(201).send({ message: "User is added successfully." });
});

export default router;
