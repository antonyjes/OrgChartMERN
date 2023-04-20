import User from "../models/User.js";

// READ
export const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(409).json({message: error.message});
    }
}