import express from "express";
import connectDb from "./connect.db.js";
import movieRoute from "./movies/movies.route.js";
const app = express();

//to make app understand json
app.use(express.json());

//connect DB
connectDb();

//register routes
app.use(movieRoute);

//port number and server here
const port = 6000;

app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
