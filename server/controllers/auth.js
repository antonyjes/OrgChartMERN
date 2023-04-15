import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";
import User from "../models/User.js";

// REGISTER
export const registerAdmin = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    const newAdmin = new Admin({
      firstName,
      lastName,
      email,
      password: passwordHash,
      role: "Admin",
      picturePath: req.file ? req.file.filename : "",
    });
    const savedAdmin = await newAdmin.save();
    res.status(201).json(savedAdmin);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// LOGIN
export const login = async (req, res) => {
  try {
    const { typeUser } = req.body;
    let user;
    if (typeUser === "Admin") {
      const { email, password } = req.body;
      user = await Admin.findOne({ email: email });
      if (!user) return res.status(400).json({ msg: "User doesn't exist." });
      const isMatch = bcrypt.compare(password, user.password);
      if (!isMatch)
        return res.status(400).json({ msg: "Invalid credentials." });
    } else if (typeUser === "User") {
      const { email, password } = req.body;
      user = await User.findOne({ email: email });
      if (!user) return res.status(400).json({ msg: "User doesn't exist." });
      const isMatch = bcrypt.compare(password, user.password);
      if (!isMatch)
        return res.status(400).json({ msg: "Invalid credentials." });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
    delete user.password;
    res.status(200).json({ user, token });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};
