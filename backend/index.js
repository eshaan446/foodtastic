const express = require('express');
const app = express();
const mongoDB = require("./db");
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

mongoDB();

app.use(express.json());
app.use('/api', require("./routes/CreateUser"));
app.use('/api', require("./routes/DisplayData"));
app.use('/api', require("./routes/OrderData"));

// Set CORS headers after defining routes
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "https://foodtastic.onrender.com");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get('/', (req, res) => {
  res.send('hello world');
});

app.listen(5000, () => {
  console.log("App is started on port 5000");
});
