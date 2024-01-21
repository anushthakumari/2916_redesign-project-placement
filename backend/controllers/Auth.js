require("dotenv").config()
const { sanitizeUser } = require("../common/common")
const { connectoToDb, connection } = require("../db/mysql")

const Staff = require("../model/Staff")
const Student = require("../model/Student")
const bcrypt=require("bcryptjs")
const jwt=require('jsonwebtoken')



exports.createStaff = async (req, res) => {
  try {
    const pool=await connection()
    const { staffId, name, email, password, moduleLeader, moduleId } = req.body;

    // Check if a staff member with the same staffId already exists
    const [existingStaffRows] = await pool.execute(
      'SELECT * FROM staff WHERE staffId = ?',
      [staffId]
    );

    if (existingStaffRows.length > 0) {
      return res.status(400).json({ message: 'Staff member already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Execute an SQL query to insert a new staff member
    const [result] = await pool.execute(
      'INSERT INTO staff (name, email, staffId, password, moduleLeader, moduleId) VALUES (?, ?, ?, ?, ?, ?)',
      [name, email, staffId, hashedPassword, moduleLeader, moduleId]
    );

    // Check if the insertion was successful and get the assigned ID
    if (result.affectedRows === 1) {
      const newStaff = {
        id: result.insertId,
        staffId,
        name,
        email,
        moduleLeader,
        moduleId,
      };
      res.status(201).json(newStaff);
    } else {
      res.status(500).json({ message: 'Failed to create the staff member.' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message:error});
  }

};

exports.createStudent = async (req, res) => {
  try {
    const pool=await connection()
    if (!connection) {
        return res.status(500).json({ message: 'Database connection not established' });
      }
    
    const { id, name, password, degree, subCourse, entryYear, modeType } = req.body;

    // Check if a student with the same ID already exists
    const [existingStudentRows] = await pool.execute(
      'SELECT * FROM students WHERE studentId = ?',
      [id]
    );

    if (existingStudentRows.length > 0) {
      return res.status(400).json({ message: 'Student already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Execute an SQL query to insert a new student
    const [result] = await pool.execute(
      'INSERT INTO students (name, password, studentId, degree, subCourse, entryYear, modeType) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [name, hashedPassword, id, degree, subCourse, entryYear, modeType]
    );

    // Check if the insertion was successful and get the assigned ID
    if (result.affectedRows === 1) {
      const newStudent = {
        id: result.insertId,
        id,
        name,
        degree,
        subCourse,
        entryYear,
        modeType,
      };
      res.status(201).json(newStudent);
    } else {
      res.status(500).json({ message: 'Failed to create the student.' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }

};

exports.loginStaff = async (req, res) => {
  try {
    const pool=await connection()
    const { staffId, password } = req.body;

    // Execute an SQL query to check if a staff member with the provided staffId exists
    const [staffRows] = await pool.execute(
      'SELECT * FROM staff WHERE staffId = ?',
      [staffId]
    );

    if (staffRows.length === 0) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const staff = staffRows[0];

    // Compare the provided password with the hashed password in the database
    const passwordMatch = await bcrypt.compare(password, staff.password);

    if (!passwordMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // If credentials are valid, create a JWT token
    const payload = {
      id: staff.id,
      staffId: staff.staffId,
      name: staff.name,
      email: staff.email,
      moduleLeader: staff.moduleLeader,
      moduleId: staff.moduleId,
      role: 'staff',
    };

    const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '24hr' });

    res.cookie('token', token, {
      path: '/',
      expires: new Date(Date.now() + 60 * 60 * 1000),
      httpOnly: true,
      sameSite: 'lax',
    });

    res.status(200).json(payload);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.loginStudent = async (req, res) => {
    try {
      const pool=await connection()
      const { id, password } = req.body;
  
      // Execute an SQL query to check if a student with the provided studentId exists
      const [studentRows] = await pool.execute(
        'SELECT * FROM students WHERE studentId = ?',
        [id]
      );
  
      if (studentRows.length === 0) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
  
      const student = studentRows[0];
  
      // Compare the provided password with the hashed password in the database
      const passwordMatch = await bcrypt.compare(password, student.password);
  
      if (!passwordMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
  
      // If credentials are valid, create a JWT token
      const payload = {
        id: student.id,
        studentId: student.studentId,
        name: student.name,
        degree: student.degree,
        subCourse: student.subCourse,
        entryYear: student.entryYear,
        modeType: student.modeType,
        role: 'student',
      };
  
      const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '24hr' });
  
      res.cookie('token', token, {
        path: '/',
        expires: new Date(Date.now() + 60 * 60 * 1000),
        httpOnly: true,
        sameSite: 'lax',
      });
  
      res.status(200).json(payload);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Internal server error' });
    }
    
  };

exports.logout=async(req,res)=>{
    res.cookie('token',null,{expires:new Date(Date.now()),httpOnly:true}).sendStatus(200)
}

exports.checkAuth=async(req,res)=>{
    if(req.user){
        return res.status(200).json(req.user)
    }
    else{
        return res.sendStatus(401);
    }
}