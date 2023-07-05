const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ContentSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    likes: {
      type: Number,
      default: 0,
    },
    comments: {
      type: Array,
    },
  },
  { timestamps: true },
);
const Content = mongoose.model('Content', ContentSchema);
module.exports = Content;
