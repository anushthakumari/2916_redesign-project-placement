import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectLoggedInUser } from '../../auth/AuthSlice'
import { getStaffDetailByIdAsync, selectStaffInfo, updateStaffByIdAsync } from '../StaffSlice'
import { Button, IconButton, Paper, Stack,TextField,Typography } from '@mui/material'
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export const StaffProfile = () => {

  const dispatch=useDispatch()

  const loggedInUser=useSelector(selectLoggedInUser)

  const staffData=useSelector(selectStaffInfo)

  console.log(staffData)

  useEffect(()=>{
    if(loggedInUser)
    dispatch(getStaffDetailByIdAsync(loggedInUser?.id))
  },[dispatch,loggedInUser])
  // const staffUserDetails=


  const [isEditName,setIsEditName]=useState(false)
  const [nameValue,setNameValue]=useState('')

  const handleEditName=()=>{
    setIsEditName(true)
    setNameValue(staffData.name)
  }

  const handleSaveChanges=()=>{
    const updatedStaff={...staffData,name:nameValue}
    setNameValue("")
    dispatch(updateStaffByIdAsync(updatedStaff))
    setIsEditName(false)
  }

  return (
    <>
    {staffData && 
    
    <Stack width={'100vw'} height={"calc(100vh - 8rem)"} justifyContent={'center'} alignItems={'center'}>


        <Stack component={Paper} elevation={4} width={'40rem'} height={'20rem'} p={4} spacing={4}>
          <Stack>
            <Stack flexDirection={'row'}>
              <Typography gutterBottom variant='h5'>Name</Typography>
              {isEditName?(
                              <IconButton onClick={handleSaveChanges}>
                              <CheckCircleIcon/>
                            </IconButton>
              ):(
              <IconButton onClick={handleEditName}>
                <CreateOutlinedIcon/>
              </IconButton>
              )}

            </Stack>
            {isEditName?(
              <TextField value={nameValue} onChange={(e)=>setNameValue(e.target.value)}></TextField>
            ):(
            <Typography variant='h5'>{staffData.name}</Typography>
            )}
          </Stack>
          <Stack>
          <Typography gutterBottom variant='h5'>Staff Id#</Typography>
          <Typography variant='h5'>{staffData.staffId}</Typography>
          </Stack>
        </Stack>

    </Stack>

}
    </>
  )
}
