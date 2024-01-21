import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import { getStaffDetailById, updateStaffById } from './StaffApi'

const initialState={
    staffInfo:null,
    status:'idle'
}

export const getStaffDetailByIdAsync=createAsyncThunk('staff/getStaffDetailByIdAsync',async(id)=>{
    const staffInformation=await getStaffDetailById(id)
    return staffInformation
})
export const updateStaffByIdAsync=createAsyncThunk('staff/updateStaffByIdAsync',async(update)=>{
    const updatedStaff=await updateStaffById(update)
    return updatedStaff
})

const StaffSlice=createSlice({
    name:"staffSlice",
    initialState:initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
            .addCase(getStaffDetailByIdAsync.pending,(state)=>{
                state.status='loading'
            })
            .addCase(getStaffDetailByIdAsync.fulfilled,(state,action)=>{
                state.status='idle'
                state.staffInfo=action.payload
            })
            .addCase(getStaffDetailByIdAsync.rejected,(state)=>{
                state.status='error'
            })

            .addCase(updateStaffByIdAsync.pending,(state)=>{
                state.status='loading'
            })
            .addCase(updateStaffByIdAsync.fulfilled,(state,action)=>{
                state.status='idle'
                state.staffInfo=action.payload
            })
            .addCase(updateStaffByIdAsync.rejected,(state)=>{
                state.status='error'
            })
    }
})


export const selectStaffInfo=(state)=>state.StaffSlice.staffInfo
export default StaffSlice.reducer


