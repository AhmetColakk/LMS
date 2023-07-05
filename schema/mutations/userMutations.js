const {
  GraphQLEmailAddress,
  GraphQLNonEmptyString,
} = require('graphql-scalars');
const { GraphQLID, GraphQLEnumType } = require('graphql');
const User = require('../../model/usersModel');
const UserType = require('../types/userType');

const userMuations = {
  addUser: {
    type: UserType,
    args: {
      name: { type: GraphQLNonEmptyString },
      surname: { type: GraphQLNonEmptyString },
      role: {
        type: new GraphQLEnumType({
          name: 'UserRole',
          values: {
            teacher: { value: 'teacher' },
            student: { value: 'student' },
            admin: { value: 'admin' },
          },
        }),
        defaultValue: 'student',
      },
      email: { type: GraphQLEmailAddress },
      password: { type: GraphQLNonEmptyString },
    },
    async resolve(parent, args, context, info) {
      console.log(context.headers);
      return await User.create({ ...args });
    },
  },
  deleteUser: {
    type: UserType,
    args: {
      id: { type: GraphQLID },
      name: { type: GraphQLNonEmptyString },
      email: { type: GraphQLEmailAddress },
    },
    async resolve(parent, args) {
      return await User.deleteOne({ _id: args.id });
    },
  },
  updateUser: {
    type: UserType,
    args: {
      id: { type: GraphQLID },
      name: { type: GraphQLNonEmptyString },
      email: { type: GraphQLEmailAddress },
      password: { type: GraphQLNonEmptyString },
    },
    async resolve(parent, args) {
      await User.updateOne({ _id: args.id }, { ...args });
      return await User.findById({ _id: args.id });
    },
  },
};

module.exports = userMuations;
