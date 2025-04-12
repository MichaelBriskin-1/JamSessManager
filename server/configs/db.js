const MONGO_URI = process.env.MONGO_URI;
const mongoose = require('mongoose');

const connectDB = () => {
  // Connect to MongoDB database
  mongoose
    .connect(MONGO_URI, { dbName: 'JamSessManager' })
    .then(() => console.log('Connected to JamSessManager DB'))
    .catch((error) => console.log(error));
};

module.exports = connectDB;
