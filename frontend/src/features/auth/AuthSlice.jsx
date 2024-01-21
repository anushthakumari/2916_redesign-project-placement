import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { checkAuth, createStaff, createStudent, loginStaff, loginStudent, logout } from "./AuthApi";


const initialState={
    loggedInUser:null,
    errors:null,
    status:'idle',
    isAuthChecked:false
}


export const createStaffAsync=createAsyncThunk('auth/createStaffAsync',async(data)=>{
    const createdStaff=await createStaff(data)
    return createdStaff
})
export const createStudentAsync=createAsyncThunk('auth/createStudentAsync',async(data)=>{
    const createdStudent=await createStudent(data)
    return createdStudent
})
export const loginStudentAsync=createAsyncThunk('auth/loginStudentAsync',async(data)=>{
    const student=await loginStudent(data)
    return student
})
export const loginStaffAsync=createAsyncThunk('auth/loginStaffAsync',async(data)=>{
    const staff=await loginStaff(data)
    return staff
})

export const checkAuthAsync=createAsyncThunk("auth/checkAuthAsync",async()=>{
    const data=await checkAuth()
    return data
})

export const logoutUserAsync=createAsyncThunk("auth/logoutUserAsync",async()=>{
    const logoutRes=await logout()
    return logoutRes
})




const authSlice=createSlice({
    name:"authSlice",
    initialState:initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
            .addCase(createStaffAsync.pending,(state)=>{
                state.status='idle'
            })
            .addCase(createStaffAsync.fulfilled,(state,action)=>{
                state.status='idle'
                state.loggedInUser=action.payload
            })
            .addCase(createStaffAsync.rejected,(state,action)=>{
                state.status='error'
                state.errors=action.error.message
            })


            .addCase(createStudentAsync.pending,(state)=>{
                state.status='idle'
            })
            .addCase(createStudentAsync.fulfilled,(state,action)=>{
                state.status='idle'
                state.loggedInUser=action.payload
            })
            .addCase(createStudentAsync.rejected,(state,action)=>{
                state.status='error'
                state.errors=action.error.message
            })

            .addCase(loginStaffAsync.pending,(state)=>{
                state.status='idle'
            })
            .addCase(loginStaffAsync.fulfilled,(state,action)=>{
                state.status='idle'
                state.loggedInUser=action.payload
            })
            .addCase(loginStaffAsync.rejected,(state,action)=>{
                state.status='error'
                state.errors=action.error.message
            })

            .addCase(loginStudentAsync.pending,(state)=>{
                state.status='idle'
            })
            .addCase(loginStudentAsync.fulfilled,(state,action)=>{
                state.status='idle'
                state.loggedInUser=action.payload
            })
            .addCase(loginStudentAsync.rejected,(state,action)=>{
                state.status='error'
                state.errors=action.error.message
            })


            .addCase(checkAuthAsync.pending,(state)=>{
                state.status='idle'
            })
            .addCase(checkAuthAsync.fulfilled,(state,action)=>{
                state.status='idle'
                state.loggedInUser=action.payload
                state.isAuthChecked=true
            })
            .addCase(checkAuthAsync.rejected,(state,action)=>{
                state.status='error'
                state.isAuthChecked=true
                state.errors=action.error.message
            })


            .addCase(logoutUserAsync.pending,(state)=>{
                state.status='loading'
            })
            .addCase(logoutUserAsync.fulfilled,(state,action)=>{
                state.status='idle'
                state.loggedInUser=null
            })
            .addCase(logoutUserAsync.rejected,(state,action)=>{
                state.status='error'
                state.loggedInUser=null
            })
    }

})

export const selectLoggedInUser=(state)=>state.authSlice.loggedInUser
export const selectAuthChecked=(state)=>state.authSlice.isAuthChecked

export default authSlice.reducer