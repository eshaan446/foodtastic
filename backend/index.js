const express = require('express')
const app = express()
const mongoDB = require("./db")
const dotenv=require("dotenv")
const cors=require("cors");
app.use(cors());

dotenv.config()


mongoDB();
app.get('/', (req, res) => {
  res.send('hello world')
})
// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// })
app.use(express.json())
app.use('/api', require("./routes/CreateUser"))
app.use('/api', require("./routes/DisplayData"))
app.use('/api', require("./routes/OrderData"))




app.listen(5000, () => {
  console.log("App is started on port 5000")
})
