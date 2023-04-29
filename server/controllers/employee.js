import Employee from "../models/Employee.js";
import Area from "../models/Area.js";
import Proyect from "../models/Proyect.js";

// READ
export const getEmployeesOrg = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

// CREATE
export const createEmployee = async (req, res) => {
  try {
    const {firstName, lastName, email, phoneNumber, nodeFatherId, proyectId, areaId, position} = req.body;
    const proyect = await Proyect.findById(proyectId);
    const area = await Area.findById(areaId);
    const newEmployee = new Employee({
      firstName,
      lastName,
      email,
      status: "Active",
      phoneNumber,
      nodeFatherId,
      proyectId,
      proyectName: proyectId ? proyect.name : "",
      areaId,
      areaName: areaId ? area.name : "",
      position,
      picturePath: req.file ? req.file.filename : "",
    });
    const savedEmployee = await newEmployee.save();
    res.status(201).json(savedEmployee);
  } catch (error) {
    res.status(409).json({message: error.message});
  }
}