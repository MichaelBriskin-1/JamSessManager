const MONGO_URI = process.env.MONGO_URI;
const mongoose = require('mongoose');

const connectDB = () => {
  // Connect to MongoDB database
  mongoose
    .connect(MONGO_URI, { dbName: 'JaMoveo' })
    .then(() => console.log('Connected to JaMoveo DB'))
    .catch((error) => console.log(error));
};

module.exports = connectDB;
