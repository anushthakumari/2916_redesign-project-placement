import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUserAsync, selectLoggedInUser } from '../AuthSlice'
import { Navigate } from 'react-router-dom'

export const Logout = () => {
    const loggedInUser=useSelector(selectLoggedInUser)
    const dispatch=useDispatch()

    useEffect(()=>{
        dispatch(logoutUserAsync())
    },[dispatch])


  return (
    <>
    {!loggedInUser && <Navigate to={'/login'} replace={true}></Navigate>}
    </>
  )
}
