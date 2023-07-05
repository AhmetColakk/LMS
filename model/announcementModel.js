const mongoose = require('mongoose');
// const onSocket = require('../socket/socket');
const Schema = mongoose.Schema;

const AnnouncementSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Please fill the title field'],
    },
    text: {
      type: String,
      required: [true, 'Please fill the text field'],
      minlength: [6, 'Please enter at least 6 characters'],
      maxlength: [2500, 'Please enter less than 2500 characters'],
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true },
);

const Announcement = mongoose.model('Announcement', AnnouncementSchema);
module.exports = Announcement;
