import mongoose from "mongoose";

const StudentSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
});

const StudentModel = mongoose.model("student", StudentSchema);

export default StudentModel;
