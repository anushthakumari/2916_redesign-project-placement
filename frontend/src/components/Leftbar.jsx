import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { Link, useNavigate } from 'react-router-dom';
import { BrowseGallery, Home } from '@mui/icons-material';
import {useSelector} from 'react-redux'
import { selectLoggedInUser } from '../features/auth/AuthSlice';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';

export const Leftbar=()=> {

  const navigate=useNavigate()
  const user=useSelector(selectLoggedInUser)

  return (
    <Box sx={{ width: '100%' ,bgcolor: 'background.paper' ,height:"100%"}}>
      <nav aria-label="main mailbox folders">
        <List>
          {
            user.role==='student'?(
              <>
<ListItem disablePadding component={Link} to={"/"} sx={{color:'black',textDecoration:"none"}}>
            <ListItemButton>
              <ListItemIcon>
                <Home/>
              </ListItemIcon>
              <ListItemText  primary="Home"/>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding component={Link} to={"/apply"} sx={{color:'black',textDecoration:"none"}}>
            <ListItemButton>
              <ListItemIcon>
                <BrowseGallery />
              </ListItemIcon>
              <ListItemText  primary="Browse new Projects"/>
            </ListItemButton>
          </ListItem></>
            ):(
              <>
              <ListItemButton onClick={()=>navigate("/manage-projects")}>
              <ListItemIcon>
                <AssignmentIcon/>
              </ListItemIcon>
              <ListItemText  primary="Manage Projects"/>
            </ListItemButton>
              <ListItemButton  onClick={()=>navigate("/add-project")}>
              <ListItemIcon>
                <AddCircleOutlineOutlinedIcon/>
              </ListItemIcon>
              <ListItemText  primary="Add new Project"/>
            </ListItemButton>
            
            
            </>
            )
          }
        
        </List>
      </nav>
      <Divider />
    </Box>
  );
}