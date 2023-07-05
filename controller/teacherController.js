const User = require('./../model/usersModel');
const { isValidObjectId } = require('mongoose');
const { isStrongPassword } = require('validator');
const jwt = require('jsonwebtoken');

const createToken = _id => {
  return jwt.sign({ _id }, process.env.APP_SCREET, {
    expiresIn: '3d',
  });
};

const getTeacher = async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id))
      return res.status(400).json({ err: 'The id is not valid' });

    const teacher = await User.findById(id);
    if (!teacher) return res.status(400).json({ err: 'Teacher not found' });

    return res.status(200).json({
      teacher: {
        name: teacher.name,
        uid: teacher._id,
        email: teacher.email,
        createdAt: teacher.createdAt,
      },
    });
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

    const teacher = await User.create({
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
    const teacher = await User.findOneAndUpdate({ _id: id }, { ...newValues });

    if (!teacher) {
      return res.status(400).json({ err: 'Teacher not found' });
    }
    const updatedTeacher = await User.findById({ _id: id });
    return res.status(200).json({ updatedTeacher });
  } catch (err) {
    console.error(err);
  }
};

const loginTeacher = async (req, res) => {
  try {
    const { email, password } = req.body;
    const emptyField = [];
    !email && emptyField.push('email');
    !password && emptyField.push('password');

    if (emptyField.length) {
      return res
        .status(404)
        .json({ error: `Please fill all fields.`, emptyField });
    }

    const user = await User.login(email, password);

    // console.log(user._id);
    // console.log(user);
    if (!user) {
      return res.status(404).json({ error: 'Email or password is incorrect!' });
    }
    const token = createToken(user._id);
    res.cookie('jwt', token, { httpOnly: true, maxAge: 40000000000 * 100 });
    req.authorization = token;
    res.status(200).json({
      user: {
        name: user.name,
        surname: user.surname,
        _id: user._id,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        role: user.role,
        token,
      },
    });
  } catch (err) {
    console.error(err);
    return res.status(400).json({ error: `${err.message}` });
  }
};

const verfiy = async (req, res) => {
  try {
    // const { token: authToken } = req.body;
    // console.log(req.body);
    const { authorization } = req.headers;
    if (!authorization)
      res.status(400).json({ error: 'Authorization header required' });
    const token = authorization.split(' ')[1];
    if (!token) res.status(400).json({ error: 'Invalid token' });

    const verify = await jwt.verify(token, process.env.APP_SCREET);
    // console.log(verify);
    const { _id } = verify;

    const user = await User.findOne({ _id }).select(
      '_id name email created_at updated_at role',
    );

    // res.cookie('jwt', token, { httpOnly: true, maxAge: 40000000000 * 100 });
    res.status(200).json({ user, token });
  } catch (err) {
    // console.error(err);
    return res.status(400).json({ error: `hey ${err.message}` });
  }
};

module.exports = {
  getTeacher,
  createTeacher,
  updateTeacher,
  loginTeacher,
  verfiy,
};
