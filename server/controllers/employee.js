import Employee from "../models/Employee.js";

// READ
export const getEmployeesOrg = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
