const { connectoToDb, connection } = require("../db/mysql");
const Project = require("../model/Projects");
const nodemailer = require("nodemailer");

const mailId='demo@gmail.com'
const mailPassword='demopassword'

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: mailId,
    pass: mailPassword,
  },
});

exports.create = async (req, res) => {
  const pool = await connection();
  try {
    const {
      projectTitle,
      supervisorEmail,
      supervisorName,
      description,
      difficultyRating,
      staffId,
      techStack,
    } = req.body;

    // Execute an SQL query to insert a new project
    const [result] = await pool.execute(
      "INSERT INTO projects (projectTitle, supervisorEmail, supervisorName, description, difficultyRating, staffId, techStack) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [
        projectTitle,
        supervisorEmail,
        supervisorName,
        description,
        difficultyRating,
        staffId,
        techStack,
      ]
    );

    // Check if the insertion was successful and get the assigned ID
    if (result.affectedRows === 1) {
      const newProject = await {
        id: result.insertId,
        projectTitle,
        supervisorEmail,
        supervisorName,
        description,
        difficultyRating,
        staffId,
      };
      res.status(201).json(newProject);
    } else {
      res.status(500).json({ message: "Failed to create the project." });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getAll = async (req, res) => {
  const pool = await connection();
  try {
    // Execute an SQL query to fetch all projects from the 'projects' table
    const [projectRows] = await pool.execute("SELECT * FROM projects");

    // If there are no projects, respond with an empty array
    const fetchedProjects = projectRows || [];

    res.status(200).json(fetchedProjects);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getById = async (req, res) => {
  const pool = await connection();
  const { id } = req.params;

  try {
    // Execute an SQL query to select a project by its ID
    const [projectRows] = await pool.execute(
      "SELECT * FROM projects WHERE id = ?",
      [id]
    );

    // Check if a project with the provided ID exists
    if (projectRows.length === 0) {
      return res.status(404).json({ message: "Project not found" });
    }

    const fetchedProject = projectRows[0];

    res.status(200).json(fetchedProject);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getByProfessorId = async (req, res) => {
  const { id } = req.params;
  const pool = await connection();
  try {
    // Execute an SQL query to select all projects associated with a professor by their ID
    const [projectRows] = await pool.execute(
      "SELECT * FROM projects WHERE staffId = ?",
      [id]
    );

    // If there are no projects associated with the professor, respond with an empty array
    const fetchedProjects = projectRows || [];

    res.status(200).json(fetchedProjects);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.updateById = async (req, res) => {
  const { id } = req.params;
  const pool = await connection();
  try {
    const {
      projectTitle,
      supervisorEmail,
      supervisorName,
      description,
      difficultyRating,
      staffId,
    } = req.body;

    // Execute an SQL query to update the project by its ID
    const [result] = await pool.execute(
      "UPDATE projects SET projectTitle = ?, supervisorEmail = ?, supervisorName = ?, description = ?, difficultyRating = ?, staffId = ? WHERE id = ?",
      [
        projectTitle,
        supervisorEmail,
        supervisorName,
        description,
        difficultyRating,
        staffId,
        id,
      ]
    );

    // Check if the update was successful
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Project not found" });
    }

    // Execute an SQL query to select the updated project
    const [updatedProjectRows] = await pool.execute(
      "SELECT * FROM projects WHERE id = ?",
      [id]
    );

    const updatedProject = updatedProjectRows[0];

    res.status(200).json(updatedProject);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.deleteById = async (req, res) => {
  const pool = await connection();
  const { id } = req.params;

  try {
    // Fetch the project by its ID before deleting it
    const [projectRows] = await pool.execute(
      "SELECT * FROM projects WHERE id = ?",
      [id]
    );

    // Check if the project exists
    if (projectRows.length === 0) {
      return res.status(404).json({ message: "Project not found" });
    }

    const deletedProject = projectRows[0];

    // Execute an SQL query to delete the project by its ID
    const [deleteProjectResult] = await pool.execute(
      "DELETE FROM projects WHERE id = ?",
      [id]
    );

    // Check if the project deletion was successful
    if (deleteProjectResult.affectedRows === 1) {
      return res.status(200).json(deletedProject);
    } else {
      return res.status(500).json({ message: "Failed to delete the project" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.sendProjectApplyMail = async () => {
  try {
    const mailOptions = {
      from: mailId,
      to: req.body.receivermail,
      subject: req.body.subject,
      html: req.body.body,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({'message':"Apply mail sent succesfully"})

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error sending project apply mail" });
  }
};
