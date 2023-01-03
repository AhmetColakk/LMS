const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { isEmail, isStrongPassword } = require('validator');
const bcrypt = require('bcrypt');

const StudentSchema = new Schema(
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
      minlength: [3, 'Please enter at least 3 characters'],
      maxlength: [30, 'Please use less word'],
    },
  },
  { timestamps: true },
);

StudentSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);

  next();
});

StudentSchema.statics.login = async function (email, password) {
  if (!email && !password) {
    throw Error('All field must be filled');
  }

  const student = await this.findOne({ email });
  if (!student) {
    throw Error('Incorrect email');
  }
  const match = await bcrypt.compare(password, student.password);
  if (!match) {
    throw Error('Incorrect Password');
  }
  return student;
};

const Student = mongoose.model('Student', StudentSchema);
module.exports = Student;
