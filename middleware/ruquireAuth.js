const jwt = require('jsonwebtoken');
const Student = require('../model/studentModel');

const requireAuth = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    console.log('header authorizaton', authorization);
    if (!authorization) {
      return res.status(401).json({ error: 'Authorization token required' });
    }

    const token = authorization.split(' ')[1];
    const { _id } = jwt.verify(token, process.env.APP_SCREET);
    req.user = await Student.findOne({ _id }).select('_id');
    next();
  } catch (err) {
    console.error(err);
    return res.status(401).json({ error: err });
  }
};

module.exports = requireAuth;
