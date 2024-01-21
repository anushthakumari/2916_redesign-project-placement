import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import { getStudentDetailById, updateStudentById } from './StudentApi'

const initialState={
    studentInfo:null,
    status:"idle"
}


export const getStudentDetailByIdAsync=createAsyncThunk('student/getStudentDetailByIdAsync',async(id)=>{
    const studentInformation=await getStudentDetailById(id)
    return studentInformation
})

export const updateStudentByIdAsync=createAsyncThunk('student/updateStudentByIdAsync',async(update)=>{
    const udpatedInfo=await updateStudentById(update)
    return udpatedInfo
})


const StudentSlice=createSlice({
    name:"studentSlice",
    initialState:initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
            .addCase(getStudentDetailByIdAsync.pending,(state)=>{
                state.status='loading'
            })
            .addCase(getStudentDetailByIdAsync.fulfilled,(state,action)=>{
                state.status='idle'
                state.studentInfo=action.payload
            })
            .addCase(getStudentDetailByIdAsync.rejected,(state)=>{
                state.status='error'
            })

            .addCase(updateStudentByIdAsync.pending,(state)=>{
                state.status='loading'
            })
            .addCase(updateStudentByIdAsync.fulfilled,(state,action)=>{
                state.status='idle'
                state.studentInfo=action.payload
            })
            .addCase(updateStudentByIdAsync.rejected,(state)=>{
                state.status='error'
            })
    }
})


export const selectStudentInfo=(state)=>state.StudentSlice.studentInfo

export default StudentSlice.reducer

