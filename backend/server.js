const express = require("express");
const path = require("path");
const server = express();
const fs = require("fs");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const multer = require("multer");
const staffRoutes = require("./routes/Staff");
const studentRoutes = require("./routes/Student");
const authRoutes = require("./routes/Auth");
const projectRoutes = require("./routes/Project");
const assingmentRoutes = require("./routes/Assingment");
const { verifyToken } = require("./middleware/Auth");
const assignmentsController = require("./controllers/Assingment");
const { connectoToDb } = require("./db/mysql");

connectoToDb();

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		if (!fs.existsSync("./uploads/")) {
			fs.mkdirSync("./uploads/");
		}
		cb(null, "./uploads/");
	},
	filename: (req, file, cb) => {
		const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
		cb(
			null,
			file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
		);
	},
});

const upload = multer({ storage: storage });

// middlewares
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(cors({ origin: "http://localhost:3000", credentials: true }));
server.use(morgan("tiny"));
server.use(cookieParser());

// route middlewares
server.use(
	"/upload-report",
	upload.single("file"),
	assignmentsController.reportUpload
);
server.use("/staff", verifyToken, staffRoutes);
server.use("/student", verifyToken, studentRoutes);
server.use("/auth", authRoutes);
server.use("/projects", verifyToken, projectRoutes);
server.use("/assignments", verifyToken, assingmentRoutes);

server.get("/", (req, res) => {
	res.status(200).json({ message: "running" });
});

server.listen(8000, () => {
	console.log("server [STARTED] ~ http://localhost:8000");
});
