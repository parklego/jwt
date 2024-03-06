import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import StudentModel from "./models/Student.js";

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/school");

const db = mongoose.connection;

const handleError = (error) => console.log("DB Error", error);
const handleOpen = () => console.log("Connected to DB");

db.on("error", handleError);
db.once("open", handleOpen);

app.post("/register", (req, res) => {
  const { username, password, email } = req.body;
  StudentModel.create({ username, password, email })
    .then((data) => res.json(data))
    .catch((err) => res.json(err));
});

app.listen(3001, () => {
  console.log("Server is running");
});
