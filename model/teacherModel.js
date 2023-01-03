const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const { isEmail, isStrongPassword } = require('validator');
const TeacherSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, 'Please enter an e-mail'],
      unique: true,
      validate: [isEmail, 'Please enter a valid e-mail'],
    },
    password: {
      type: String,
      required: [true, 'Please enter an password'],
      minlength: [6, 'Please enter at least 6 characters'],
      validate: [
        isStrongPassword,
        'Please enter a strong password (including numbers, special characters and lower and upper case together)',
      ],
    },
    name: {
      type: String,
      required: [true, 'Please fill the Name field'],
      minlength: [3, 'Name field must be at least 3 char'],
    },
  },
  { timestamps: true },
);
TeacherSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);

  next();
});

TeacherSchema.statics.login = async function (email, password) {
  if (!email && !password) {
    throw Error('All field must be filled');
  }

  const teacher = await this.findOne({ email });
  if (!teacher) {
    throw Error('Incorrect email');
  }
  console.log(teacher);
  const match = await bcrypt.compare(password, teacher.password);
  if (!match) {
    throw Error('Incorrect Password');
  }
  return teacher;
};

const Teacher = mongoose.model('Teacher', TeacherSchema);
module.exports = Teacher;
