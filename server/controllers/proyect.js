import Proyect from "../models/Proyect.js";
import Employee from "../models/Employee.js";

// READ
export const getProyects = async (req, res) => {
    try {
        const proyects = await Proyect.find();
        res.status(201).json(proyects);
    } catch (error) {
        res.status(409).json({message: error.message});
    }
};

// CREATE
export const createProyect = async (req, res) => {
    try {
        const {name, description, status, dateInit, dateEnd} = req.body;
        const newProyect = new Proyect({
            name,
            description,
            status,
            dateInit,
            dateEnd,
        });
        const savedProyect = await newProyect.save();
        res.status(201).json(savedProyect);
    } catch (error) {
        res.status(409).json({message: error.message});
    }
}