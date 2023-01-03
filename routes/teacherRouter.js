const express = require('express');
const Router = express.Router();
const {
  getTeacher,
  createTeacher,
  updateTeacher,
} = require('./../controller/teacherController');

Router.get('/:id', getTeacher);
Router.post('', createTeacher);
Router.patch('/:id', updateTeacher);

module.exports = Router;
