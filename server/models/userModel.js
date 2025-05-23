const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: { type: String, required: true },
    password: { type: String, required: true },
    instrument: { type: String, required: true },
    role: { type: String, default: 'player' },
  },
  { versionKey: false }
);

const User = mongoose.model('User', userSchema);

module.exports = User;
