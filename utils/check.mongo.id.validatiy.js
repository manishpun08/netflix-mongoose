import mongoose from "mongoose";

export const checkMongoIdValidity = (req, res, next) => {
  // extract id from req.params
  const id = req.params.id;

  // check for mongo id validity
  const isValidMongoId = mongoose.Types.ObjectId.isValid(id);

  // if not valid mongo id, throw error
  if (!isValidMongoId) {
    return res.status(400).send({ message: "Invalid mongo id." });
  }

  next();   
};
