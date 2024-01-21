import { BrowserRouter as Router ,Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { checkAuthAsync, selectAuthChecked, selectLoggedInUser } from "./features/auth/AuthSlice";
import { useEffect } from "react";
import { getStudentDetailByIdAsync } from "./features/Student/StudentSlice";
import { getStaffDetailByIdAsync } from "./features/Staff/StaffSlice";
import { AddProjectPage, ApplyPage, EditProfilePage, HomePage, LoginPage,LogoutPage,ManageProjectPage,ProjectDetailsPage, SignupPage, StaffProfilePage, StudentProfilePage } from "./pages";
import { ProctectedStudent } from "./features/auth/components/ProtectedStudent";




function App() {
  const loggedInUser=useSelector(selectLoggedInUser)
  const dispatch=useDispatch()

  const isAuthChecked=useSelector(selectAuthChecked)


  useEffect(()=>{
    if(loggedInUser?.role==='student'){
      dispatch(getStudentDetailByIdAsync(loggedInUser.id))
    }
    else if(loggedInUser?.role==='staff'){
      dispatch(getStaffDetailByIdAsync(loggedInUser.id))
    }
  },[loggedInUser])

  useEffect(()=>{
    dispatch(checkAuthAsync())
  },[])


  return (
    <Router>
        <Routes>
          {isAuthChecked && 
            <>
            <Route exact path="/" element={<ProctectedStudent><HomePage/></ProctectedStudent>}/>
            <Route exact path="/login" element={<LoginPage/>}/>
            <Route exact path="/signup" element={<SignupPage/>}/>
            <Route exact path="/editprofile" element={<EditProfilePage/>}/>
            <Route exact path="/apply" element={<ApplyPage/>}/>
            <Route exact path="/profile/staff" element={<StaffProfilePage/>}/>
            <Route exact path="/profile/student" element={<StudentProfilePage/>}/>
            <Route exact path="/project-details/:id" element={<ProjectDetailsPage/>}/>
            <Route exact path="/manage-projects" element={<ManageProjectPage/>}/>
            <Route exact path="/add-project" element={<AddProjectPage/>}/>
            <Route exact path="/logout" element={<LogoutPage/>}/>
            </>          
          }
           
        </Routes>    
    </Router>
  );
}

export default App;