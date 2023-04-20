import Area from "../models/Area.js";
import Employee from "../models/Employee.js";

// READ
export const getAreas = async (req, res) => {
  try {
    const areas = await Area.find();
    res.status(200).json(areas);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

// CREATE
export const createArea = async (req, res) => {
  try {
    const { name } = req.body;
    const newArea = new Area({
      name,
    });
    const savedArea = await newArea.save();
    res.status(201).json(savedArea);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

// UPDATE
export const editArea = async (req, res) => {
  try {
    const { areaId } = req.params;
    const { name } = req.body;
    const updatedArea = await Area.findByIdAndUpdate(
      areaId,
      { name },
      { new: true }
    );
    await Employee.updateMany({ areaId: areaId }, { areaName: name });
    res.status(200).json(updatedArea);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

// DELETE
export const deleteArea = async (req, res) => {
  try {
    const { areaId } = req.params;
    const deletedArea = await Area.findByIdAndDelete(areaId);
    res.status(200).json(deletedArea);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
