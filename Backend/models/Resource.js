const mongoose = require('mongoose'); 

const ResourceSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    type:{
        type:String,
        required:true

    },
    model:{
        type:String,
        required:true
    },
    manufacturer:{
        type:String,
        required:true
    },
    setno:{
        type:String,
        required:true
    },
    purchasedate:{
        type:Date,
        required:true
    },
    warrantyexpire:{
        type:Date,
        required:true
    },
    maintainenceschedule:{
        type:Date,
        required:true
    },
    purchasecost:{
        type:Number,
        required:true
    },
    note:{
        type:String,
        required:true
    }


})

module.exports = mongoose.model("Resource",ResourceSchema);