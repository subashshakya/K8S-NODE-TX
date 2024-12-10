import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema({
  id: { type: mongoose.Types.ObjectId },
  username: {
    type: String,
    required: [true, "Username is required"],
    unique: [true, "Username already taken"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: [true, "Email already exists"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minLength: 8,
    maxLength: 255,
  },
  firstName: {
    type: String,
    required: true,
  },
  middleName: {
    type: String,
  },
  lastName: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: Number,
    min: 10,
    max: 10,
    required: true,
  },
  joinedDate: {
    type: Date,
    default: Date.now(),
  },
  profilePicture: {
    type: Buffer,
    required: true,
  },
});

const User = mongoose.model("User", userSchema);

export default User;
