import User from "../models/User.js";
import bcrypt from "bcrypt";
import fs from "fs-extra";

// READ
export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const getUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    res.status(200).json(user);
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

// UPDATE
export const editUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const { firstName, lastName, email, password } = req.body;
    const user = await User.findById(userId);

    let befPicturePath = user.picturePath;

    if (req.file) {
      fs.unlink("./public/assets/users/" + befPicturePath, function (err) {
        if (err) throw err;
        console.log("File deleted!");
      });
      befPicturePath = req.file.filename;
    }

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        firstName,
        lastName,
        email,
        password: password !== "" ? passwordHash : undefined,
        picturePath: befPicturePath,
      },
      { new: true }
    );

    res.status(201).json(updatedUser);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
