import mongoose from "mongoose";

const AreaSchema = new mongoose.Schema(
    {
        name: String,
    },
    {timestamps: true}
);

const Area = mongoose.model("Area", AreaSchema);
export default Area;