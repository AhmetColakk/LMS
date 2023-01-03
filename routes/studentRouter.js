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

router.use(requireAuth);

router.get('/:id', getSingelStudent);
router.get('', getAllStudent);
router.delete('/:id', deleteStudent);
router.patch('/:id', updateStudent);
router.post('', createStudent);

module.exports = router;
