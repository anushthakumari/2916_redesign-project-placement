import { Box, Stack } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProjectByProfessorIdAsync, selectAllProjects } from '../../Project/ProjectSlice'
import { selectLoggedInUser } from '../../auth/AuthSlice'
import { ProjectCard } from '../../Project/components/ApplyProjectCard'
import { Leftbar } from '../../../components/Leftbar'
import { AssignedProjectCard } from '../../../components/AssignedProjectCard'
import { assignedProjectsData } from '../../../constants'

export const ManageProject = () => {
    const dispatch=useDispatch()
    const user=useSelector(selectLoggedInUser)

    const projects=useSelector(selectAllProjects)
    console.log(projects)

    useEffect(()=>{
        if(user.id){
            dispatch(fetchProjectByProfessorIdAsync(user.id))
        }
    },[user])



  return (
    <>
    {projects && 
    
    <Stack sx={{width:'100vw',height:"100vh",justifyContent:'center',alignItems:'center',flexDirection:"row",display:'flex',p:1}}>
        

        <Stack width={"70%"} height={"100%"}  justifyContent={'space-evenly'} alignItems={'center'} flexDirection={'row'}>

            <Box flex={"20%"}  bgcolor={'red'} height={"100%"}>
                <Leftbar/>
            </Box>

            {/* rightbar */}
            <Stack flex={"80%"} height={'100%'}>
                <Stack width={'100%'} p={2} justifyContent={'center'} alignItems={'center'}>
                          {
            projects.map((project)=>(
                <ProjectCard staff={true} wholeProjectData={project}  key={project.id} difficultyRating={project.difficultyRating} postedDateTime={project.postedDateTime} problemStatement={project.description} projectTitle={project.projectTitle} projectid={project.id} supervisorName={project.supervisorName}></ProjectCard>
            ))
        }
                </Stack>
            </Stack>


        </Stack>

    </Stack>
}

    
    </>
  )
}
