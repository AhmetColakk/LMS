const express = require('express');
const {
  getSingelStudent,
  getAllStudent,
  deleteStudent,
  updateStudent,
  createStudent,
} = require('../controller/studentController');
const requireAuth = require('../middleware/ruquireAuth');
const router = express.Router();
const {
  loginStudent,
  signupStudent,
  verfiy,
} = require('./../controller/studentAuthController');

router.use(requireAuth);

// router.get('student/:id', getSingelStudent);
// router.get('student', getAllStudent);
// router.delete('student/:id', deleteStudent);
// router.patch('student/:id', updateStudent);
// router.post('student', createStudent);

// ? Student Auth
router.post('/student/login', loginStudent);
router.post('/student/signup', signupStudent);
router.post('/student/verify', verfiy);

module.exports = router;
