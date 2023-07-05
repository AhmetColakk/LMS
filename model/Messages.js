const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  users: [{ type: Schema.Types.ObjectId }],
  messages: [
    {
      sender: { type: Schema.Types.ObjectId },
      text: { type: String, required: true },
      timestamp: { type: Date, default: Date.now },
    },
  ],
});

module.exports = mongoose.model('Message', MessageSchema);
