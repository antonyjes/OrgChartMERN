import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import { v4 as uuidv4 } from "uuid";
import { registerAdmin } from "./controllers/auth.js";
import authRoutes from "./routes/auth.js";
import areaRoutes from "./routes/area.js";
import userRoutes from "./routes/user.js";
import employeeRoutes from "./routes/employee.js";
import { verifyToken } from "./middleware/auth.js";
import { createUser, editUser } from "./controllers/user.js";

//CONFIGURATIONS
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));
mongoose.set("strictQuery", true);

//FILE STORAGE
const adminStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets/admins");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + uuidv4();
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const userStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets/users");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + uuidv4();
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const adminUpload = multer({ storage: adminStorage });
const userUpload = multer({ storage: userStorage });

//ROUTES WITH FILES
app.post("/auth/registerAdmin", adminUpload.single("picture"), registerAdmin);
app.post(
  "/users/registerUser",
  userUpload.single("picture"),
  verifyToken,
  createUser
);
app.patch("/users/:userId/editUser", verifyToken, userUpload.single("picture"), editUser);

//ROUTES
app.use("/auth", authRoutes);
app.use("/areas", areaRoutes);
app.use("/users", userRoutes);
app.use("/employees", employeeRoutes);

//MOONGOSE SETUP
const PORT = process.env.PORT || 6001;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server port: ${PORT}`));
  })
  .catch((error) => console.log(error));
