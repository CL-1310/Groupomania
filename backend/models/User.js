const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  username: { type: String, required: false, unique: true},
  department: {type: String, required: false},
  avatar: { type: String, required: false },
  birthdate: { type: Date, required: false},
  isAdmin: { type: Boolean, required: true}
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);