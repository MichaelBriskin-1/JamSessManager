require("dotenv").config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./configs/db');

const app = express();
const PORT = process.env.PORT ||3000;

connectDB();

app.use(cors());

app.use('/', express.json());

app.listen(PORT, () => {
  console.log(`app is listening at http://localhost:${PORT}`);
});
