const express = require('express');
const Router = express.Router();
const {
  getTeacher,
  createTeacher,
  updateTeacher,
  loginTeacher,
  verfiy,
} = require('../controller/teacherController');

Router.get('/teacher/:id', getTeacher);
Router.post('/teacher', createTeacher);
Router.patch('/teacher/:id', updateTeacher);
Router.post('/teacher/login', loginTeacher);
Router.post('/teacher/verify', verfiy);

module.exports = Router;
