import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createAssignment, deleteAssingmentById, fetchAssignmentByStudentId } from "./AssignmentApi";

const initialState={
    assignments:[],
    status:'idle'
}


export const createAssignmentAsync=createAsyncThunk("assignments/createAssignmentAsync",async(data)=>{
    const createdAssignment=await createAssignment(data)
    return createdAssignment
})

export const fetchAssignmentByStudentIdAsync=createAsyncThunk("assignments/fetchAssignmentByStudentIdAsync",async(id)=>{
    const fetchedAssingent=await fetchAssignmentByStudentId(id)
    return fetchedAssingent
})

export const deleteAssingmentByIdAsync=createAsyncThunk('assignments/deleteAssingmentByIdAsync',async(id)=>{
    const deletedAssingment=await deleteAssingmentById(id)
    return deletedAssingment
})

const assignmentSlice=createSlice({
    name:"assignmentSlice",
    initialState:initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
            .addCase(createAssignmentAsync.pending,(state)=>{
                state.status='loading'
            })
            .addCase(createAssignmentAsync.fulfilled,(state,action)=>{
                state.status='idle'
                state.assignments.push(action.payload)
            })
            .addCase(createAssignmentAsync.rejected,(state)=>{
                state.status='error'
            })

            
            .addCase(fetchAssignmentByStudentIdAsync.pending,(state)=>{
                state.status='loading'
            })
            .addCase(fetchAssignmentByStudentIdAsync.fulfilled,(state,action)=>{
                state.status='idle'
                state.assignments=action.payload
            })
            .addCase(fetchAssignmentByStudentIdAsync.rejected,(state)=>{
                state.status='error'
            })


            .addCase(deleteAssingmentByIdAsync.pending,(state)=>{
                state.status='loading'
            })
            .addCase(deleteAssingmentByIdAsync.fulfilled,(state,action)=>{
                state.status='idle'
                state.assignments=state.assignments.filter((item)=>item.assignmentId!==action.payload.id)

            })
            .addCase(deleteAssingmentByIdAsync.rejected,(state)=>{
                state.status='error'
            })
    }

})


export const selectAssignments=(state)=>state.AssignmentSlice.assignments

export default assignmentSlice.reducer