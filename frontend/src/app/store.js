import {configureStore} from '@reduxjs/toolkit'
import StaffSlice from '../features/Staff/StaffSlice'
import StudentSlice from '../features/Student/StudentSlice'
import authSlice from '../features/auth/AuthSlice'
import ProjectSlice from '../features/Project/ProjectSlice'
import AssignmentSlice from '../features/assignments/AssignmentSlice'


export const store=configureStore({
    reducer:{
        StaffSlice,
        StudentSlice,
        authSlice,
        ProjectSlice,
        AssignmentSlice
    }
})