import { Box, Button, FormControl, InputLabel, MenuItem, Select, Stack, TextField, Typography, createTheme } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { selectStaffInfo } from '../StaffSlice';
import { addProjectAsync } from '../../Project/ProjectSlice';
import { Leftbar } from '../../../components/Leftbar';
import {useNavigate } from 'react-router-dom';
import OutlinedInput from '@mui/material/OutlinedInput';
import Chip from '@mui/material/Chip';
import { useTheme } from '@emotion/react';


const theme=createTheme()

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, personName, theme) {
    return {
      fontWeight:
        personName.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }




const tech = ['React', 'HTML', 'CSS', 'Vue', 'JavaScript', 'Node.js', 'Express.js', 'Python', 'Django', 'Ruby', 'Ruby on Rails', 'Java', 'Spring Boot', 'PHP', 'Laravel', 'C#', '.NET', 'Angular', 'TypeScript', 'Swift', 'Kotlin', 'SQL', 'NoSQL', 'MongoDB', 'MySQL', 'PostgreSQL', 'Git', 'GitHub', 'Docker', 'Kubernetes', 'AWS', 'Azure', 'Google Cloud', 'Firebase', 'Heroku', 'RESTful API', 'GraphQL', 'SASS', 'LESS', 'Bootstrap', 'Tailwind CSS', 'Redux', 'VueX', 'JQuery', 'ASP.NET', 'Vue Router', 'React Router', 'Webpack', 'Gulp', 'Grunt', 'Jenkins', 'Travis CI', 'CircleCI', 'Jest', 'Mocha', 'Chai', 'Cypress', 'Selenium', 'Linux', 'Windows', 'macOS', 'Nginx', 'Apache', 'Agile', 'Scrum', 'Kanban', 'TDD', 'BDD', 'CI/CD'];

export const AddProject = () => {

    const theme = useTheme();
    const [techName, setTechName] = React.useState([]);
  
    const handleChange = (event) => {
        console.log(techName)
      const {
        target: { value },
      } = event;
      setTechName(
        // On autofill we get a stringified value.
        typeof value === 'string' ? value.split(',') : value,
      );
    };

    const [buttontxt,Setbuttontxt]=useState("Add Project")
    const { register,handleSubmit,watch,reset,formState: { errors },} = useForm()

    const projectTitle=watch("projectTitle",'')

    const staff=useSelector(selectStaffInfo)
    const dispatch=useDispatch()

    const navigate=useNavigate()


    useEffect(()=>{
        setTimeout(() => {
            Setbuttontxt('add project')
        }, 1000);
    },[buttontxt])


  return (
    <Stack width={'100vw'} height={'calc(100vh - 8rem)'} justifyContent={'center'} alignItems={'center'}>

            
        <Stack width={"70%"} height={"100%"}  justifyContent={'space-evenly'} alignItems={'center'} flexDirection={'row'}>

            <Box flex={"20%"}  bgcolor={'red'} height={"100%"}>
                <Leftbar/>
            </Box>


            <Stack width={'70rem'} spacing={2} component={'form'} noValidate onSubmit={handleSubmit((data)=>{
              const finalData={...data,supervisorEmail:staff.email,supervisorName:staff.name,staffId:staff.id,techStack:techName.join(', ')}
              
              dispatch(addProjectAsync(finalData))
              Setbuttontxt("Added")
              reset()
              navigate("/manage-projects")
              
            })}> 

                <Typography  variant='h4'>Creating Project - {projectTitle}</Typography>
                <TextField {...register("projectTitle",{required:"title is required"})} placeholder='Project Title'></TextField>
                <TextField {...register("description",{required:"desciption is required"})} placeholder='Description'></TextField>
                <FormControl>

                <InputLabel>Select Difficulty Rating</InputLabel>
                <Select {...register("difficultyRating",{required:"description is required"})}>
                    <MenuItem value={1}>1</MenuItem>
                    <MenuItem value={2}>2</MenuItem>
                    <MenuItem value={3}>3</MenuItem>
                    <MenuItem value={4}>4</MenuItem>
                    <MenuItem value={5}>5</MenuItem>
                </Select>
                </FormControl>


                <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-chip-label">Select Technologies</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          fullWidth
          value={techName}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {tech.map((name) => (
            <MenuItem
              key={name}
              value={name}
              style={getStyles(name, techName, theme)}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

                <Button variant='contained' disabled={techName.length===0} type='submit'>{buttontxt}</Button>
            </Stack>
            
        </Stack>
    </Stack>
  )
}
