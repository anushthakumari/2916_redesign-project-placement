import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
	checkAuthAsync,
	selectAuthChecked,
	selectLoggedInUser,
} from "./features/auth/AuthSlice";
import { useEffect, useState } from "react";
import { getStudentDetailByIdAsync } from "./features/Student/StudentSlice";
import { getStaffDetailByIdAsync } from "./features/Staff/StaffSlice";
import {
	AddProjectPage,
	ApplyPage,
	EditProfilePage,
	HomePage,
	LoginPage,
	LogoutPage,
	ManageProjectPage,
	ProjectDetailsPage,
	SignupPage,
	StaffProfilePage,
	StudentProfilePage,
	HomePageHCI,
} from "./pages";

import { ProctectedStudent } from "./features/auth/components/ProtectedStudent";
import { Signup as StaffSignup } from "./features/auth/components/StaffSignup";
import { Login as StaffLogin } from "./features/auth/components/StaffLogin";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
	Box,
	Stack,
	FormControlLabel,
	Switch,
	Typography,
} from "@mui/material";

import { selectUiState, toggle } from "./features/assignments/uiSlice";

function App() {
	const loggedInUser = useSelector(selectLoggedInUser);
	const dispatch = useDispatch();

	const uiState = useSelector(selectUiState);

	const isAuthChecked = useSelector(selectAuthChecked);

	useEffect(() => {
		if (loggedInUser?.role === "student") {
			dispatch(getStudentDetailByIdAsync(loggedInUser.id));
		} else if (loggedInUser?.role === "staff") {
			dispatch(getStaffDetailByIdAsync(loggedInUser.id));
		}
	}, [loggedInUser]);

	useEffect(() => {
		dispatch(checkAuthAsync());
	}, []);

	return (
		<>
			<Stack
				sx={{
					justifyContent: "center",
					alignItems: "center",
					flexDirection: "row",
					display: "flex",
				}}
				padding={"4px"}
				bgcolor={"primary"}>
				<Typography>Gestalt Law</Typography>
				<Switch
					size="small"
					checked={uiState === "hci"}
					onChange={() => {
						dispatch(toggle());
					}}
				/>
				<Typography>HCI Principle</Typography>
			</Stack>
			<Router>
				<Routes>
					{isAuthChecked && (
						<>
							<Route
								exact
								path="/"
								element={
									<ProctectedStudent>
										{uiState === "hci" ? <HomePageHCI /> : <HomePage />}
									</ProctectedStudent>
								}
							/>
							<Route exact path="/login" element={<LoginPage />} />
							<Route exact path="/signup" element={<SignupPage />} />
							<Route exact path="/staff/login" element={<StaffLogin />} />
							<Route exact path="/staff/signup" element={<StaffSignup />} />
							<Route exact path="/editprofile" element={<EditProfilePage />} />
							<Route exact path="/apply" element={<ApplyPage />} />
							<Route
								exact
								path="/profile/staff"
								element={<StaffProfilePage />}
							/>
							<Route
								exact
								path="/profile/student"
								element={<StudentProfilePage />}
							/>
							<Route
								exact
								path="/project-details/:id"
								element={<ProjectDetailsPage />}
							/>
							<Route
								exact
								path="/manage-projects"
								element={<ManageProjectPage />}
							/>
							<Route exact path="/add-project" element={<AddProjectPage />} />
							<Route exact path="/logout" element={<LogoutPage />} />
						</>
					)}
				</Routes>
				<ToastContainer />
			</Router>
		</>
	);
}

export default App;
