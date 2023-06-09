import Employee from "../models/Employee.js";
import Area from "../models/Area.js";
import Proyect from "../models/Proyect.js";
import fs from "fs-extra";

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
    const {
      firstName,
      lastName,
      email,
      status,
      phoneNumber,
      nodeFatherId,
      proyectId,
      areaId,
      position,
    } = req.body;
    let proyect = null;
    if (proyectId) {
      proyect = await Proyect.findById(proyectId);
    }
    const area = await Area.findById(areaId);
    const newEmployee = new Employee({
      firstName,
      lastName,
      email,
      status,
      phoneNumber,
      nodeFatherId,
      proyectId,
      proyectName: proyect ? proyect.name : "",
      areaId,
      areaName: area ? area.name : "",
      position,
      picturePath: req.file ? req.file.filename : "",
    });
    const savedEmployee = await newEmployee.save();
    res.status(201).json(savedEmployee);
  } catch (error) {
    console.log(error);
    res.status(409).json({ message: error.message });
  }
};

// UPDATE
export const editEmployee = async (req, res) => {
  try {
    const { employeeId } = req.params;
    const {
      firstName,
      lastName,
      email,
      status,
      phoneNumber,
      proyectId,
      areaId,
      position,
    } = req.body;
    const employee = await Employee.findById(employeeId);
    let proyect = null;
    if (proyectId) {
      proyect = await Proyect.findById(proyectId);
    }
    const area = await Area.findById(areaId);

    let befPicturePath = employee.picturePath;

    if (req.file) {
      fs.unlink("./public/assets/employees/" + befPicturePath, function (err) {
        if (err) throw err;
        console.log("File deleted!");
      });
      befPicturePath = req.file.filename;
    }

    const updatedEmployee = await Employee.findByIdAndUpdate(
      employeeId,
      {
        firstName,
        lastName,
        email,
        status,
        phoneNumber,
        proyectId,
        proyectName: proyect ? proyect.name : "",
        areaId,
        areaName: areaId ? area.name : "",
        position,
        picturePath: befPicturePath,
      },
      { new: true }
    );

    res.status(200).json(updatedEmployee);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

// DELETE
export const deleteEmployee = async (req, res) => {
  try {
    const { employeeId } = req.params;
    const deletedEmployee = await Employee.findByIdAndDelete(employeeId);
    const filePath = "./public/assets/employees/" + deletedEmployee.picturePath;
    if (fs.existsSync(filePath)) {
      fs.unlink(filePath, function (err) {
        if (err) throw err;
        console.log("File deleted!");
      });
    }
    const employeesToDelete = await Employee.find({ nodeFatherId: employeeId });
    for (const employee of employeesToDelete) {
      const deletedEmployee = await Employee.findByIdAndDelete(employee._id);
      const filePath =
        "./public/assets/employees/" + deletedEmployee.picturePath;
      if (fs.existsSync(filePath)) {
        fs.unlink(filePath, function (err) {
          if (err) throw err;
          console.log("File deleted!");
        });
      }
    }
    res.status(200).json(deletedEmployee);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
