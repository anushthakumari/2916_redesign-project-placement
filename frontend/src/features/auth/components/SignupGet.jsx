import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { projectScreening } from "../../../assets";
import { Box, Checkbox, Divider, FormHelperText, Stack } from "@mui/material";
import { Navigate, Link as linkRoute } from "react-router-dom";
import Button from "@mui/material/Button";
import { ErrorMessage } from "@hookform/error-message";
import Lottie from "lottie-react";
import { Select, MenuItem, InputLabel } from "@mui/material";
import { useEffect, useState } from "react";
import { MuiCheckbox } from "../../../components/MuiCheckbox";
import { DEGREES_COURSES, SUB_COURSES } from "../../../constants";
import { FormControl, FormControlLabel } from "@mui/material";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import {
	createStaffAsync,
	createStudentAsync,
	selectLoggedInUser,
} from "../AuthSlice";
import logo from "../../../assets/logo/logo.jpg";

function Copyright(props) {
	return (
		<Typography
			variant="body2"
			color="text.secondary"
			align="center"
			{...props}>
			{"Copyright © "}
			<Link color="inherit">Project Mangament Portal</Link>{" "}
			{new Date().getFullYear()}
			{"."}
		</Typography>
	);
}

export const SignupGet = () => {
	const isLoggedIn = useSelector(selectLoggedInUser);
	const dispatch = useDispatch();
	const {
		register,
		handleSubmit,
		watch,
		reset,
		formState: { errors },
	} = useForm();
	const [isModuleLeader, setIsModuleLeader] = useState(false);

	const [selectedOption, setSelectedOption] = useState("Student");
	const [alignment, setAlignment] = useState("web");

	const [selectedDegree, setSelectedDegree] = useState();
	const [selectedSubCourse, setSelectedSubCourse] = useState();
	const [selectedType, setSelectedType] = useState();
	const handleChange = (event, newAlignment) => {
		setAlignment(newAlignment);
	};

	const handleRoleChange = (event) => {
		setSelectedOption(selectedOption === "Staff" ? "Student" : "Staff");
	};

	useEffect(() => {
		reset();
	}, [selectedOption]);

	return (
		<>
			{isLoggedIn && <Navigate to={"/"} replace={true}></Navigate>}
			<Stack flexDirection={"row"} minHeight={"100vh"}>
				{/* left container */}
				{/* <Lottie animationData={projectScreening} /> */}
				<Stack
					width={"100%"}
					justifyContent={"center"}
					alignItems={"center"}
					flex={1}>
					<img
						src={logo}
						style={{
							width: "100%",
							flex: 1,
							height: "100%",
							objectFit: "contain",
						}}
						alt="logo-university"
					/>
					<Typography
						flex={1}
						variant="h4"
						fontWeight={600}
						mb={2}
						color={"primary"}>
						Welcome to sign up page!
					</Typography>
				</Stack>

				<Divider
					orientation="vertical"
					sx={{
						borderColor: "#163020",
					}}
					flexItem
				/>

				{/* rigght container */}
				<Stack
					flex={1}
					flexDirection={"column"}
					justifyContent={"center"}
					alignItems={"center"}>
					{/* Image container */}

					{/* feild and details container */}
					<Stack justifyContent={"center"} alignItems={"center"}>
						<Stack
							component={"form"}
							noValidate
							width={"30rem"}
							spacing={2}
							onSubmit={handleSubmit((data) => {
								if (selectedOption === "Student") {
									const studentData = { ...data };
									if (studentData.modeType === null) {
										studentData.modeType = "part-time";
									}
									console.log(studentData);
									dispatch(createStudentAsync(data));
								} else {
									const signupdata = { ...data };
									delete signupdata.confirmPassword;

									if (data.moduleLeader === false) {
										signupdata.moduleId = "none";
									}
									console.log("cleaned data", signupdata);
									dispatch(createStaffAsync(signupdata));
								}
							})}>
							<Stack flexDirection={"column"} justifyContent={"space-around"}>
								{/* <Stack
									mt={2}
									flexDirection={"row"}
									justifyContent={"center"}
									alignItems={"center"}>
									<InputLabel sx={{ mr: 1 }}>Select Role</InputLabel>
									<Select
										label="Select Role"
										value={selectedOption}
										onChange={() =>
											setSelectedOption(
												selectedOption === "Staff" ? "Student" : "Staff"
											)
										}>
										<MenuItem value="Staff">Staff</MenuItem>
										<MenuItem value="Student">Student</MenuItem>
									</Select>
								</Stack> */}
								{/* <FormControl
									component="div"
									style={{
										display: "flex",
										flexDirection: "row",
										justifyContent: "flex-start",
										alignItems: "center",
										alignSelf: "flex-start",
										margin: 0,
										padding: 0,
									}}>
									<FormControlLabel
										control={
											<Checkbox
												checked={selectedOption === "Student"}
												onChange={handleRoleChange}
											/>
										}
										label="Register as Student"
										labelPlacement=""
										// a11y props for screen readers
										labelId="student-checkbox-label"
										controlId="student-checkbox"
									/>
									<FormControlLabel
										control={
											<Checkbox
												checked={selectedOption === "Staff"}
												onChange={handleRoleChange}
											/>
										}
										label="Register as Staff"
										labelPlacement=""
										// a11y props for screen readers
										labelId="staff-checkbox-label"
										controlId="staff-checkbox"
									/>
								</FormControl> */}
							</Stack>
							{selectedOption === "Student" ? (
								<>
									<Stack mt={"20px"}>
										<Typography
											mb={3}
											variant="h4"
											textAlign={"center"}
											fontWeight={600}
											color={"primary"}>
											Sign Up
										</Typography>
										<Typography variant="h6">Personal Details</Typography>
										<Divider
											sx={{
												borderWidth: "2px",
											}}
										/>
									</Stack>
									<Stack width={"100%"}>
										<TextField
											{...register("name", {
												required: "name is required",
												pattern: {
													message: "Please enter valid name",
													value:
														/^[a-zA-Z\u00C0-\u017F]+(?:\s[a-zA-Z\u00C0-\u017F]+)*$/,
												},
											})}
											placeholder="Name"
											size="small"
											fullWidth
											aria-label="Name"
										/>
										<ErrorMessage
											errors={errors}
											name={"name"}
											render={({ message }) => (
												<span style={{ color: "red" }}> {message}</span>
											)}
										/>
									</Stack>
									<Stack>
										<TextField
											{...register("id", { required: "id is required" })}
											placeholder="Matriculation ID"
											type="number"
											size="small"
											aria-label="Matriculation ID"
										/>
										<ErrorMessage
											errors={errors}
											name={"id"}
											render={({ message }) => (
												<span style={{ color: "red" }}> {message}</span>
											)}
										/>
									</Stack>
									<Typography variant="h6">Program Details</Typography>
									<Divider
										sx={{
											borderWidth: "2px",
										}}
									/>
									<Stack>
										<TextField
											{...register("entryYear", {
												required: "year is required",
												pattern: {
													message: "Please enter valid year",
													value: /^[0-9]{4}$/,
												},
											})}
											placeholder="Entry Year"
											type="number"
											aria-label="Entry Year"
											size="small"
										/>
										<ErrorMessage
											errors={errors}
											name={"entryYear"}
											render={({ message }) => (
												<span style={{ color: "red" }}> {message}</span>
											)}
										/>
									</Stack>

									<Stack flexDirection={"row"}>
										{/* select degree */}
										<FormControl size="small" fullWidth>
											<InputLabel id="demo-simple-select-label">
												Select Degree
											</InputLabel>
											<Select
												{...register("degree", {
													required: "degree is required",
												})}
												labelId="demo-simple-select-label"
												id="demo-simple-select"
												value={selectedDegree}
												onChange={(e) => setSelectedDegree(e.target.value)}>
												{DEGREES_COURSES.map((item, index) => (
													<MenuItem value={item} key={index}>
														{item}
													</MenuItem>
												))}
											</Select>
											<ErrorMessage
												errors={errors}
												name={"degree"}
												render={({ message }) => (
													<span style={{ color: "red" }}> {message}</span>
												)}
											/>
										</FormControl>

										{/* sub courses */}
										<FormControl size="small" fullWidth>
											<InputLabel id="demo-simple-select-label">
												Sub Courses
											</InputLabel>
											<Select
												{...register("subCourse", {
													required: "sub courses is required",
												})}
												labelId="demo-simple-select-label"
												id="demo-simple-select"
												value={selectedSubCourse}
												onChange={(e) => setSelectedSubCourse(e.target.value)}>
												{SUB_COURSES[selectedDegree]?.map((item, index) => (
													<MenuItem value={item} key={index}>
														{item}
													</MenuItem>
												))}
											</Select>
											<ErrorMessage
												errors={errors}
												name={"subCourse"}
												render={({ message }) => (
													<span style={{ color: "red" }}> {message}</span>
												)}
											/>
										</FormControl>
									</Stack>

									<Stack>
										<FormControl size="small" fullWidth>
											<InputLabel id="demo-simple-select-label">
												Select Type
											</InputLabel>
											<Select
												{...register("modeType", {
													required: "mode type is required",
												})}
												onChange={(e) => setSelectedSubCourse(e.target.value)}>
												<MenuItem value={"part-time"}>Part Time</MenuItem>
												<MenuItem value={"full-time"}>Full time</MenuItem>
											</Select>
											<ErrorMessage
												errors={errors}
												name={"modeType"}
												render={({ message }) => (
													<span style={{ color: "red" }}> {message}</span>
												)}
											/>
										</FormControl>
									</Stack>

									<Typography variant="h6">Passwords</Typography>
									<Divider
										sx={{
											borderWidth: "2px",
										}}
									/>

									<Stack>
										<TextField
											{...register("password", {
												required: "password is required",
											})}
											placeholder="Password"
											type="password"
											size="small"
										/>
										<ErrorMessage
											errors={errors}
											name={"password"}
											render={({ message }) => (
												<span style={{ color: "red" }}> {message}</span>
											)}
										/>
									</Stack>
									<Stack>
										<TextField
											placeholder="Confirm Password"
											type="password"
											size="small"
											{...register("confirmPassword", {
												required: true,
												validate: (value, formValues) =>
													value === formValues.password ||
													`Password dosen't match`,
											})}
										/>
										<ErrorMessage
											errors={errors}
											name={"confirmPassword"}
											render={({ message }) => (
												<span style={{ color: "red" }}> {message}</span>
											)}
										/>
									</Stack>
								</>
							) : (
								// if staff
								<>
									<Stack>
										<TextField
											{...register("name", {
												required: "name is required",
												pattern: {
													message: "Please enter valid name",
													value:
														/^[a-zA-Z\u00C0-\u017F]+(?:\s[a-zA-Z\u00C0-\u017F]+)*$/,
												},
											})}
											placeholder="Name"
											size="small"
										/>
										<ErrorMessage
											errors={errors}
											name={"name"}
											render={({ message }) => (
												<span style={{ color: "red" }}> {message}</span>
											)}
										/>
									</Stack>
									<Stack>
										<TextField
											type="number"
											{...register("staffId", {
												required: "staffId is required",
											})}
											placeholder="Staff ID"
											size="small"
										/>
										<ErrorMessage
											errors={errors}
											name={"staffId"}
											render={({ message }) => (
												<span style={{ color: "red" }}> {message}</span>
											)}
										/>
									</Stack>

									<Stack>
										<TextField
											{...register("email", { required: "email is required" })}
											placeholder="Email"
											size="small"
										/>
										<ErrorMessage
											errors={errors}
											name={"email"}
											render={({ message }) => (
												<span style={{ color: "red" }}> {message}</span>
											)}
										/>
									</Stack>

									<FormControlLabel
										control={
											<Checkbox
												{...register("moduleLeader")}
												onChange={() => setIsModuleLeader(!isModuleLeader)}
											/>
										}
										label="Check this, If you are a Module Leader"
									/>
									{isModuleLeader && (
										<>
											<TextField
												type="number"
												{...register("moduleId", { required: isModuleLeader })}
												placeholder="Module ID"
												size="small"
											/>
											<FormHelperText sx={{ color: "red" }}>
												{errors?.moduleTitle?.message}
											</FormHelperText>
										</>
									)}
									<Stack>
										<TextField
											{...register("password", { required: true })}
											placeholder="Password"
											type="password"
											size="small"
										/>
										<ErrorMessage
											errors={errors}
											name={"password"}
											render={({ message }) => (
												<span style={{ color: "red" }}> {message}</span>
											)}
										/>
									</Stack>
									<Stack>
										<TextField
											{...register("confirmPassword", {
												required: true,
												validate: (value, formValues) =>
													value === formValues.password ||
													`Password dosen't match`,
											})}
											placeholder="Confirm Password"
											type="password"
											size="small"
										/>
										<FormHelperText sx={{ color: "red" }}>
											{errors.confirmPassword?.message}
										</FormHelperText>
									</Stack>
								</>
							)}
							<Button
								size="small"
								type="submit"
								variant="contained"
								sx={{ height: "2.5rem" }}>
								Signup
							</Button>
						</Stack>

						<Box mt={4}>
							<span>Already a member?</span>
							<Link component={linkRoute} to={"/login"} variant="body2">
								{"Log in"}
							</Link>
						</Box>
						<Box sx={{ mt: 5 }}>
							<Divider />
							<Copyright sx={{ mt: 2 }} />
						</Box>
					</Stack>
				</Stack>
			</Stack>
		</>
	);
};
