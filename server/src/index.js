import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { userRouter } from "./routes/users.js";
import { recipesRouter } from "./routes/recipes.js";
import dotenv from 'dotenv';
dotenv.config();

const app = express();

//convert data from front end into json
app.use(express.json());
app.use(cors());

app.use("/api/auth", userRouter);
app.use("/api/recipes", recipesRouter);

mongoose.connect(
  process.env.MONGO_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
console.log(process.env.PORT);
app.listen(process.env.PORT, () => console.log("Server started"));
export default app;