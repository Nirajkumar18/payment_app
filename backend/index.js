const express = require('express');
const cors = require('cors');
const app = express();
const rootRouter = require("./routes/index");
const mongoose = require('mongoose');
const uri = 'mongodb+srv://ayush_chauhan:Walkwel30@demo.7etsie9.mongodb.net/paytm'

//Connect to the db
mongoose.connect(uri).then(()=>{
    console.log('Connected to MongoDB successfully');
})
app.use(cors());
app.use(express.json());
app.use("/api/v1", rootRouter);

app.listen(8001, ()=>{
    console.log('Server Listening at port 8000');
})
