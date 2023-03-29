import React, { useEffect, useState } from 'react'
import './Home.css'
import { toast } from 'react-toastify'
import {AiFillDelete} from 'react-icons/ai'
import {FiEdit2} from 'react-icons/fi'
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import {reset,getAllTask,deleteTask, createTask} from '../../features/taskSlice/TaskSlice'
import Spinner from '../../Components/Spinner/Spinner'
const Home = () => {
  const [task, setTask] =  useState({task:""})
  const navigate= useNavigate()
  const dispatch = useDispatch()
  const {tasks, isSuccessT, isErrorT, isLoadingT, message}= useSelector((store)=>store.tasks)

  useEffect(()=>{
    dispatch(getAllTask())
  },[])

  const deleteTaskClick =(id)=>{

    console.log(id)
    dispatch(deleteTask(id))
    dispatch(getAllTask())
  }

  const createTaskClcik =()=>{
    if(task.task!==""){
      dispatch(createTask(task))
      dispatch(getAllTask())
    }else{
      toast("Please provide task name")
    }
  }


  if(isLoadingT){
    return(
      <Spinner />
    )
  }
  return (
    <div className='MainSection'>
      <h3 className='heading'>Enter Task Details to manage your daily tasks</h3>
      <input id="task" className='taskInput' type="text" placeholder='Enter Task Details' onChange={(e)=>setTask({...task,[e.target.id]:e.target.value})}/>
      <button className='submitButton' onClick={createTaskClcik} >Submit</button>

      <div className="allTasks">
        {tasks.map((item)=>{
          return(
            <div key={item._id} className='task_div'>
              <h5>{item.task}</h5>
              <p>{item.createdAt.slice(0,10)}</p>
              <div className='icon_div'>
              <AiFillDelete className='delete_button' onClick={()=>deleteTaskClick(item._id)}/>
              <FiEdit2 className='delete_button' onClick={()=>navigate(`/update/${item._id}`)}/>
              </div>
              
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Home