const {
  GraphQLDate,
  GraphQLEmailAddress,

  GraphQLNonEmptyString,
} = require('graphql-scalars');
const { GraphQLObjectType, GraphQLID, GraphQLEnumType } = require('graphql');

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLNonEmptyString },
    surname: { type: GraphQLNonEmptyString },
    role: { type: GraphQLNonEmptyString },
    email: { type: GraphQLEmailAddress },
    password: { type: GraphQLNonEmptyString },
    createdAt: { type: GraphQLDate },
    updatedAt: { type: GraphQLDate },
  }),
});

module.exports = UserType;
