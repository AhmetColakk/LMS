const Teacher = require('./../model/teacherModel');
const { isValidObjectId } = require('mongoose');
const { isStrongPassword } = require('validator');

const getTeacher = async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id))
      return res.status(400).json({ err: 'The id is not valid' });

    const teacher = await Teacher.findById(id);
    if (!teacher) return res.status(400).json({ err: 'Student not found' });

    return res.status(200).json({ teacher });
  } catch (err) {
    console.error(err);
  }
};

const createTeacher = async (req, res) => {
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

    const teacher = await Teacher.create({
      name,
      email,
      password,
    });

    res.status(200).json({ teacher });
  } catch (err) {
    if (err.code === 11000) {
      return res
        .status(404)
        .json({ err: 'The email address is already in use' });
    }
    res.status(404).json({ err: err.message });

    console.error(err);
  }
};

const updateTeacher = async (req, res) => {
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
    const teacher = await Teacher.findOneAndUpdate(
      { _id: id },
      { ...newValues },
    );

    if (!teacher) {
      return res.status(400).json({ err: 'Teacher not found' });
    }
    const updatedTeacher = await Teacher.findById({ _id: id });
    return res.status(200).json({ updatedTeacher });
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  getTeacher,
  createTeacher,
  updateTeacher,
};
