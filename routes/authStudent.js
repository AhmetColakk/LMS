const express = require('express');
const router = express.Router();
const {
  loginStudent,
  signupStudent,
  verfiy,
} = require('./../controller/studentAuthController');

router.post('/student/login', loginStudent);
router.post('/student/signup', signupStudent);
router.post('/student/verify', verfiy);

module.exports = router;
