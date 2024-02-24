const { connectoToDb, connection } = require("../db/mysql");
const Assignment = require("../model/Assignment");

exports.create = async (req, res) => {
	try {
		const pool = await connection();
		const { studentId, projectId } = req.body;

		// Execute an SQL query to insert a new assignment
		const [result] = await pool.execute(
			"INSERT INTO assignments (studentId, projectId) VALUES (?, ?)",
			[studentId, projectId]
		);

		// Check if the insertion was successful and get the assigned ID
		if (result.affectedRows === 1) {
			const newAssignment = {
				id: result.insertId,
				studentId,
				projectId,
			};
			res.status(201).json(newAssignment);
		} else {
			res.status(500).json({ message: "Failed to create the assignment." });
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "Internal server error" });
	}
};

exports.getAll = async (req, res) => {
	const { id } = req.params;

	try {
		const pool = connection();
		// Execute an SQL query to fetch assignments for a specific student
		const [rows] = await pool.execute(
			"SELECT * FROM assignments WHERE studentId = ?",
			[id]
		);

		// Respond with the fetched assignments
		res.status(200).json(rows);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "Internal server error" });
	}
};

exports.getByStudentId = async (req, res) => {
	const { id } = req.params;

	try {
		const pool = await connection();
		// Execute an SQL query to retrieve assignments for a specific student along with project details
		const [rows] = await pool.execute(
			"SELECT a.id AS assignmentId, a.studentId, a.projectId, p.* FROM assignments AS a " +
				"INNER JOIN projects AS p ON a.projectId = p.id " +
				"WHERE a.studentId = ?",
			[id]
		);

		// Respond with the fetched assignments
		res.status(200).json(rows);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "Internal server error" });
	}
};

exports.deleteById = async (req, res) => {
	const { id } = req.params;

	try {
		const pool = await connection();

		const [deletedRow] = await pool.execute(
			"select * from assignments where id = ?",
			[id]
		);

		// Execute an SQL query to delete an assignment where staffId and studentId match
		const [result] = await pool.execute(
			"DELETE FROM assignments WHERE id = ?",
			[id]
		);

		// Check if the deletion was successful
		if (result.affectedRows > 0) {
			res.status(200).json(deletedRow[0]);
		} else {
			res.status(404).json({ message: "No matching assignments found" });
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "Internal server error" });
	}
};

exports.reportUpload = async (req, res) => {
	const uploadedFilePath = req.file?.path;
	const { studentId, projectId } = req.body;

	const pool = await connection();

	await pool.execute(
		"INSERT INTO reports (studentId, projectId, upload_path) VALUES (?, ?, ?)",
		[studentId, projectId, uploadedFilePath]
	);

	res.status(201).send("saved");
};
