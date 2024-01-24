import express from "express";
import connectDb from "./connect.db.js";
import movieRoute from "./movies/movies.route.js";
import userRoute from "./user/user.route.js";
const app = express();

//to make app understand json
app.use(express.json());

//connect DB
connectDb();

//register routes
app.use(movieRoute);
app.use(userRoute);

//port number and server here
const port = 6000;

app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
