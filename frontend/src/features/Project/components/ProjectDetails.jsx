import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { fetchProjectByIdAsync, selectSelectProject } from '../ProjectSlice'
import { Button, Card, CardActions, CardContent, Stack, TextField, Typography } from '@mui/material'
import { Ratings } from './Ratings'
import { createAssignmentAsync, selectAssignments } from '../../assignments/AssignmentSlice'
import { selectLoggedInUser } from '../../auth/AuthSlice'
import Box from '@mui/material/Box';
import { useForm } from "react-hook-form"
import Grid from '@mui/material/Grid';
import Snackbar from '@mui/material/Snackbar';
import Modal from '@mui/material/Modal';
import Slide from '@mui/material/Slide';
import { axiosInstance } from '../../Staff/StaffApi'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius:".8rem"
};

export const ProjectDetails = () => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm()

    const project=useSelector(selectSelectProject)
    console.log(project)

    const [emailModal,setEmailModal]=useState(false)
    const {id}=useParams()

    const loggedInUser=useSelector(selectLoggedInUser)

    
    const [open, setOpen] = React.useState(false);
    const [transition, setTransition] = React.useState(undefined);

    const handleClick = (Transition) => () => {
        setTransition(() => Transition);
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };
    

    function TransitionLeft(props) {
        return <Slide {...props} direction="left" />;
      }
      
      function TransitionUp(props) {
        return <Slide {...props} direction="up" />;
      }
      
      function TransitionRight(props) {
        return <Slide {...props} direction="right" />;
      }
      
      function TransitionDown(props) {
        return <Slide {...props} direction="down" />;
      }
      

    const dispatch=useDispatch()

    

    const [isExpanded,setIsExpanded]=useState(true)
  const shortText=project?.description.slice(0,100)

  const assignments=useSelector(selectAssignments)
  console.log(assignments)

  const isProjectAlreadyApplied = assignments.some(project => project.id === id);

  const currentDate = new Date();

  const timeDifference = new Date(project?.postedDateTime) - currentDate

  const hoursDifference = Math.floor(timeDifference / (1000 * 60 * 60));

  const navigate=useNavigate()


    useEffect(()=>{
        dispatch(fetchProjectByIdAsync(id))
    },[])


    const showSnack=()=>{
        handleClick(TransitionUp)
        navigate("/")
    }



  return (
    <>
    {
      assignments && project && <Stack sx={{width:"100vw",justifyContent:"flex-start",alignItems:'center'}}>
    
    <Stack width={'70%'}>
    <Stack sx={{width:'100%',mt:2,cursor:'pointer'}}>
            <Card >
            <CardContent>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                {Math.abs(hoursDifference)===0?"posted just now":`posted ${Math.abs(hoursDifference)} hours ago`}
            </Typography>
            <Typography variant="h5" component="div">
                {project?.projectTitle}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                {project?.supervisorName}
            </Typography>
            <Typography gutterBottom variant="body2">
                {isExpanded?project?.description:shortText}
                {isExpanded===true?(
                <Typography sx={{cursor:"pointer"}} onClick={()=>setIsExpanded((prev)=>!prev)}>show less</Typography>
                ):(
                <Typography sx={{cursor:"pointer"}} onClick={()=>setIsExpanded((prev)=>!prev)}>...read more</Typography>
                )}
            </Typography>



            <Typography variant='body2' fontWeight={300} mt={3}>Difficulty Rating</Typography>
            
            <Ratings value={project?.difficultyRating}/>


            </CardContent>
            <CardActions>
            <Button size="large" disabled={isProjectAlreadyApplied} onClick={()=>{
              setEmailModal(true)
              }} variant='contained'>
                {isProjectAlreadyApplied?"Applied✅":'apply'}
            </Button>
            </CardActions>
        </Card>
    </Stack>

    <Stack mt={2} alignSelf={'flex-start'} spacing={2}>
        <Typography variant='h5' fontWeight={400}>Technologies to be Used</Typography>
        <Stack spacing={1}>
          {
            project.techStack.split(",").map((item)=>{
              return <Typography variant='h6'>{item}</Typography>
            })
          }
        </Stack>
    </Stack>

    <Stack mt={5} alignSelf={'flex-start'} spacing={2}>
        <Typography variant='h5' fontWeight={400}>Posted by</Typography>
        <Stack spacing={1}>
        <Typography>Name - {project?.supervisorName}</Typography>
        <Typography>Email -{project?.supervisorEmail}</Typography></Stack>
    </Stack>

    <Box sx={{ width: 300 }}>
      <Snackbar
        open={open}
        onClose={handleClose}
        TransitionComponent={transition}
        message={`Applied on ${project?.projectTitle} successfully`}
        key={transition ? transition.name : ''}
      />
    </Box>

    </Stack>
    <Modal
        open={emailModal}
        onClose={()=>setEmailModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Send an Email to supervisor
          </Typography>
          <Stack mt={2} spacing={2} component={'form'} onSubmit={handleSubmit(async(data)=>{
      try {
        const res=await axiosInstance.post("/projects/send-mail",{
          receivermail:project?.supervisorEmail,
          subject:data.subject,
          body:data.body
        })

        if(res.status===200){
          reset()
          dispatch(createAssignmentAsync({studentId:loggedInUser?.id,projectId:id}));alert(`Applied on ${project?.projectTitle} successfully`);navigate("/")
        }
      } catch (error) {
        console.log(error);
      }
          })}>
            <TextField {...register("subject",{required:'true'})} placeholder='Subject'></TextField>
            <TextField {...register("body",{required:'true'})}  multiline rows={5} placeholder='Body'></TextField>
            <Button type='submit' variant='contained'>Send apply mail</Button>
          </Stack>
        </Box>
      </Modal>
    </Stack>
    }
    

    </>
  )
}
