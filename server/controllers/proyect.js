import Proyect from "../models/Proyect.js";
import Employee from "../models/Employee.js";

// READ
export const getProyects = async (req, res) => {
  try {
    const proyects = await Proyect.find();
    res.status(201).json(proyects);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

// CREATE
export const createProyect = async (req, res) => {
  try {
    const { name, description, status, dateInit, dateEnd } = req.body;
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
    res.status(409).json({ message: error.message });
  }
};

// UPDATE
export const editProyect = async (req, res) => {
  try {
    const { proyectId } = req.params;
    const { name, description, status, dateInit, dateEnd } = req.body;
    const updatedProyect = await Proyect.findByIdAndUpdate(
      proyectId,
      { name, description, status, dateInit, dateEnd },
      { new: true }
    );
    await Employee.updateMany({ proyectId: proyectId }, { proyectName: name });
    res.status(201).json(updatedProyect);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

// DELETE
export const deleteProyect = async (req, res) => {
  try {
    const { proyectId } = req.params;
    const deletedProyect = await Proyect.findByIdAndDelete(proyectId);
    res.status(201).json(deletedProyect);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
