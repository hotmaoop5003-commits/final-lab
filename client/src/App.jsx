import { useEffect, useState } from "react"
import axios from "axios"

const API = import.meta.env.VITE_API_URL

function App(){

const [tasks,setTasks] = useState([])
const [title,setTitle] = useState("")
const [category,setCategory] = useState("Work")
const [priority,setPriority] = useState("Medium")

const loadTasks = async()=>{

try{

const res = await axios.get(API+"/tasks")

if(Array.isArray(res.data)){
setTasks(res.data)
}else{
setTasks([])
}

}catch(err){

console.log("API ERROR:",err)

}

}

useEffect(()=>{
loadTasks()
},[])

const addTask = async()=>{

if(!title) return alert("กรอกชื่องาน")

try{

await axios.post(API+"/tasks",{
title,
category,
priority
})

setTitle("")
loadTasks()

}catch(err){

console.log(err)

}

}

const toggleStatus = async(id)=>{

try{

await axios.put(API+"/tasks/"+id)
loadTasks()

}catch(err){

console.log(err)

}

}

const priorityColor = (p)=>{

if(p==="High") return "red"
if(p==="Medium") return "orange"
return "green"

}

return(

<div style={{padding:"40px"}}>

<h1>Smart Task Board</h1>

<input
placeholder="Task name"
value={title}
onChange={(e)=>setTitle(e.target.value)}
/>

<select value={category} onChange={(e)=>setCategory(e.target.value)}>
<option>Work</option>
<option>Personal</option>
<option>Study</option>
</select>

<select value={priority} onChange={(e)=>setPriority(e.target.value)}>
<option>High</option>
<option>Medium</option>
<option>Low</option>
</select>

<button onClick={addTask}>
Add Task
</button>

<hr/>

{Array.isArray(tasks) && tasks.map(task=>(

<div
key={task._id}
style={{
border:"1px solid #ccc",
padding:"10px",
marginBottom:"10px"
}}
>

<b>{task.title}</b>

<div>
Category: {task.category}
</div>

<div style={{color:priorityColor(task.priority)}}>

Priority: {task.priority}

</div>

<button onClick={()=>toggleStatus(task._id)}>

{task.status}

</button>

</div>

))}

</div>

)

}

export default App