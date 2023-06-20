import mongoose from "mongoose";
import { Schema } from "mongoose";

const userSchema = new Schema({
  userName: String,
  googleId: String,
  email: String,
});

const User = mongoose.model("user", userSchema);

//const User = await Mongoclient.db.colection("user", userSchema);

export default User;
