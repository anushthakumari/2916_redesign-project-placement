import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, Link } from "react-router-dom";
import { fetchProjectByIdAsync, selectSelectProject } from "../ProjectSlice";
import {
	Button,
	Card,
	CardActions,
	CardContent,
	Stack,
	TextField,
	Typography,
	IconButton,
	Avatar,
	Divider,
	Icon,
} from "@mui/material";
import { ErrorMessage } from "@hookform/error-message";
import { Ratings } from "./Ratings";
import {
	createAssignmentAsync,
	selectAssignments,
} from "../../assignments/AssignmentSlice";
import { selectLoggedInUser } from "../../auth/AuthSlice";
import Box from "@mui/material/Box";
import { useForm } from "react-hook-form";
import Grid from "@mui/material/Grid";
import Snackbar from "@mui/material/Snackbar";
import Modal from "@mui/material/Modal";
import Slide from "@mui/material/Slide";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CloseIcon from "@mui/icons-material/Close";

import { axiosInstance } from "../../Staff/StaffApi";

const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 400,
	bgcolor: "background.paper",
	boxShadow: 24,
	p: 4,
	borderRadius: ".8rem",
};

export const ProjectDetails = () => {
	const {
		register,
		handleSubmit,
		reset,
		watch,
		formState: { errors },
	} = useForm();

	const project = useSelector(selectSelectProject);

	const [emailModal, setEmailModal] = useState(false);
	const [isLoading, setisLoading] = useState(false);
	const { id } = useParams();

	const loggedInUser = useSelector(selectLoggedInUser);

	const isStaff = loggedInUser?.email === project?.supervisorEmail;

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

	const dispatch = useDispatch();

	const [isExpanded, setIsExpanded] = useState(true);
	const shortText = project?.description.slice(0, 100);

	const assignments = useSelector(selectAssignments);
	console.log(assignments);

	const isProjectAlreadyApplied = assignments.some(
		(project) => project.id == id
	);

	const currentDate = new Date();

	const timeDifference = new Date(project?.postedDateTime) - currentDate;

	const hoursDifference = Math.floor(timeDifference / (1000 * 60 * 60));

	const navigate = useNavigate();

	useEffect(() => {
		dispatch(fetchProjectByIdAsync(id));
	}, []);

	const showSnack = () => {
		handleClick(TransitionUp);
		navigate("/");
	};

	return (
		<>
			{assignments && project && (
				<Stack
					sx={{
						width: "100vw",
						justifyContent: "flex-start",
						alignItems: "center",
					}}>
					<Stack width={"70%"}>
						<Stack sx={{ width: "100%", mt: 2, cursor: "pointer" }}>
							<Stack
								flexDirection={"row"}
								alignItems={"center"}
								component={Link}
								sx={{
									textDecoration: "none",
									color: "black",
									marginBottom: "20px",
								}}
								to="/">
								<IconButton edge="start" aria-label="back">
									<ArrowBackIcon />
								</IconButton>
								Go Back
							</Stack>
							{/* <Card> */}
							{/* <CardContent> */}

							<Stack my={1}>
								<Typography variant={"h4"} fontWeight={700}>
									{project?.projectTitle}
								</Typography>
								<Typography
									sx={{ fontSize: 14 }}
									color="text.secondary"
									gutterBottom>
									{Math.abs(hoursDifference) === 0
										? "posted just now"
										: `posted ${Math.abs(hoursDifference)} hours ago`}
								</Typography>
							</Stack>
							<Divider />

							<Stack minHeight={"50px"} my={2}>
								<Typography variant="body">{project?.description}</Typography>
							</Stack>
							<Divider />

							<Stack flexDirection={"row"} my={3} alignItems={"center"} gap={2}>
								<Stack alignItems={"center"} flexDirection={"row"} gap={1}>
									<Typography
										variant="body1"
										color="text.secondary"
										component="div">
										Project Id:
									</Typography>
									<Typography variant="body1" fontWeight={600}>
										{project?.id}
									</Typography>
								</Stack>
								<Stack flexDirection={"row"} alignItems={"center"} gap={1}>
									<Typography
										variant="body1"
										color="text.secondary"
										component="div">
										Supervisior:
									</Typography>
									<Stack gap={1} direction={"row"} alignItems={"center"}>
										<Avatar
											sx={{ width: 24, height: 24 }}
											alt="Remy Sharp"
											src="https://static.vecteezy.com/system/resources/previews/009/292/244/original/default-avatar-icon-of-social-media-user-vector.jpg"
										/>
										<Typography
											variant="body1"
											fontWeight={600}
											component="div">
											{project?.supervisorName}
										</Typography>
									</Stack>
								</Stack>
							</Stack>
							<Divider />
							<Stack flexDirection={"row"} alignItems={"center"} gap={2} my={3}>
								<Stack flexDirection={"row"} alignItems={"center"} gap={1}>
									<Typography
										variant="body1"
										color="text.secondary"
										fontWeight={300}>
										Difficulty Rating
									</Typography>

									<Ratings value={project?.difficultyRating} />
								</Stack>
							</Stack>
							<Divider />

							<Stack flexDirection={"row"} alignItems={"center"} gap={2} my={3}>
								<Stack flexDirection={"row"} alignItems={"center"} gap={1}>
									<Typography
										variant="body1"
										color="text.secondary"
										fontWeight={300}>
										Required Skills:
									</Typography>

									<Typography variant="body1" fontWeight={600}>
										{project.techStack}
									</Typography>
								</Stack>
							</Stack>

							<Divider />

							{/* </CardContent> */}
							{/* <CardActions> */}
							{/* <Button
								size="small"
								disabled={isProjectAlreadyApplied}
								sx={{
									width: "200px",
								}}
								onClick={() => {
									setEmailModal(true);
								}}
								variant="contained">
								{isProjectAlreadyApplied ? "Applied✅" : "apply"}
							</Button> */}
							{/* </CardActions> */}
							{/* </Card> */}
						</Stack>

						{/* <Stack mt={5} alignSelf={"flex-start"} spacing={2}>
							<Typography variant="h5" fontWeight={400}>
								Posted by
							</Typography>
							<Stack spacing={1}>
								<Typography>Name - {project?.supervisorName}</Typography>
								<Typography>Email -{project?.supervisorEmail}</Typography>
							</Stack>
						</Stack> */}

						<Stack flexDirection={"row"} alignItems={"center"} gap={2} my={3}>
							<Stack flexDirection={"row"} alignItems={"center"} gap={1}>
								<Typography
									variant="body1"
									color="text.secondary"
									fontWeight={300}>
									Capacity:
								</Typography>

								<Typography variant="body1" fontWeight={600}>
									0/5
								</Typography>
							</Stack>
						</Stack>
						<Divider />
						{isStaff ? null : (
							<ProjectButton
								size="large"
								disabled={isProjectAlreadyApplied}
								sx={{
									minWidth: "200px",
									maxWidth: "400px",
									marginTop: "20px",
									// margn
								}}
								onClick={() => {
									setEmailModal(true);
								}}
								variant="contained"
								aria-haspopup="dialog"
								aria-label="Apply To The Project">
								{isProjectAlreadyApplied
									? "Applied✅"
									: "apply to this project"}
							</ProjectButton>
						)}

						<Box sx={{ width: 300 }}>
							<Snackbar
								open={open}
								onClose={handleClose}
								TransitionComponent={transition}
								message={`Applied on ${project?.projectTitle} successfully`}
								key={transition ? transition.name : ""}
							/>
						</Box>
					</Stack>
					<Modal
						id="applyform"
						open={emailModal}
						onClose={() => setEmailModal(false)}
						aria-labelledby="send-an-email-to-supervisor">
						<Box sx={style}>
							<IconButton
								size="small"
								onClick={() => setEmailModal(false)}
								sx={{
									backgroundColor: "#333",
									color: "white",
									ml: "92%",
								}}
								aria-label="close">
								<CloseIcon />
							</IconButton>
							<Typography
								id="send-an-email-to-supervisor"
								variant="h6"
								component="h2">
								Send An Apply Email to The Supervisor
							</Typography>
							<Stack
								mt={2}
								spacing={2}
								component={"form"}
								onSubmit={handleSubmit(async (data) => {
									try {
										setisLoading(true);
										const res = await axiosInstance.post(
											"/projects/send-mail",
											{
												receivermail: project?.supervisorEmail,
												subject: data.subject,
												body: data.body,
											}
										);

										if (res.status !== 200) {
											reset();
											dispatch(
												createAssignmentAsync({
													studentId: loggedInUser?.id,
													projectId: id,
												})
											);
											alert(`Applied on ${project?.projectTitle} successfully`);
											navigate("/");
										}
									} catch (error) {
										console.log(error);
										alert("Something went wrong while sending email!");
									} finally {
										setisLoading(false);
									}
								})}>
								<TextField
									aria-label="Email Subject"
									aria-required="true"
									label="Email Subject"
									{...register("subject", {
										required: "Please fill the subject field",
										minLength: {
											value: 10,
											message: "Subject is too short",
										},
									})}
									placeholder="Subject"></TextField>
								<ErrorMessage
									errors={errors}
									name="subject"
									render={({ message }) => (
										<p style={{ color: "red" }}> {message}</p>
									)}
								/>
								<TextField
									aria-label="Email Body"
									aria-required="true"
									label="Email Body"
									{...register("body", {
										required: "Please fill the body field",
										minLength: {
											value: 10,
											message: "Email Body is too short",
										},
									})}
									multiline
									rows={5}
									placeholder="Body"></TextField>
								<ErrorMessage
									errors={errors}
									name="body"
									render={({ message }) => (
										<p style={{ color: "red" }}> {message}</p>
									)}
								/>
								<Button type="submit" variant="contained" disabled={isLoading}>
									{isLoading ? "Loading..." : "Send Email"}
								</Button>
							</Stack>
						</Box>
					</Modal>
				</Stack>
			)}
		</>
	);
	// return (
	// 	<>
	// 		{assignments && project && (
	// 			<Stack
	// 				sx={{
	// 					width: "100vw",
	// 					justifyContent: "flex-start",
	// 					alignItems: "center",
	// 				}}>
	// 				<Stack width={"70%"}>
	// 					<Stack sx={{ width: "100%", mt: 2, cursor: "pointer" }}>
	// 						<Stack
	// 							flexDirection={"row"}
	// 							alignItems={"center"}
	// 							component={Link}
	// 							sx={{
	// 								textDecoration: "none",
	// 								color: "black",
	// 								marginBottom: "20px",
	// 							}}
	// 							to="/">
	// 							<IconButton edge="start" aria-label="back">
	// 								<ArrowBackIcon />
	// 							</IconButton>
	// 							Go Back
	// 						</Stack>
	// 						{/* <Card> */}
	// 						{/* <CardContent> */}

	// 						<Typography
	// 							sx={{ fontSize: 14 }}
	// 							color="text.secondary"
	// 							gutterBottom>
	// 							{Math.abs(hoursDifference) === 0
	// 								? "posted just now"
	// 								: `posted ${Math.abs(hoursDifference)} hours ago`}
	// 						</Typography>
	// 						<Stack flexDirection={"row"} mb={3} alignItems={"center"} gap={2}>
	// 							<Stack alignItems={"center"} flexDirection={"row"} gap={1}>
	// 								<Typography
	// 									variant="h5"
	// 									color="text.secondary"
	// 									component="div">
	// 									Module Id:
	// 								</Typography>
	// 								<Typography variant="h5">{project?.id}</Typography>
	// 							</Stack>
	// 							<Stack alignItems={"center"} flexDirection={"row"} gap={1}>
	// 								<Typography
	// 									component="div"
	// 									variant="h5"
	// 									color="text.secondary">
	// 									Module Title:
	// 								</Typography>
	// 								<Typography variant="h5">{project?.projectTitle}</Typography>
	// 							</Stack>
	// 						</Stack>
	// 						<Stack flexDirection={"row"} alignItems={"center"} gap={2} mb={4}>
	// 							<Stack flexDirection={"row"} alignItems={"center"} gap={1}>
	// 								<Typography variant="body2" fontWeight={300}>
	// 									Difficulty Rating
	// 								</Typography>

	// 								<Ratings value={project?.difficultyRating} />
	// 							</Stack>
	// 							<Stack alignItems={"center"} flexDirection={"row"} gap={1}>
	// 								<Typography component="div" color="text.secondary">
	// 									Supervisor:
	// 								</Typography>
	// 								<Typography variant="h6">
	// 									{project?.supervisorName}
	// 								</Typography>
	// 							</Stack>
	// 						</Stack>
	// 						<Typography variant="h5" mb={2}>
	// 							Description:{" "}
	// 						</Typography>
	// 						<Typography gutterBottom variant="body2">
	// 							{isExpanded ? project?.description : shortText}
	// 							{/* {isExpanded === true ? (
	// 										<Typography
	// 											sx={{ cursor: "pointer" }}
	// 											onClick={() => setIsExpanded((prev) => !prev)}>
	// 											show less
	// 										</Typography>
	// 									) : (
	// 										<Typography
	// 											sx={{ cursor: "pointer" }}
	// 											onClick={() => setIsExpanded((prev) => !prev)}>
	// 											...read more
	// 										</Typography>
	// 									)} */}
	// 						</Typography>
	// 						{/* </CardContent> */}
	// 						{/* <CardActions> */}
	// 						{/* <Button
	// 							size="small"
	// 							disabled={isProjectAlreadyApplied}
	// 							sx={{
	// 								width: "200px",
	// 							}}
	// 							onClick={() => {
	// 								setEmailModal(true);
	// 							}}
	// 							variant="contained">
	// 							{isProjectAlreadyApplied ? "Applied✅" : "apply"}
	// 						</Button> */}
	// 						{/* </CardActions> */}
	// 						{/* </Card> */}
	// 					</Stack>

	// 					<Stack mt={3} alignSelf={"flex-start"} spacing={2}>
	// 						<Typography variant="h5" fontWeight={400}>
	// 							{/* Technologies to be Used */}
	// 							Required Skills:
	// 						</Typography>
	// 						<Stack spacing={1}>
	// 							{project.techStack.split(",").map((item) => {
	// 								return <Typography variant="h6">{item}</Typography>;
	// 							})}
	// 						</Stack>
	// 					</Stack>

	// 					{/* <Stack mt={5} alignSelf={"flex-start"} spacing={2}>
	// 						<Typography variant="h5" fontWeight={400}>
	// 							Posted by
	// 						</Typography>
	// 						<Stack spacing={1}>
	// 							<Typography>Name - {project?.supervisorName}</Typography>
	// 							<Typography>Email -{project?.supervisorEmail}</Typography>
	// 						</Stack>
	// 					</Stack> */}

	// 					<Stack mt={3} alignSelf={"flex-start"} spacing={2}>
	// 						<Typography variant="h5" fontWeight={400}>
	// 							{/* Technologies to be Used */}
	// 							Capacity: 0/5
	// 						</Typography>
	// 					</Stack>

	// 					{isStaff ? null : (
	// 						<ProjectButton
	// 							size="large"
	// 							disabled={isProjectAlreadyApplied}
	// 							sx={{
	// 								width: "200px",
	// 								marginTop: "20px",
	// 								// margn
	// 							}}
	// 							onClick={() => {
	// 								setEmailModal(true);
	// 							}}
	// 							variant="contained">
	// 							{isProjectAlreadyApplied ? "Applied✅" : "apply"}
	// 						</ProjectButton>
	// 					)}

	// 					<Box sx={{ width: 300 }}>
	// 						<Snackbar
	// 							open={open}
	// 							onClose={handleClose}
	// 							TransitionComponent={transition}
	// 							message={`Applied on ${project?.projectTitle} successfully`}
	// 							key={transition ? transition.name : ""}
	// 						/>
	// 					</Box>
	// 				</Stack>
	// 				<Modal
	// 					open={emailModal}
	// 					onClose={() => setEmailModal(false)}
	// 					aria-labelledby="modal-modal-title"
	// 					aria-describedby="modal-modal-description">
	// 					<Box sx={style}>
	// 						<Typography id="modal-modal-title" variant="h6" component="h2">
	// 							Send an Email to supervisor
	// 						</Typography>
	// 						<Stack
	// 							mt={2}
	// 							spacing={2}
	// 							component={"form"}
	// 							onSubmit={handleSubmit(async (data) => {
	// 								try {
	// 									const res = await axiosInstance.post(
	// 										"/projects/send-mail",
	// 										{
	// 											receivermail: project?.supervisorEmail,
	// 											subject: data.subject,
	// 											body: data.body,
	// 										}
	// 									);

	// 									if (res.status === 200) {
	// 										reset();
	// 										dispatch(
	// 											createAssignmentAsync({
	// 												studentId: loggedInUser?.id,
	// 												projectId: id,
	// 											})
	// 										);
	// 										alert(`Applied on ${project?.projectTitle} successfully`);
	// 										navigate("/");
	// 									}
	// 								} catch (error) {
	// 									console.log(error);
	// 								}
	// 							})}>
	// 							<TextField
	// 								{...register("subject", { required: "true" })}
	// 								placeholder="Subject"></TextField>
	// 							<TextField
	// 								{...register("body", { required: "true" })}
	// 								multiline
	// 								rows={5}
	// 								placeholder="Body"></TextField>
	// 							<Button type="submit" variant="contained">
	// 								Send apply mail
	// 							</Button>
	// 						</Stack>
	// 					</Box>
	// 				</Modal>
	// 			</Stack>
	// 		)}
	// 	</>
	// );
};

const ProjectButton = ({ children, ...rest }) => {
	return (
		<Button
			sx={{
				borderRadius: "50px",
				height: "30px",
				flex: 1,
			}}
			size="small"
			variant="contained"
			disableElevation
			{...rest}>
			{children}
		</Button>
	);
};
