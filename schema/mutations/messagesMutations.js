const { GraphQLNonEmptyString, GraphQLDateTime } = require('graphql-scalars');
const { GraphQLID, GraphQLList, GraphQLObjectType } = require('graphql');
const AnnouncementType = require('../types/announcementTypes');
const Announcement = require('../../model/announcementModel');
const MessagesType = require('../types/messagesTypes');
const Messages = require('../../model/Messages');

const messagesMutations = {
  addMessage: {
    type: MessagesType,
    input: {
      users: {
        id: { type: GraphQLList },
      },
      messages: {
        id: { type: GraphQLID },
        sender: { type: GraphQLID },
        text: { type: GraphQLNonEmptyString },
        timestamp: { type: GraphQLDateTime },
      },
    },

    async resolve(parent, args) {
      console.log('message received', args);
      return await Messages.create({ ...args });
    },
  },
};

module.exports = messagesMutations;
