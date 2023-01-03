const { projects, clients } = require('./sampleData');
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
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
  GraphQLInt,
  GraphQLEnumType,
} = require('graphql');
const Student = require('../model/studentModel');
const Teacher = require('../model/teacherModel');
const Announcement = require('../model/announcementModel');

const StudentType = new GraphQLObjectType({
  name: 'Student',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLNonEmptyString },
    email: { type: GraphQLEmailAddress },
    password: { type: GraphQLNonEmptyString },
    createdAt: { type: GraphQLDate },
    updatedAt: { type: GraphQLDate },
  }),
});

const TeacherType = new GraphQLObjectType({
  name: 'Teacher',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLNonEmptyString },
    email: { type: GraphQLEmailAddress },
    password: { type: GraphQLNonEmptyString },
    createdAt: { type: GraphQLDate },
    updatedAt: { type: GraphQLDate },
  }),
});
const AnnouncementType = new GraphQLObjectType({
  name: 'Announcement',
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLNonEmptyString },
    text: { type: GraphQLNonEmptyString },
    createdAt: { type: GraphQLDate },
    updatedAt: { type: GraphQLDateTime },
  }),
});

const ContentCommentType = new GraphQLObjectType({
  name: 'ContentComment',
  fields: () => ({
    id: { type: GraphQLID },
    owner: {
      type: new GraphQLEnumType({
        name: 'Owner',
        values: {
          student: {
            type: StudentType,
          },
          teacher: {
            type: TeacherType,
          },
        },
      }),
    },
    comment: { type: GraphQLNonEmptyString },
    createdAt: { type: GraphQLDate },
    updatedAt: { type: GraphQLDate },
  }),
});

const ContentType = new GraphQLObjectType({
  name: 'Announcement',
  fields: () => ({
    id: { type: GraphQLID },
    author: {
      type: new GraphQLEnumType({
        name: 'Author',
        values: {
          student: {
            type: StudentType,
          },
          teacher: {
            type: TeacherType,
          },
        },
      }),
    },
    title: { type: GraphQLNonEmptyString },
    text: { type: GraphQLNonEmptyString },
    createdAt: { type: GraphQLDate },
    updatedAt: { type: GraphQLDateTime },
    likes: { type: GraphQLInt },
    comment: { type: ContentCommentType },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    students: {
      type: new GraphQLList(StudentType),
      resolve(parent, args) {
        return Student.find();
      },
    },
    student: {
      type: StudentType,
      args: { id: { type: GraphQLID } },
      async resolve(parent, args) {
        return await Student.findById(args.id);
      },
    },
    teacher: {
      type: TeacherType,
      args: { id: { type: GraphQLID } },
      async resolve(parent, args) {
        return await Teacher.findById(args.id);
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

      async resolve(parent, args) {
        return Announcement.find();
      },
    },
  },
});

// ? Mutations
const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    // ? Student Mutations

    addStudent: {
      type: StudentType,
      args: {
        name: { type: GraphQLNonEmptyString },
        email: { type: GraphQLEmailAddress },
        password: { type: GraphQLNonEmptyString },
      },
      async resolve(parent, args) {
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

    // ? Teacher Mutations

    addTeacher: {
      type: TeacherType,
      args: {
        name: { type: GraphQLNonEmptyString },
        email: { type: GraphQLEmailAddress },
        password: { type: GraphQLNonEmptyString },
      },
      async resolve(parent, args) {
        return await Teacher.create({ ...args });
      },
    },

    // ? Announcement Mutations

    addAnnouncement: {
      type: AnnouncementType,
      args: {
        title: { type: GraphQLNonEmptyString },
        text: { type: GraphQLNonEmptyString },
      },
      async resolve(parent, args) {
        return await Announcement.create({ ...args });
      },
    },
    deleteAnnouncement: {
      type: AnnouncementType,
      args: {
        id: { type: GraphQLID },
      },
      async resolve(parent, args) {
        return await Announcement.deleteOne({ _id: args.id });
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
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation,
});
