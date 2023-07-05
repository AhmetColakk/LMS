const { GraphQLNonEmptyString } = require('graphql-scalars');
const {
  GraphQLID,
  GraphQLNonNull,
  GraphQLError,
  UserInputError,
  GraphQLString,
} = require('graphql');
const AnnouncementType = require('../types/announcementTypes');
const Announcement = require('../../model/announcementModel');
const User = require('../../model/usersModel');
const { isValidObjectId } = require('mongoose');

const announcementMutations = {
  addAnnouncement: {
    type: AnnouncementType,
    args: {
      title: { type: GraphQLNonEmptyString },
      text: { type: GraphQLNonEmptyString },
      userId: { type: GraphQLNonNull(GraphQLID) },
    },
    async resolve(parent, args) {
      console.log(args);
      if (!args.title) {
        return new GraphQLError('Title is required');
      }
      if (!args.text.length) {
        return {
          success: false,
          error: {
            code: 'ERROR_CODE_MISSING_REQUIRED_FIELD',
            message: 'Text is required',
          },
        };
      }
      if (!args.userId) {
        return new GraphQLError('User ID is required');
      }
      // ? check if userId is valid
      if (!isValidObjectId(args.userId)) {
        return new GraphQLError('User ID is not valid');
      }
      // ? check if userId is exist
      const user = await User.findById(args.userId);
      console.log(user);

      if (!user) {
        return new GraphQLError('No such user found');
      }
      try {
        const announcement = await Announcement.create({
          title: args.title,
          text: args.text,
          user: args.userId,
        });
        return announcement;
      } catch (error) {
        console.error(error);
        return new GraphQLError(`my custom error: ${error.message}`);
      }
    },
  },

  deleteAnnouncement: {
    type: AnnouncementType,
    args: {
      id: { type: GraphQLID },
    },
    async resolve(parent, args) {
      await Announcement.deleteOne({ _id: args.id });
      return [{ data: 'deleted' }];
    },
  },
  updateAnnouncement: {
    type: AnnouncementType,
    args: {
      id: { type: GraphQLID },
      title: { type: GraphQLNonEmptyString },
      text: { type: GraphQLNonEmptyString },
    },
    async resolve(parent, args) {
      return await Announcement.updateOne({ _id: args.id }, { ...args });
    },
  },
};

module.exports = announcementMutations;
