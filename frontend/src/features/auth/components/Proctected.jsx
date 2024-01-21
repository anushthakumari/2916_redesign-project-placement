import React from 'react'
import { useSelector } from 'react-redux'
import { selectLoggedInUser } from '../AuthSlice'
import { Navigate } from 'react-router-dom'

export const Proctected = ({children}) => {

    const isLoggedIn=useSelector(selectLoggedInUser)

    if(!isLoggedIn){
        return <Navigate to={'/login'} replace={true}></Navigate>
    }
    return children
}
