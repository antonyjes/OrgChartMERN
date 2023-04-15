import mongoose from "mongoose";

const ProyectSchema = new mongoose.Schema(
    {
        name: String,
        description: String,
        status: String,
        dateInit: Date,
        dateEnd: Date,
    },
    {timestamps: true}
);

const Proyect = mongoose.model("Proyect", ProyectSchema);
export default Proyect;