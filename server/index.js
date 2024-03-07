import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import StudentModel from "./models/Student.js";
import { varifyUser } from "./util/util.js";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);

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

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  StudentModel.findOne({ email })
    .then((user) => {
      if (user) {
        if (user.password === password) {
          const accessToken = jwt.sign(
            {
              email,
            },
            "access-token-secret-key",
            {
              expiresIn: "1m",
            }
          );
          const refreshToken = jwt.sign(
            {
              email,
            },
            "refresh-token-secret-key",
            {
              expiresIn: "5m",
            }
          );

          res.cookie("accessToken", accessToken, {
            maxAge: 60000,
          });
          res.cookie("refreshToken", refreshToken, {
            maxAge: 300000,
            httpOnly: true,
            secure: true,
            sameSite: "strict",
          });
          return res.json({ login: true });
        }
      } else {
        return res.json({ login: false, message: "Not allowed" });
      }
    })
    .catch((err) => {
      return res.json(err);
    });
});

app.get("/dashboard", varifyUser, (req, res) => {
  return res.json({
    valid: true,
    message: "authorized",
  });
});

app.listen(3001, () => {
  console.log("Server is running");
});
