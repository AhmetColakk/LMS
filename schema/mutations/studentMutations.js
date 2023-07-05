const {
  GraphQLEmailAddress,
  GraphQLNonEmptyString,
} = require('graphql-scalars');
const { GraphQLID } = require('graphql');
const Student = require('../../model/studentModel');
const StudentType = require('../types/studentTypes');

const studentMuations = {
  addStudent: {
    type: StudentType,
    args: {
      name: { type: GraphQLNonEmptyString },
      email: { type: GraphQLEmailAddress },
      password: { type: GraphQLNonEmptyString },
    },
    async resolve(parent, args, context, info) {
      console.log(context.headers);
      return await Student.create({ ...args });
    },
  },
  deleteStudent: {
    type: StudentType,
    args: {
      id: { type: GraphQLID },
      name: { type: GraphQLNonEmptyString },
      email: { type: GraphQLEmailAddress },
    },
    async resolve(parent, args) {
      return await Student.deleteOne({ _id: args.id });
    },
  },
  updateStudent: {
    type: StudentType,
    args: {
      id: { type: GraphQLID },
      name: { type: GraphQLNonEmptyString },
      email: { type: GraphQLEmailAddress },
      password: { type: GraphQLNonEmptyString },
    },
    async resolve(parent, args) {
      await Student.updateOne({ _id: args.id }, { ...args });
      return await Student.findById({ _id: args.id });
    },
  },
};

module.exports = studentMuations;
