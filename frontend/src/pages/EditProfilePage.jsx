import React from 'react'
import { Navbar } from '../components/Navbar'
import { Button, Stack, TextField, Typography } from '@mui/material'

export const EditProfilePage = () => {
  return (
    <>
    <Navbar/>

    <Stack height={"calc(100vh - 5rem)"} justifyContent={'center'} alignItems={"center"}>


    <Stack bgcolor={'white'} width={"30rem"} spacing={2}>
            
            <Typography variant='h4' textAlign={'center'} color={'primary'} fontWeight={300}>Edit Profile</Typography>

            <TextField placeholder='Name'/>
            <TextField placeholder='Matriculation ID'/>
            <TextField placeholder='Program Title'/>
            <TextField placeholder='Entry Year'/>
            {/* <MultiSelect label={'Interested Projects'}/> */}
            <Button variant='contained' sx={{"height":'3rem'}}>Save Changes</Button>
    </Stack>

    </Stack>

    
    </>
  )
}
