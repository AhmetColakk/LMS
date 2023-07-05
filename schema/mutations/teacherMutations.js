const {
  GraphQLEmailAddress,
  GraphQLNonEmptyString,
} = require('graphql-scalars');

const Teacher = require('../../model/teacherModel');
const TeacherType = require('../types/teacherTypes');

const teacherMutations = {
  addTeacher: {
    type: TeacherType,
    args: {
      name: { type: GraphQLNonEmptyString },
      email: { type: GraphQLEmailAddress },
      password: { type: GraphQLNonEmptyString },
    },
    async resolve(parent, args) {
      return await Teacher.create({ ...args });
    },
  },
};

module.exports = teacherMutations;
