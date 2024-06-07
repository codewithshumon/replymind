/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

import User from "./../models/UserSchema.js";

export const signup = async (req, res) => {
  const { name, email, password, profession, photo, category } = req.body;

  try {
    let user = await User.findOne({ email });

    //checking if the user exist
    if (user) {
      return res.status(400).json({ message: "User already exist" });
    }

    if (!name || !email || !password || !profession || !category) {
      return res
        .status(400)
        .json({ success: false, message: "Please filled all inputs" });
    }

    //make the password hash
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    user = new User({
      name,
      email,
      password: hashPassword,
      photo,
      category,
      profession,
    });

    await user.save();
    res
      .status(200)
      .json({ success: true, message: "User successfully created" });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error. Try again later",
    });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  //can't use password direcly to compare. if do then err: can't access befoer insitializ
  const userPassword = password;

  try {
    let user = await User.findOne({ email });

    //checking if user exist or not
    if (!user) {
      console.log("user", user);
      return res.status(404).json({ message: "User not found" });
    }

    //compare password with database haspassword
    const isPasswordMatch = await bcrypt.compare(userPassword, user.password);

    if (!isPasswordMatch) {
      return res
        .status(400)
        .json({ status: false, message: "Invalid creadentials" });
    }

    //get token
    const token = generateToken(user);

    const { password, ...rest } = user._doc;

    res.status(200).json({
      status: true,
      message: "Successfully logged in",
      token,
      data: { ...rest },
    });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ status: false, message: "Failed to login" });
  }
};

const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, profession: user.profession },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "7d" }
  );
};
