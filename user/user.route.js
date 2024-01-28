import express from "express";
import { addUserSchema } from "./user.validation.js";
import { User } from "./user.model.js";
import { validateReqBody } from "../middleware/user.middleware.js";
import { checkMongoIdValidity } from "../utils/check.mongo.id.validatiy.js";
import * as bcrypt from "bcrypt";
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

  // hash password using bcrypt
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(newUser.password, saltRounds);
  newUser.password = hashedPassword;

  // create user
  await User.create(newUser);
  // send response
  return res.status(200).send({ message: "New user register successfully." });
});

//get user by id
router.get("/user/details/:id", checkMongoIdValidity, async (req, res) => {
  const userId = req.params.id;
  //find user
  const user = await User.findOne({ _id: userId });
  //if no user, throw error
  if (!user) {
    return res.status(404).send({ message: "User does not exist." });
  }
  //send appropriate response
  return res.status(200).send(user);
});

//get all users
router.get("/users", async (req, res) => {
  // find all users
  const allUser = await User.find();
  return res.status(200).send(allUser);
});

//delete user by id
router.delete("/user/delete/:id", checkMongoIdValidity, async (req, res) => {
  const userId = req.params.id;

  // find user
  const user = await User.findOne({ _id: userId });
  // if no user, throw error,
  if (!user) {
    return res.status(404).send({ message: "User does not exists." });
  }
  // delete user
  await User.deleteOne({ _id: userId });

  // send response
  return res.status(200).send({ message: "User is deleted successfully." });
});

// edti user by id
router.put(
  "/user/edit/:id",
  checkMongoIdValidity,
  validateReqBody(addUserSchema),
  async (req, res) => {
    // extract id from req.params
    const userId = req.params.id;

    // extract new values from req.body
    const newValues = req.body;

    // find movie
    const user = await User.findOne({ _id: userId });

    // if not movie,throw error
    if (!user) {
      return res.status(404).send({ message: "User does not exist." });
    }

    // edit movie
    await User.updateOne(
      { _id: userId },
      {
        $set: {
          ...newValues,
        },
      }
    );

    // send response

    return res.status(200).send({ message: "User is updated successfully." });
  }
);

export default router;
