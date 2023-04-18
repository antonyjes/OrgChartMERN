import Area from "../models/Area.js";

// READ
export const getAreas = async (req, res) => {
    try {
        const areas = await Area.find();
        res.status(200).json(areas);
    } catch (error) {
        res.status(409).json({message: error.message});
    }
}