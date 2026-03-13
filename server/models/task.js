const mongoose = require("mongoose")

const TaskSchema = new mongoose.Schema({

title:{
type:String,
required:true
},

category:{
type:String,
enum:["Work","Personal","Study"],
required:true
},

priority:{
type:String,
enum:["High","Medium","Low"],
default:"Medium"
},

status:{
type:String,
enum:["Pending","Completed"],
default:"Pending"
}

})

module.exports = mongoose.model("Task",TaskSchema)