import React from 'react'
import { useSelector } from 'react-redux'
import { selectLoggedInUser } from '../AuthSlice'
import { Navigate } from 'react-router-dom'

export const ProctectedStudent = ({children}) => {

    const isLoggedIn=useSelector(selectLoggedInUser)

    if(isLoggedIn && isLoggedIn.role==='student'){
        return children
    }
    else{
        return <Navigate to={'/login'} replace={true}></Navigate>
    }
}
