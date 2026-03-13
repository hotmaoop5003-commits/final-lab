const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
require("dotenv").config()

const Task = require("./models/task")

const app = express()

app.use(cors())
app.use(express.json())

mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("MongoDB connected"))
.catch(err=>console.log(err))

// GET tasks
app.get("/tasks", async(req,res)=>{
const tasks = await Task.find()
res.json(tasks)
})

// ADD task
app.post("/tasks", async(req,res)=>{
const task = new Task(req.body)
await task.save()
res.json(task)
})

// TOGGLE status
app.put("/tasks/:id", async(req,res)=>{

const task = await Task.findById(req.params.id)

task.status =
task.status === "Pending"
? "Completed"
: "Pending"

await task.save()

res.json(task)

})

app.listen(5000,()=>{
console.log("Server running")
})