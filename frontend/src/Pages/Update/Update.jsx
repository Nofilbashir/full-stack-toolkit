import React, {useState} from 'react'
import { useLocation } from 'react-router-dom'
import {updateTask} from '../../features/taskSlice/TaskSlice'
import {useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom";

const Update = () => {
  const location = useLocation()  

  const id = location.pathname.substring(location.pathname.lastIndexOf('/')+1)
  const [task, setTask] =  useState({task:""})
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const updateTaskClcik = ()=>{
    dispatch(updateTask({id, task}))
    navigate('/')
    
  }

  return (
    <div className='MainSection'>
    <h3 className='heading'>Enter Task Details to manage your daily tasks</h3>
    <input id="task" className='taskInput' type="text" placeholder='Enter Task Details' onChange={(e)=>setTask({...task,[e.target.id]:e.target.value})}/>
    <button className='submitButton' onClick={updateTaskClcik}>Submit</button>

  
    </div>
  )
}

export default Update