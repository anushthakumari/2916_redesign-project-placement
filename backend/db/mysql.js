const mysql = require("mysql2/promise");
const bcrypt = require("bcryptjs");
require("dotenv").config();
const jwt = require("jsonwebtoken");

// Create a connection pool and export it
let pool;

const initializeTables = async (connection) => {
	console.log("Started tables check, creating if none");
	await createStudentTable(connection);
	await createStaffTable(connection);
	await createProjectTable(connection);
	await createAssignmentTable(connection);
};

const connectoToDb = async () => {
	try {
		pool = await mysql.createPool({
			host: "localhost",
			user: "root",
			password: "",
			database: "placement_project",
			waitForConnections: true,
			connectionLimit: 10,
			queueLimit: 0,
		});
		console.log("connected to DB");
		await initializeTables(pool);
		console.log("tables checked----");
	} catch (error) {
		console.log(error);
	}
};

const getPool = () => {
	if (!pool) {
		throw new Error(
			"Database pool not initialized. Make sure to call connectToDb first."
		);
	}
	return pool;
};

// tables creation functions
const createAssignmentTable = async (connection) => {
	connection.execute(`
    CREATE TABLE IF NOT EXISTS assignments (
      id INT AUTO_INCREMENT PRIMARY KEY,
      studentId INT,
      projectId INT NOT NULL,
      FOREIGN KEY (studentId) REFERENCES students(id),
      FOREIGN KEY (projectId) REFERENCES projects(id)
    ) ENGINE=InnoDB;
  `);
};

const createProjectTable = async (connection) => {
	connection.execute(`
    CREATE TABLE IF NOT EXISTS projects (
      id INT AUTO_INCREMENT PRIMARY KEY,
      projectTitle VARCHAR(255) NOT NULL,
      supervisorEmail VARCHAR(255) NOT NULL,
      supervisorName VARCHAR(255) NOT NULL,
      description TEXT NOT NULL,
      postedDateTime DATETIME DEFAULT CURRENT_TIMESTAMP,
      difficultyRating FLOAT NOT NULL,
      staffId INT,
      techStack TEXT,
      FOREIGN KEY (staffId) REFERENCES staff(id)
    );
  `);
};

const createStaffTable = async (connection) => {
	connection.execute(`
    CREATE TABLE IF NOT EXISTS staff (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      password VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      staffId VARCHAR(255) NOT NULL,
      moduleLeader BOOLEAN NOT NULL,
      moduleId VARCHAR(255)
    );
  `);
};

const createStudentTable = async (connection) => {
	await connection.execute(`
    CREATE TABLE IF NOT EXISTS students (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      password VARCHAR(255) NOT NULL,
      studentId VARCHAR(255) NOT NULL,
      degree VARCHAR(255) NOT NULL,
      subCourse VARCHAR(255) NOT NULL,
      entryYear VARCHAR(255) NOT NULL,
      modeType VARCHAR(255) NOT NULL
    );
  `);
};

exports.connectoToDb = connectoToDb;
exports.connection = getPool;
