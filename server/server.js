require("dotenv").config()

const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")

const Task = require("./models/task")

const app = express()

app.use(cors())
app.use(express.json())

mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("MongoDB Connected"))
.catch(err=>console.log(err))

app.get("/",(req,res)=>{
res.send("API running")
})

app.get("/tasks", async(req,res)=>{
const tasks = await Task.find()
res.json(tasks)
})

app.post("/tasks", async(req,res)=>{

const {title,category,priority} = req.body

const task = new Task({
title,
category,
priority,
status:"Pending"
})

await task.save()

res.json(task)

})

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
console.log("Server running on port 5000")
})