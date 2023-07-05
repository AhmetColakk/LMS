const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLSchema,
} = require('graphql');
const { GraphQLDateTime, GraphQLDate } = require('graphql-scalars');
const User = require('../../model/usersModel');
const UserType = require('../types/userType');

const ContentType = new GraphQLObjectType({
  name: 'Content',
  fields: () => ({
    id: { type: GraphQLID },
    text: { type: GraphQLString },
    createdAt: { type: GraphQLDateTime },
    updatedAt: { type: GraphQLDateTime },
    user: {
      type: UserType,
      resolve(parent, arg) {
        return User.findById(parent.userId);
      },
    },
  }),
});

module.exports = ContentType;
