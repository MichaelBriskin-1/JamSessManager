require("dotenv").config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./configs/db');
const usersRoute = require('./routes/usersRoute');

const app = express();
const PORT = process.env.PORT ||5000;

connectDB();

app.use(express.json());
app.use(cors());


app.use('/api/users', usersRoute);

app.listen(PORT, () => {
  console.log(`app is listening at http://localhost:${PORT}`);
});
