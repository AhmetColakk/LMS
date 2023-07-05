const {
  GraphQLDate,
  GraphQLEmailAddress,

  GraphQLNonEmptyString,
  GraphQLDateTime,
} = require('graphql-scalars');
const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLList,
  GraphQLString,
  GraphQLNonNull,
} = require('graphql');

const ChatType = new GraphQLObjectType({
  name: 'Chat',
  fields: () => ({
    id: { type: GraphQLID },
    sender: { type: GraphQLID },
    text: { type: GraphQLNonEmptyString },
    timestamp: { type: GraphQLDateTime },
  }),
});

const IdTypes = new GraphQLObjectType({
  name: 'Id',
  fields: () => ({
    id: { type: GraphQLID },
  }),
});

const MessagesType = new GraphQLObjectType({
  name: 'Messages',
  fields: () => ({
    id: { type: GraphQLID },
    users: { type: new GraphQLList(IdTypes) },
    messages: { type: new GraphQLList(ChatType) },
  }),
});

module.exports = MessagesType;
