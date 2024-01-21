import { IconButton, Paper, Stack, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectStudentInfo, updateStudentByIdAsync } from '../StudentSlice'
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export const StudentProfile = () => {

  const dispatch=useDispatch()

  const user=useSelector(selectStudentInfo)

  const [isEditName,setIsEditName]=useState(false)
  const [nameValue,setNameValue]=useState('')

  const handleEdit=()=>{
    setIsEditName(true)
    setNameValue(user.name)
  }

  const saveChanges=()=>{
    const update={...user,'name':nameValue}
    dispatch(updateStudentByIdAsync(update))
    setIsEditName(false)
    setNameValue('')
  }

  console.log(user)
  return (
    <>

    {user && 
    
    
    <Stack width={'100vw'} height={'calc(100vh - 8rem)'} justifyContent={'center'} alignItems={'center'}>

      <Stack component={Paper} elevation={5} p={4} spacing={4} width={'30rem'}>
        <Stack>
          <Stack flexDirection={'row'}>
        <Typography variant='h5'>Name</Typography>
        {
          isEditName?(<IconButton onClick={saveChanges}><CheckCircleIcon/></IconButton>):(<IconButton onClick={handleEdit}><CreateOutlinedIcon/></IconButton>)
        }
        

          </Stack>
          {
            isEditName?(<TextField value={nameValue} onChange={(e)=>setNameValue(e.target.value)}></TextField>):(
              <Typography variant='h6' fontWeight={300}>{user.name}</Typography>
            )
          }
        </Stack>
        <Stack>
          <Typography variant='h5'>Student Id</Typography>
          <Typography variant='h6' fontWeight={300}>{user.id}</Typography>
        </Stack>
        <Stack>
          <Typography variant='h5'>Degree</Typography>
          <Typography variant='h6' fontWeight={300}>{user.degree}</Typography>
          </Stack>
        <Stack>
          <Typography variant='h5'>Entry Year</Typography>
          <Typography variant='h6' fontWeight={300}>{user.entryYear}</Typography>
        </Stack>
        <Stack>
        <Typography variant='h5'>Selected Mode</Typography>
          <Typography variant='h6' fontWeight={300}>{user.modeType}</Typography>
        </Stack>
        <Stack>
        <Typography variant='h5'>Sub Couse</Typography>
          <Typography variant='h6' fontWeight={300}>{user.subCourse}</Typography>
        </Stack>
        
        
        
        
        
      </Stack>
    </Stack>
      }
    </>
  )
}
