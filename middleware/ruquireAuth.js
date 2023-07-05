const jwt = require('jsonwebtoken');
const User = require('../model/usersModel');

const requireAuth = async (req, res, next) => {
  try {
    const authorizationHeader = req.headers.authorization;
    // console.log('authorizationHeader:', authorizationHeader);
    if (!authorizationHeader || !/^Bearer /.test(authorizationHeader)) {
      return res
        .status(401)
        .json({ error: 'Authorization header is required' });
    }

    const token = authorizationHeader.split(' ')[1];
    const { _id } = jwt.verify(token, process.env.APP_SCREET);
    let user = await User.findOne({ _id });

    if (!user) {
      return res.status(401).json({ error: 'Invalid user' });
    }

    req.user = user;
    req.token = token;

    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ error: 'Invalid token' });
  }
};

module.exports = requireAuth;
