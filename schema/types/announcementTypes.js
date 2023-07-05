const {
  GraphQLDate,
  GraphQLDateTime,
  GraphQLNonEmptyString,
} = require('graphql-scalars');
const { GraphQLObjectType, GraphQLID, GraphQLString } = require('graphql');
const UserType = require('./userType');
const User = require('../../model/usersModel');

const AnnouncementType = new GraphQLObjectType({
  name: 'Announcement',
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    text: { type: GraphQLString },
    createdAt: { type: GraphQLDateTime },
    updatedAt: { type: GraphQLDateTime },
    user: {
      type: UserType,
      resolve(parent, arg) {
        return User.findById(parent.user);
      },
    },
  }),
});

module.exports = AnnouncementType;
