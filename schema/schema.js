const {
  GraphQLDate,
  GraphQLEmailAddress,
  GraphQLDateTime,
  GraphQLTime,
  GraphQLNonEmptyString,
} = require('graphql-scalars');
const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLSchema,
  GraphQLList,
  GraphQLInt,
  GraphQLEnumType,
} = require('graphql');

// ? Models

const Announcement = require('../model/announcementModel');
const Content = require('../model/contentModel');
const User = require('../model/usersModel');

// ? Types

const AnnouncementType = require('./types/announcementTypes');
const UserType = require('./types/userType');

// ? Mutations

const announcementMutations = require('./mutations/announcementMutations');
const userMutations = require('./mutations/userMutations');

const MessagesType = require('./types/messagesTypes');
const Messages = require('../model/Messages');
const messagesMutations = require('./mutations/messagesMutations');
const ContentType = require('./types/contentType');
const contentMutations = require('./mutations/contentMutations');

//
//
//

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    content: {
      type: ContentType,
      args: { id: { type: GraphQLID } },
      resolve: (_, args) => Content.findById(args.id),
    },
    contents: {
      type: GraphQLList(ContentType),
      resolve: () => Content.find(),
    },
    users: {
      type: new GraphQLList(UserType),
      args: {
        id: { type: GraphQLID },
        name: { type: GraphQLNonEmptyString },
        email: { type: GraphQLNonEmptyString },
        role: { type: GraphQLNonEmptyString },
      },
      async resolve(parent, args, context) {
        console.log();
        return User.find({ ...args });
      },
    },
    user: {
      type: UserType,
      args: { id: { type: GraphQLID } },
      async resolve(parent, args) {
        return await User.findById(args.id);
      },
    },
    announcement: {
      type: AnnouncementType,
      args: { id: { type: GraphQLID } },
      async resolve(parent, args) {
        return Announcement.findById(args.id);
      },
    },
    announcements: {
      type: new GraphQLList(AnnouncementType),
      args: {
        page: { type: GraphQLInt },
        limit: { type: GraphQLInt },
      },
      async resolve(parent, args) {
        const page = args.page || 1;
        const limit = args.limit || 10;
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        return await Announcement.find()
          .sort({ createdAt: -1 })
          .skip(startIndex)
          .limit(endIndex);
      },
    },
    messages: {
      type: new GraphQLList(MessagesType),
      args: {
        id: { type: GraphQLID },
      },
      async resolve(parent, args, context) {
        // if (!args.id) return new Error('User Id required');
        return Messages.find({ users: { $in: [args.id] } });
      },
    },
    message: {
      type: new GraphQLList(MessagesType),
      args: {
        id: { type: GraphQLID },
      },
      async resolve(parent, args, context) {
        if (!args.id) return new Error('User Id required');

        const message = Messages.findById(args.messageId);
        if (!message) {
          throw new Error('Message not found');
        }
        return message;
      },
    },
  },
});

// ? Mutations
const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    // ? User Mutations
    ...userMutations,

    // ? Announcement Mutations
    ...announcementMutations,

    // ? Messages Mutation
    ...messagesMutations,

    // ? Content Mutation
    ...contentMutations,
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation,
});
