import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  profession: {
    type: String,
    enum: ["marketer", "entrepreneur", "creator"],
    required: true,
  },
  category: { type: String, required: true },
  photo: { type: String },
  bio: { type: String },
});

export default mongoose.model("User", UserSchema);
