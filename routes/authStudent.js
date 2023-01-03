const express = require('express');
const router = express.Router();
const {
  loginStudent,
  signupStudent,
  verfiy,
} = require('./../controller/studentAuthController');

router.post('/login', loginStudent);
router.post('/signup', signupStudent);
router.post('/verify', verfiy);

module.exports = router;
