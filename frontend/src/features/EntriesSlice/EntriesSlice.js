import { createSlice, createAsyncThunk  } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    entries:[],
    isSuccessE : false,
    isLoadingE: false,
    isErrorE:false,
    message:""
}


export const getAllEntries  = createAsyncThunk("entriesSlice/getAllentries", async(_, thunkAPI)=>{

    try{
        const response = await axios.get("https://api.publicapis.org/entries")
        const data =  await response.data
        return data
        // [{},{},{},{}]
    }catch(error){
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }

})




//synchronous
export const entriesSlcie = createSlice({
    name:"entries",
    initialState,
    reducers:{
        emptyState:(state)=>{
            state.entries=[];
            state.isErrorE=false;
            state.isSuccessE=false;
            state.isLoadingE = false
        },
    },
    extraReducers:(builder)=>{
        builder

        .addCase(getAllEntries.pending, (state)=>{
            state.isLoadingE = true;
        })
        .addCase(getAllEntries.fulfilled, (state, action)=>{
            state.isLoadingE = false;
            state.isSuccessE=true;
            state.isErrorE=false;
            state.entries= action.payload.entries

        })
        .addCase(getAllEntries.rejected, (state,action)=>{
            state.isLoadingE = false;
            state.isSuccessE=false;
            state.isErrorE=true;
            state.message=action.payload.message
        })

    }

})

export const {emptyState} = entriesSlcie.actions
export default entriesSlcie.reducer 

