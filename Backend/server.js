const express = require('express'); 
const app = express() 
const mongoose = require('mongoose'); 
const cors = require('cors'); 

app.use(express.json());
app.use(cors())
require("dotenv").config(); 

const PORT = process.env.PORT || 8081; 
const MONGODB_URI = process.env.MONGODB_URI;

const ResourceRouter = require("../Backend/routes/Resource")
const ResourceRouter1 = require("../Backend/routes/ResourceShedule")
const ResourceRouter2 = require("../Backend/routes/Chemical")

app.use('/resources',ResourceRouter)
app.use('/resourceShedule',ResourceRouter1)
app.use('/chemical',ResourceRouter2)

app.get("/hello",(req,res)=>{
    res.status(200).send("HELLO WORLD");
})

app.listen(PORT,()=>{
    console.log("SERVER STARTED!!")
})

mongoose.connect(MONGODB_URI).then(()=>console.log("DB Connected!!!"))