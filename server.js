const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
dotenv.config();
const PORT = process.env.PORT;

//import routes
const user = require("./routes/user");
const item = require("./routes/Items");
const tool = require("./routes/tools");
const issued = require("./routes/IssuedItem");
 
 


app.get("/", (req, res) => {
    res.send("upload file")
})


//connect to mongodb
const DB_URL = process.env.DB_URL;

mongoose.connect(DB_URL)
 .then(()=>{
    console.log("DB connected")
 })
 .catch((err)=>{
    console.log("DB not connected",err)

 })

 
//app middelware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

//routes middelware
app.use(user);
app.use(item);
app.use(tool);
app.use(issued);
 
 

app.listen(PORT,()=>{
    console.log(`APP is running on ${PORT}`)
})
