const Student = require('../model/studentModel');
const { isValidObjectId } = require('mongoose');
const { isStrongPassword } = require('validator');

const getSingelStudent = async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id))
      res.status(400).json({ err: 'The id is not valid' });

    const student = await Student.findById(id);
    if (!student) res.status(400).json({ err: 'Student not found' });

    return res.status(200).json({ student });
  } catch (err) {
    console.error(err);
  }
};
const getAllStudent = async (req, res) => {
  try {
    const allStudent = await Student.find().sort({ createdAt: -1 });
    res.status(200).json(allStudent);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
};
const deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      return res.status(400).json({ err: 'The id is not valid' });
    }
    const student = await Student.findByIdAndDelete({ _id: id });
    if (!student) {
      return res.status(400).json({ err: 'Student not found' });
    }
    return res
      .status(200)
      .json({ message: 'Student has been successfully deleted.' });
  } catch (err) {
    console.error(err);
  }
};
const updateStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, password } = req.body;
    if (!isValidObjectId(id)) {
      return res.status(400).json({ err: 'The id is not valid' });
    }
    if (name.length < 3)
      return res
        .status(404)
        .json({ err: 'Please enter at least 3 characters' });
    if (password && !isStrongPassword(password))
      return res.status(404).json({
        err: 'Please enter a strong password (including numbers, special characters and lower and upper case together)',
      });
    const newValues = {};
    name && Object.assign(newValues, { name });
    password && Object.assign(newValues, { password });

    console.log(newValues);
    const student = await Student.findOneAndUpdate(
      { _id: id },
      { ...newValues },
    );

    if (!student) {
      return res.status(400).json({ err: 'Student not found' });
    }
    const updatedStudent = await Student.findById({ _id: id });
    return res.status(200).json({ updatedStudent });
  } catch (err) {
    console.error(err);
  }
};
const createStudent = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const emptyField = [];

    !name ? emptyField.push('name') : null;
    !email ? emptyField.push('email') : null;
    !password ? emptyField.push('password') : null;
    if (emptyField.length > 0) {
      return res
        .status(400)
        .json({ error: 'Please fill in all field', emptyField });
    }

    const student = await Student.create({
      name,
      email,
      password,
    });

    res.status(200).json({ student });
  } catch (err) {
    if (err.code === 11000) {
      return res
        .status(404)
        .json({ err: 'The email address is already in use' });
    }
    res.status(404).json({ err: 'Something went wrong' });

    console.error(err);
  }
};
module.exports = {
  getSingelStudent,
  getAllStudent,
  deleteStudent,
  updateStudent,
  createStudent,
};
