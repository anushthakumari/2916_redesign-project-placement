const { sanitizeUser } = require("../common/common")
const Staff = require("../model/Staff")
const { connectoToDb, connection } = require("../db/mysql")

// get Staff
exports.getById = async (req, res) => {
  const pool=await connection()
  const { id } = req.params;

  try {
    // Execute an SQL query to select a staff member by their ID
    const [staffRows] = await pool.execute(
      'SELECT id, name, email, staffId, moduleLeader, moduleId FROM staff WHERE id = ?',
      [id]
    );

    // Check if a staff member with the provided ID exists
    if (staffRows.length === 0) {
      return res.status(404).json({ message: 'Staff member not found' });
    }

    const staff = staffRows[0];

    // Remove the password field from the staff object
    delete staff.password;

    res.status(200).json(staff);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }

};


// update Staff
exports.updateById = async (req, res) => {
  const pool=await connection()
  const { id } = req.params;

  try {
    const {
      name,
      email,
      staffId,
      moduleLeader,
      moduleId,
    } = req.body;

    // Execute an SQL query to update the staff member by their ID
    const [result] = await pool.execute(
      'UPDATE staff SET name = ?, email = ?, staffId = ?, moduleLeader = ?, moduleId = ? WHERE id = ?',
      [name, email, staffId, moduleLeader, moduleId, id]
    );

    // Check if the update was successful
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Staff member not found' });
    }

    // Execute an SQL query to select the updated staff member
    const [updatedStaffRows] = await pool.execute(
      'SELECT id, name, email, staffId, moduleLeader, moduleId FROM staff WHERE id = ?',
      [id]
    );

    const updatedStaff = updatedStaffRows[0];

    res.status(200).json(updatedStaff);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }

};


// delete Staff
exports.deleteById = async (req, res) => {
  const { id } = req.params;
  const pool=await connection()

  try {
    // Execute an SQL query to delete a staff member by their ID
    const [result] = await pool.execute('DELETE FROM staff WHERE id = ?', [id]);

    // Check if the deletion was successful
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Staff member not found' });
    }

    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
