const { GraphQLID, GraphQLString, GraphQLNonNull } = require('graphql');
const { GraphQLNonEmptyString } = require('graphql-scalars');
const Content = require('../../model/contentModel');
const ContentType = require('../types/contentType');

const contentMutations = {
  addContent: {
    type: ContentType,
    args: {
      userId: { type: GraphQLNonNull(GraphQLID) },
      text: { type: GraphQLNonEmptyString },
    },
    resolve: (_, args) => {
      const content = new Content({
        userId: args.userId,
        text: args.text,
      });
      return content.save();
    },
  },
};

module.exports = contentMutations;
