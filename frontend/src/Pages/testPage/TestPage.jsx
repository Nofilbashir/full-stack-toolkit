import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {emptyState,getAllEntries} from '../../features/EntriesSlice/EntriesSlice'
import Spinner from "../../Components/Spinner/Spinner"
import { toast } from 'react-toastify'

const TestPage = () => {
    const {entries,isErrorE,isLoadingE,isSuccessE} =  useSelector((store)=>store.entries)

    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(getAllEntries())
        if(isSuccessE){
            toast.info("api call agai")
        }
        if(isErrorE){
            toast.info("api call nahi ai")
        }
    },[isSuccessE, isErrorE])

    if(isLoadingE){
        return(
            <Spinner/>
        )
    }

    return (
        <>
        <button onClick={()=>dispatch(emptyState())}> Empty the list</button>

        <div>
            {entries.map((item)=>{
                return(
                    <div>
                        <h5>{item.API}</h5>
                        <h4>{item.Description}</h4>
                        <p>{item.Category}</p>
                    </div>
                )
            })}
        </div>

        </>
  )
}

export default TestPage



// we can not mutate the states directly...
// reducer functions are those function which make us capapble to mutate the states as we want

// reducers and extra-reducers are meant only to mutate the state, reducres mutete teh state synchronously, extra reducers do this
//  asyncronously, so if we have to muitate the state via api which is a asyncronous task, we will use extra reducr not simple reducr


// const testPromise = ()=>{
//     return new Promise((resolve, reject)=>{
//         let a =  90
//         if(a<10){
//             resolve(a)
//         }else{
//             reject(a)
//         }
//     })
// }


// console.log(testPromise())
