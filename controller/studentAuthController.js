const jwt = require('jsonwebtoken');
const Student = require('../model/studentModel');

const createToken = _id => {
  return jwt.sign({ _id }, process.env.APP_SCREET, {
    expiresIn: '3d',
  });
};

const loginStudent = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { authorization } = req.headers;
    console.log(authorization);
    const user = await Student.login(email, password);
    console.log(user._id);
    const token = createToken(user._id);
    res.cookie('jwt', token, { httpOnly: true, maxAge: 40000000000 * 100 });
    res.status(200).json({
      student: {
        name: user.name,
        uid: user._id,
        email: user.email,
        createdAt: user.createdAt,
        token,
      },
    });
  } catch (err) {
    // console.error(err);
    return res.status(400).json({ error: `${err.message}` });
  }
};
const verfiy = async (req, res) => {
  try {
    const { token: authToken } = req.body;
    // console.log(req.body);
    const { authorization } = req.headers;
    console.log(authorization);
    const verify = jwt.verify(authToken, process.env.APP_SCREET);
    // console.log(verify);
    const { _id } = verify;

    const user = await Student.findOne({ _id });
    console.log(user);
    const token = createToken(user._id);
    res.cookie('cookieName', 'randomNumber', {
      maxAge: 900000,
      httpOnly: true,
    });

    // res.cookie('jwt', token, { httpOnly: true, maxAge: 40000000000 * 100 });
    res.status(200).json({
      student: {
        name: user.name,
        uid: user._id,
        email: user.email,
        createdAt: user.createdAt,
        token,
      },
    });
  } catch (err) {
    // console.error(err);
    return res.status(400).json({ error: `${err.message}` });
  }
};

const signupStudent = async (req, res) => {
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

    const token = createToken(student._id);
    res.cookie('jwt', token, { httpOnly: true, maxAge: 1 });
    return res.status(200).json({
      name: student.name,
      email: student.email,
      createdAt: student.createdAt,
      uid: student._id,
      token,
    });
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

module.exports = {
  loginStudent,
  signupStudent,
  verfiy,
};
