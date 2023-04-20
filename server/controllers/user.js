import User from "../models/User.js";
import bcrypt from "bcrypt";

// READ
export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

// CREATE
export const createUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
      role: "User",
      picturePath: req.file ? req.file.filename : "",
    });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
