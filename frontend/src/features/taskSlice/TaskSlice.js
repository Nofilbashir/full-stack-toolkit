import {createSlice,createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

const initialState ={
    tasks:[],
    isSuccessT : false,
    isLoadingT: false,
    isErrorT:false,
    message:""
}


export const getAllTask  = createAsyncThunk("entriesSlice/getAllentries", async(_, thunkAPI)=>{

    try{
        const response = await axios.get("http://localhost:5000/api/task/getAllTasks")
        const data =  await response.data
        return data

    }catch(error){
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }

})

export const deleteTask  = createAsyncThunk("entriesSlice/deleteTask", async(id, thunkAPI)=>{
    try{
        const response = await axios.delete(`http://localhost:5000/api/task/deleteTask/${id}`)
        const data =  await response.data
        return data

    }catch(error){
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }

})

export const createTask  = createAsyncThunk("entriesSlice/createTask", async(task, thunkAPI)=>{
    try{
        const response = await axios.post(`http://localhost:5000/api/task/createTask`, task)
        const data =  await response.data
        return data

    }catch(error){
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }

})

export const updateTask  = createAsyncThunk("entriesSlice/updateTask", async({id,task}, thunkAPI)=>{
    console.log(id, task)
    try{
        const response = await axios.patch(`http://localhost:5000/api/task/updateTask/${id}`, task)
        const data =  await response.data
        return data

    }catch(error){
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }

})



export const taskSlice =  createSlice({ 
    name:"tasks",
    initialState,
    reducers:{
        reset:(state)=>{
            state.tasks=[];
            state.isSuccessT=false;
            state.isLoadingT= false;
            state.isErrorT=false;
    }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(getAllTask.pending, (state)=>{
            state.isLoadingT = true;
        })
        .addCase(getAllTask.fulfilled, (state, action)=>{
            state.isLoadingT = false;
            state.tasks = action.payload.taskFound;
            state.isSuccessT =  true
            state.message = action.payload.message;

        })
        .addCase(getAllTask.rejected, (state, action)=>{
            state.isErrorT=true;
            state.isLoadingT = false;
            state.message = action.payload.message;
        })

        .addCase(deleteTask.pending, (state)=>{
            state.isLoadingT = true;
        })
        .addCase(deleteTask.fulfilled, (state, action)=>{
            state.isLoadingT = false;
            state.isSuccessT =  true;
            state.message = action.payload.message;
        })
        .addCase(deleteTask.rejected, (state, action)=>{
            state.isLoadingT = false;
            state.isErrorT=true;
            state.message = action.payload.message;
        })

        .addCase(createTask.pending, (state)=>{
            state.isLoadingT = true;
        })
        .addCase(createTask.fulfilled, (state, action)=>{
            state.isLoadingT = false;
            state.isSuccessT =  true;
            state.message = action.payload.message;
        })
        .addCase(createTask.rejected, (state, action)=>{
            state.isLoadingT = false;
            state.isErrorT=true;
            state.message = action.payload.message;
        })
    }
})


export const {reset} = taskSlice.actions
export default taskSlice.reducer
