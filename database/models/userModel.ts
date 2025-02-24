import { models, model, Schema } from "mongoose";

interface User {
  name: string;
  username: string;
  email: string;
  password: string;
  verifyCode: string;
  isVerified: boolean;
}

const userSchema = new Schema({
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  password: { type: String, required: true, minlength: 6 },
  verifyCode: { type: String, required: true, minlength: 4 },
  isVerified: { type: Boolean, required: true, default: false },
});

const User = models.User || model("User", userSchema);

export default User;
