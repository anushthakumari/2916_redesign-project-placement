const { sanitizeUser } = require("../common/common");
const User = require("../model/Student");
const { connectoToDb, connection } = require("../db/mysql")

// get user
exports.getById = async (req, res) => {
  const { id } = req.params;
  const pool=await connection()

  try {
    // Execute an SQL query to select a student by their ID
    const [studentRows] = await pool.execute(
      'SELECT id, name, studentId, degree, subCourse, entryYear, modeType FROM students WHERE id = ?',
      [id]
    );

    // Check if a student with the provided ID exists
    if (studentRows.length === 0) {
      return res.status(404).json({ message: 'Student not found' });
    }

    const student = studentRows[0];

    // Remove the password field from the student object
    delete student.password;

    res.status(200).json(student);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }

};


// update user
exports.updateById = async (req, res) => {
  const { id } = req.params;
  const pool=await connection()

  try {
    const {
      name,
      studentId,
      degree,
      subCourse,
      entryYear,
      modeType,
    } = req.body;

    // Execute an SQL query to update the student by their ID
    const [result] = await pool.execute(
      'UPDATE students SET name = ?, studentId = ?, degree = ?, subCourse = ?, entryYear = ?, modeType = ? WHERE id = ?',
      [name, studentId, degree, subCourse, entryYear, modeType, id]
    );

    // Check if the update was successful
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Student not found' });
    }

    // Execute an SQL query to select the updated student
    const [updatedStudentRows] = await pool.execute(
      'SELECT id, name, studentId, degree, subCourse, entryYear, modeType FROM students WHERE id = ?',
      [id]
    );

    const updatedStudent = updatedStudentRows[0];

    res.status(200).json(updatedStudent);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }

};


// delete user
exports.deleteById = async (req, res) => {
  const { id } = req.params;
  const pool=await connection()

  try {
    // Execute an SQL query to delete a student by their ID
    const [result] = await pool.execute('DELETE FROM students WHERE id = ?', [id]);

    // Check if the deletion was successful
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

