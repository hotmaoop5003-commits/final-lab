import { useEffect, useState } from "react"
import axios from "axios"

const API = import.meta.env.VITE_API_URL

function App(){

const [tasks,setTasks] = useState([])

const [title,setTitle] = useState("")
const [category,setCategory] = useState("Work")
const [priority,setPriority] = useState("Medium")

const loadTasks = async()=>{
const res = await axios.get(API+"/tasks")
setTasks(res.data)
}

useEffect(()=>{
loadTasks()
},[])

const addTask = async()=>{

if(!title) return alert("กรอกชื่องาน")

await axios.post(API+"/tasks",{
title,
category,
priority
})

setTitle("")
loadTasks()
}

const toggleStatus = async(id)=>{
await axios.put(API+"/tasks/"+id)
loadTasks()
}

const priorityColor = (p)=>{

if(p==="High") return "red"
if(p==="Medium") return "orange"
return "green"

}

return(

<div style={{padding:"40px",fontFamily:"Arial"}}>

<h1>Smart Task Board</h1>

<div>

<input
placeholder="Task name"
value={title}
onChange={(e)=>setTitle(e.target.value)}
/>

<select onChange={(e)=>setCategory(e.target.value)}>

<option>Work</option>
<option>Personal</option>
<option>Study</option>

</select>

<select onChange={(e)=>setPriority(e.target.value)}>

<option>High</option>
<option>Medium</option>
<option>Low</option>

</select>

<button onClick={addTask}>
Add Task
</button>

</div>

<hr/>

{tasks.map(task=>(

<div
key={task._id}
style={{
border:"1px solid #ddd",
padding:"10px",
margin:"10px 0"
}}
>

<b>{task.title}</b>

<div>

Category: {task.category}

</div>

<div
style={{
color:priorityColor(task.priority)
}}
>

Priority: {task.priority}

</div>

<button
onClick={()=>toggleStatus(task._id)}
>

{task.status}

</button>

</div>

))}

</div>

)

}

export default App