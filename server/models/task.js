const mongoose = require("mongoose")

const TaskSchema = new mongoose.Schema({

title:{
type:String,
required:true
},

category:{
type:String
},

priority:{
type:String,
enum:["High","Medium","Low"]
},

status:{
type:String,
default:"Pending"
}

})

module.exports = mongoose.model("Task",TaskSchema)