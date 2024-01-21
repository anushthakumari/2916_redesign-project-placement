import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import {projectScreening} from '../../../assets'
import Lottie from 'lottie-react';
import {InputLabel, MenuItem, Select, Stack} from '@mui/material'
import { Navigate, Link as linkRoute } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { loginStaffAsync, loginStudentAsync, selectLoggedInUser } from '../AuthSlice';
import logo from '../../../assets/logo/logo.jpg'

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit">
        Project Mangament Portal
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


export const Login=()=> {
    const dispatch=useDispatch()
    const { register,handleSubmit,watch,reset,formState: { errors },} = useForm()
    const [selectedOption,setSelectedOption]=useState("Staff")

    const isLoggedIn=useSelector(selectLoggedInUser)
    console.log(isLoggedIn)

    useEffect(()=>{reset()},[selectedOption])

  return (
    <>
    {isLoggedIn?.role==='student' && <Navigate to={'/'} replace={true}></Navigate>}
    {isLoggedIn?.role==='staff' && <Navigate to={'/manage-projects'} replace={true}></Navigate>}
      <Stack component="main" sx={{ height: '100vh' ,width:"100vw"}} flexDirection={'row'}>
          
          
          <Lottie animationData={projectScreening}/>
      

        <Stack item xs={12} sm={8} md={5} component={Paper} elevation={2} justifyContent={'center'}>

          <Box sx={{ my: 8,mx: 4, display: 'flex', flexDirection: 'column',alignItems: 'center'}}>

            {/* Image container */}
            <Box width={'500px'}>
              <img src={logo} style={{width:"100%",height:"100%",objectFit:"contain"}} alt="logo-university" />
            </Box>

<InputLabel sx={{mr:1}}>Select Role</InputLabel>
                        <Select
                        label="Select Role"
                        value={selectedOption}
                        onChange={()=>setSelectedOption(selectedOption==='Staff'?"Student":"Staff")}
                      >
                        <MenuItem value="Staff">Staff</MenuItem>
                        <MenuItem value="Student">Student</MenuItem>
                      </Select>

            {/* feild and details container */}
            <Box component="form" noValidate onSubmit={handleSubmit((data)=>{

                const loginData={...data}
                if(selectedOption==='Staff'){
                    loginData.staffId=String(loginData.staffId)
                    dispatch(loginStaffAsync(data))
                }
                else{
                    loginData.id=String(loginData.id)
                    dispatch(loginStudentAsync(data))
                }
            })} sx={{ mt: 1 }}>

              <TextField margin="normal" type='number' required fullWidth id="ID" label="ID"  {...register(selectedOption==='Student'?"id":"staffId",{required:"id is required"})} autoFocus/>
              <TextField margin="normal" required fullWidth {...register("password",{required:"password is required"})} label="Password" type="password" id="password"/>
              
                <Button type="submit" fullWidth variant="contained" sx={{mt:3,mb:2,height:"3rem"}}>
                  Login {selectedOption==='Staff'?"as Staff":"as Student"}
                </Button>

              <Grid container justifyContent={'space-between'} alignContent={'center'}>
                <Grid item>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link component={linkRoute} to={'/signup'} variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>

              <Copyright sx={{ mt: 5 }} />
            </Box>

          </Box>
        </Stack>
        
      </Stack></>
  );
}