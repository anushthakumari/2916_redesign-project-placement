import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import {projectScreening} from '../../../assets'
import {Checkbox, FormHelperText, Stack} from '@mui/material'
import { Navigate, Link as linkRoute } from 'react-router-dom';
import Button from '@mui/material/Button';
import Lottie from 'lottie-react';
import {Select,MenuItem,InputLabel} from '@mui/material'
import { useEffect, useState } from 'react';
import {MuiCheckbox} from '../../../components/MuiCheckbox'
import { DEGREES_COURSES, SUB_COURSES } from '../../../constants';
import {FormControl,FormControlLabel} from '@mui/material'
import { useForm } from "react-hook-form"
import {useSelector,useDispatch} from 'react-redux'
import { createStaffAsync, createStudentAsync, selectLoggedInUser } from '../AuthSlice';
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


export const Signup=()=> {

    const isLoggedIn=useSelector(selectLoggedInUser)
    const dispatch=useDispatch()
  const { register,handleSubmit,watch,reset,formState: { errors },} = useForm()
  const [isModuleLeader,setIsModuleLeader]=useState(false)

  const [selectedOption,setSelectedOption]=useState("Staff")
  const [alignment, setAlignment] = useState('web');

  const [selectedDegree,setSelectedDegree]=useState()
  const [selectedSubCourse,setSelectedSubCourse]=useState()
  const [selectedType,setSelectedType]=useState()
  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  useEffect(()=>{
    reset()
  },
  [selectedOption])

  return (
    <>
    {isLoggedIn && <Navigate to={'/'} replace={true}></Navigate>}
    <Stack flexDirection={'row'} height={'100vh'}>
      
      {/* left container */}
      <Lottie animationData={projectScreening}/>

      {/* rigght container */}
      <Stack flexDirection={'column'} justifyContent={'center'} alignItems={'center'}>

            {/* Image container */}
            <Stack width={'500px'}>
              <img src={logo} style={{width:"100%",height:"100%",objectFit:"contain"}} alt="logo-university" />
            </Stack>

            {/* feild and details container */}
            <Stack justifyContent={'center'} alignItems={'center'}>

            <Stack component={'form'} noValidate  width={"30rem"} spacing={2} onSubmit={handleSubmit((data)=>{
                if(selectedOption==='Student'){
                    const studentData={...data}
                    if(studentData.modeType===null){
                        studentData.modeType='part-time'
                    }
                    console.log(studentData)
                    dispatch(createStudentAsync(data))
                }
                else{
                    const signupdata={...data}
                    delete signupdata.confirmPassword

                    if(data.moduleLeader===false){
                        signupdata.moduleId='none'
                    }
                    console.log('cleaned data',signupdata)
                    dispatch(createStaffAsync(signupdata))
                }
            })}>

                <Stack flexDirection={'column'} justifyContent={"space-around"}>

                      <Typography justifySelf={'center'} alignSelf={'center'} variant='h4' fontWeight={600} color={'primary'}>Project Management</Typography>

                      <Stack mt={2} flexDirection={'row'} justifyContent={'center'} alignItems={'center'}>
                      <InputLabel sx={{mr:1}}>Select Role</InputLabel>
                      <Select
                        label="Select Role"
                        value={selectedOption}
                        onChange={()=>setSelectedOption(selectedOption==='Staff'?"Student":"Staff")}
                      >
                        <MenuItem value="Staff">Staff</MenuItem>
                        <MenuItem value="Student">Student</MenuItem>
                      </Select>
                      </Stack>


                </Stack>
                {
                  selectedOption==='Student'?(
                    <>
                    <Stack flexDirection={'row'} width={'100%'}>
                      <TextField {...register("name",{required:"name is required"})} placeholder='Name' fullWidth/>
                    </Stack>
                    <TextField {...register("id",{required:"id is required"})}  placeholder='Matriculation ID' type='number'/>
                    <TextField {...register("entryYear",{required:"year is required"})} placeholder='Entry Year' type='number'/>

                    <Stack flexDirection={'row'}>

                      {/* select degree */}
                        <FormControl fullWidth>
                          <InputLabel id="demo-simple-select-label">Select Degree</InputLabel>
                          <Select {...register("degree",{required:"degree is required"})} labelId="demo-simple-select-label" id="demo-simple-select" value={selectedDegree}
                            onChange={(e)=>setSelectedDegree(e.target.value)}
                          >
                            {
                              DEGREES_COURSES.map((item,index)=><MenuItem value={item} key={index}>{item}</MenuItem>)
                            }
                          </Select>
                        </FormControl>

                      {/* sub courses */}
                        <FormControl fullWidth>
                          <InputLabel id="demo-simple-select-label">Sub Courses</InputLabel>
                          <Select {...register("subCourse",{required:"sub courses is required"})} labelId="demo-simple-select-label" id="demo-simple-select" value={selectedSubCourse}
                            onChange={(e)=>setSelectedSubCourse(e.target.value)}
                          >
                            {
                              SUB_COURSES[selectedDegree]?.map((item,index)=><MenuItem value={item} key={index}>{item}</MenuItem>)
                            }
                          </Select>
                        </FormControl>



                    </Stack>

                    <Stack>
                    
                    <FormControl fullWidth>
                          <InputLabel id="demo-simple-select-label">Select Type</InputLabel>
                          <Select {...register("modeType",{required:"mode type is required"})}
                            onChange={(e)=>setSelectedSubCourse(e.target.value)}
                          >
                            
                             <MenuItem value={'part-time'}>Part Time</MenuItem>
                             <MenuItem value={'full-time'}>Full time</MenuItem>
                            
                          </Select>
                        </FormControl>
                    


                    </Stack>

                    <Stack>

                    </Stack>
                    <TextField {...register("password",{required:"passoword is required"})} placeholder='Password' type='password'/>
                    <TextField placeholder='Confirm Password' type='password'/>
                    </>
                  ):(
                    // if staff
                    <>
                    <TextField {...register("name", { required: 'name is required'})}  placeholder='Name'/>
                    <FormHelperText>{errors.name?.message}</FormHelperText>
                    <TextField type='number' {...register("staffId", { required: 'staffId is required'})} placeholder='Staff ID'/>
                    <FormHelperText>{errors.staffId?.message}</FormHelperText>
                    <TextField {...register("email", { required: 'email is required'})} placeholder='Email'/>
                    <FormControlLabel control={<Checkbox {...register("moduleLeader")} onChange={()=>setIsModuleLeader(!isModuleLeader)}/>} label="Check this, If you are a Module Leader"/>
                    {
                      isModuleLeader && (
                        <>
                        <TextField type='number' {...register("moduleId",{required:isModuleLeader})} placeholder='Module ID'/>
                        <FormHelperText>{errors?.moduleTitle?.message}</FormHelperText></>
                      )
                    }
                    <TextField {...register("password",{required:true})} placeholder='Password' type='password'/>
                    <TextField {...register("confirmPassword",{required:true,validate:(value,formValues)=>value===formValues.password || `Password dosen't match`})} placeholder='Confirm Password' type='password'/>
                    <FormHelperText>{errors.confirmPassword?.message}</FormHelperText>
                    
                    </>
                  )
                }
                <Button type='submit' variant='contained' sx={{height:'3rem'}}>Signup</Button>
            </Stack>
            
            <Link component={linkRoute} mt={2} to={'/login'} variant="body2">
                    {"Already a member? Log in"}
            </Link>
            <Copyright sx={{ mt: 5 }} />

            </Stack>


        </Stack>
        
      </Stack></>
  );
}