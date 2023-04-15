import mongoose from "mongoose";

const EmployeeSchema = new mongoose.Schema(
    {
        firstName: String,
        lastName: String,
        email: {type: String, unique: true},
        password: String,
        status: String,
        phoneNumber: String,
        nodeFatherId: String,
        proyectId: String,
        proyectName: String,
        areaId: String,
        areaName: String,
        position: String,
        picturePath: {type: String, default: ""},
    },  
    {timestamps: true}
);

const Employee = mongoose.model("Employee", EmployeeSchema);
export default Employee;