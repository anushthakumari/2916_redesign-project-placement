import { useCallback } from "react";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { Ratings } from "./Ratings";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { selectAssignments } from "../../assignments/AssignmentSlice";
import { useDispatch, useSelector } from "react-redux";
import { Delete } from "@mui/icons-material";
import {
	IconButton,
	MenuItem,
	Select,
	Stack,
	TextField,
	Avatar,
	Divider,
	Modal,
} from "@mui/material";

import {
	deleteProjectByIdAsync,
	updateProjectByIdAsync,
} from "../ProjectSlice";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { ErrorMessage } from "@hookform/error-message";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import { axiosInstance } from "../../Staff/StaffApi";
import { createAssignmentAsync } from "../../assignments/AssignmentSlice";
import { selectLoggedInUser } from "../../auth/AuthSlice";
import CloseIcon from "@mui/icons-material/Close";
import { useDropzone } from "react-dropzone";
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

export const ProjectCard = ({
	wholeProjectData,
	projectTitle,
	supervisorName,
	difficultyRating,
	problemStatement,
	postedDateTime,
	projectid,
	staff = false,
	data,
}) => {
	const assignments = useSelector((state) => state.AssignmentSlice.assignments);
	const {
		register,
		handleSubmit,
		reset,
		watch,
		formState: { errors },
	} = useForm();

	const loggedInUser = useSelector(selectLoggedInUser);

	const onDrop = useCallback((acceptedFiles) => {
		if (acceptedFiles.length) {
			const file = acceptedFiles[0];

			const fd = new FormData();

			fd.append("file", file);
			fd.append("studentId", loggedInUser.id);
			fd.append("projectId", projectid);

			axiosInstance
				.post("http://localhost:8000/upload-report", fd, {
					headers: {
						"Content-Type": "multipart/form-data",
					},
				})
				.then(() => {
					toast.success("Report Submitted Successfully!");
				})
				.catch((e) => {
					toast.error("Something went wrong!");
				});
		}
	}, []);

	const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
		accept: {
			"application/pdf": [".pdf"],
		},
		maxFiles: 1,
		onDrop,
	});
	const [isExpanded, setIsExpanded] = useState(false);

	const [isEditing, setIsEditing] = useState(false);
	const [isLoading, setisLoading] = useState(false);

	const shortText = problemStatement.slice(0, 100);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const currentDate = new Date();
	const timeDifference = new Date(postedDateTime) - currentDate;

	const hoursDifference = Math.floor(timeDifference / (1000 * 60 * 60));

	const [isProjectAlreadyApplied, setIsProjectAlreadyApplied] = useState(false);
	const [emailModal, setEmailModal] = useState({
		open: false,
		isApply: false,
	});

	const [openUploader, setopenUploader] = useState(false);
	const [statusChecked, setStatusChecked] = useState(false);

	useEffect(() => {
		let isProjectApplied = false;

		for (const item of assignments) {
			if (item.projectId === projectid) {
				isProjectApplied = true;
				break;
			}
		}

		setIsProjectAlreadyApplied(isProjectApplied);
		setStatusChecked(true);
	}, [assignments, projectid]);

	const handleNavigate = (projectid) => {
		// if (!staff) {
		navigate(`/project-details/${projectid}`);
		// }
	};

	const [editedProjectValue, setProjectValue] = useState({
		projectTitle: "",
		description: "",
		difficultyRating: "",
	});

	const handleEdit = (index) => {
		setIsEditing(true);
		setProjectValue({
			projectTitle: projectTitle,
			description: problemStatement,
			difficultyRating: difficultyRating,
		});
	};

	const handleProjectUpdate = () => {
		const update = {
			...wholeProjectData,
			id: projectid,
			description: editedProjectValue.description,
			projectTitle: editedProjectValue.projectTitle,
			difficultyRating: editedProjectValue.difficultyRating,
		};
		dispatch(updateProjectByIdAsync(update));
		setIsEditing(false);
	};

	const handleChange = (e) => {
		setProjectValue({ ...editedProjectValue, [e.target.name]: e.target.value });
	};

	const handleApply = () => {
		setEmailModal({ open: true, isApply: true });
	};

	return (
		<>
			{assignments && statusChecked && (
				<Card
					sx={{
						width: 700,
						mt: 2,
						cursor: staff ? "" : isProjectAlreadyApplied ? "" : "pointer",
					}}
					onClick={
						() => (staff ? "" : isProjectAlreadyApplied ? null : "") //navigate(`/project-details/${projectid}`)
					}>
					<CardContent>
						<Stack mb={2}>
							<Stack flexDirection={"row"} alignItems={"center"} gap={1}>
								<Typography
									variant="body1"
									component="div"
									color="text.secondary">
									Project Id:
								</Typography>
								<Typography variant="body1" component="div" fontWeight={600}>
									{projectid}
								</Typography>
							</Stack>
							<Typography variant={"h6"} fontWeight={700}>
								{projectTitle}
							</Typography>
							<Typography variant={"body"} fontWeight={200}>
								{data?.description}
							</Typography>
							<Typography
								style={{
									fontSize: "12px",
								}}
								color="text.secondary"
								gutterBottom>
								{Math.abs(hoursDifference) === 0
									? "posted just now"
									: `posted ${Math.abs(hoursDifference)} hours ago`}
							</Typography>
						</Stack>
						<Divider />
						<Stack flexDirection={"row"} gap={2}>
							{isEditing ? (
								<TextField
									name="projectTitle"
									onChange={(e) => handleChange(e)}
									value={editedProjectValue.projectTitle}
								/>
							) : (
								<>
									{/* <Stack flexDirection={"row"} alignItems={"center"} gap={1}>
										<Typography
											variant="body1"
											component="div"
											color="text.secondary">
											Project Id:
										</Typography>
										<Typography
											variant="body1"
											fontWeight={600}
											component="div">
											{projectid}
										</Typography>
									</Stack> */}
									<Stack
										flexDirection={"row"}
										alignItems={"center"}
										mt={2}
										gap={1}>
										<Typography
											variant="body1"
											color="text.secondary"
											aria-label="Supervisor"
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
												aria-label={supervisorName}
												component="div">
												{supervisorName}
											</Typography>
										</Stack>
									</Stack>
								</>
							)}

							{/* {staff && (
								<Stack flexDirection={"row-reverse"}>
									<IconButton
										onClick={() => dispatch(deleteProjectByIdAsync(projectid))}>
										<Delete />
									</IconButton>

									{isEditing ? (
										<IconButton onClick={handleProjectUpdate}>
											<CheckCircleIcon></CheckCircleIcon>
										</IconButton>
									) : (
										<IconButton onClick={handleEdit}>
											<EditOutlinedIcon />
										</IconButton>
									)}
								</Stack>
							)} */}
						</Stack>

						{isEditing ? (
							<TextField
								name="description"
								onChange={(e) => handleChange(e)}
								multiline
								rows={4}
								value={editedProjectValue.description}
							/>
						) : (
							<Typography gutterBottom variant="body2">
								{/* {isExpanded ? problemStatement : shortText}
								{isExpanded === true ? (
									<Typography
										sx={{ cursor: "pointer" }}
										onClick={() => setIsExpanded((prev) => !prev)}>
										show less
									</Typography>
								) : (
									<Typography
										sx={{ cursor: "pointer" }}
										onClick={() => setIsExpanded((prev) => !prev)}>
										...read more
									</Typography>
								)} */}
							</Typography>
						)}

						<Stack flexDirection={"row"} my={3} gap={2}>
							<Stack flexDirection={"row"} gap={1} flex={1}>
								<Typography
									variant="body1"
									color="text.secondary"
									fontWeight={300}>
									Difficulty Rating:
								</Typography>
								{isEditing ? (
									<Select
										name="difficultyRating"
										onChange={(e) => handleChange(e)}
										value={editedProjectValue.difficultyRating}>
										<MenuItem value={1}>1</MenuItem>
										<MenuItem value={2}>2</MenuItem>
										<MenuItem value={3}>3</MenuItem>
										<MenuItem value={4}>4</MenuItem>
										<MenuItem value={5}>5</MenuItem>
									</Select>
								) : (
									<Ratings aria-label="rating" value={difficultyRating} />
								)}
							</Stack>
						</Stack>
						<Stack flexDirection={"row"} my={3} gap={2}>
							<Stack flexDirection={"row"} gap={1} flex={1}>
								<Typography
									variant="body1"
									color="text.secondary"
									fontWeight={300}>
									Required Skills:
								</Typography>
								<Typography variant="body1" fontWeight={600} component="div">
									{data?.techStack}
								</Typography>
							</Stack>
						</Stack>

						<Divider />

						<Stack
							mt={2}
							direction={"row"}
							justifyContent={"space-between"}
							alignItems={"center"}
							width={"100%"}
							gap={1}
							flex={1}>
							<Stack direction={"row"} gap={1}>
								<ProjectButton
									endIcon={<KeyboardDoubleArrowRightIcon />}
									onClick={() => handleNavigate(projectid)}>
									know more
								</ProjectButton>
								<ProjectButton
									onClick={handleApply}
									color="success"
									endIcon={<AssignmentIcon />}>
									Apply
								</ProjectButton>
								<ProjectButton
									style={{ minWidth: "250px" }}
									onClick={() => setopenUploader(true)}>
									UPLOAD Assignment/Report
								</ProjectButton>
								{staff ? (
									isEditing ? (
										<ProjectButton onClick={handleProjectUpdate}>
											Save
										</ProjectButton>
									) : (
										<ProjectButton onClick={handleEdit}>Edit</ProjectButton>
									)
								) : null}
							</Stack>
							<Stack flexDirection={"row"} gap={1}>
								{staff ? (
									<>
										<ProjectButton>Sign To</ProjectButton>
										<ProjectButton
											onClick={() =>
												dispatch(deleteProjectByIdAsync(projectid))
											}>
											Remove
										</ProjectButton>
									</>
								) : (
									<>
										{/* <ProjectButton
											size="small"
											onClick={handleNavigate}
											disabled={isProjectAlreadyApplied}>
											{isProjectAlreadyApplied ? "Applied" : "Apply"}
										</ProjectButton> */}
									</>
								)}
							</Stack>
						</Stack>
					</CardContent>
					{/* <CardActions>
						{staff ? (
							isEditing ? (
								<Button onClick={handleProjectUpdate} variant="contained">
									Save
								</Button>
							) : (
								<Button variant="contained" onClick={handleEdit}>
									Edit
								</Button>
							)
						) : (
							<Button
								size="small"
								disabled={isProjectAlreadyApplied}
								variant="contained">
								{isProjectAlreadyApplied ? "Applied" : "Apply"}
							</Button>
						)}
					</CardActions> */}
				</Card>
			)}

			<Modal
				id="applyform"
				open={emailModal.open}
				onClose={() => setEmailModal({ open: false, isApply: false })}
				aria-labelledby="send-an-email-to-supervisor">
				<Box sx={style}>
					<IconButton
						size="small"
						onClick={() => setEmailModal({ open: false, isApply: false })}
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
						{"Send An Apply Email to The Supervisor"}
					</Typography>
					<Stack
						mt={2}
						spacing={2}
						component={"form"}
						onSubmit={handleSubmit(async (fd) => {
							try {
								setisLoading(true);
								const res = await axiosInstance.post(
									"http://localhost:8000/projects/send-mail",
									{
										receivermail: data?.supervisorEmail,
										subject: fd.subject,
										body: fd.body,
									}
								);

								if (res.status === 200) {
									reset();
									dispatch(
										createAssignmentAsync({
											studentId: loggedInUser?.id,
											projectId: projectid,
										})
									);

									toast.success(`Applied on ${projectTitle} successfully`);
									navigate("/");
								} else {
									toast.success("Successfully sent!");
								}
							} catch (error) {
								console.log(error);
								toast.error("Something went wrong while sending email!");
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
			<Modal open={openUploader} onClose={() => setopenUploader(false)}>
				<Box sx={style}>
					<div
						style={{
							border: "1px dashed #333",
							padding: "20px",
							borderRadius: "15px",
						}}>
						<div {...getRootProps({ className: "dropzone" })}>
							<input {...getInputProps()} />
							<p>Drag 'n' drop some files here, or click to select files,</p>
							<p
								style={{
									marginTop: "6px",
								}}>
								<strong>Only Pdf is allowed.</strong>
							</p>
						</div>
					</div>
				</Box>
			</Modal>
		</>
	);

	// return (
	// 	<>
	// 		{assignments && statusChecked && (
	// 			<Card
	// 				sx={{
	// 					width: 700,
	// 					mt: 2,
	// 					cursor: staff ? "" : isProjectAlreadyApplied ? "" : "pointer",
	// 				}}
	// 				onClick={() =>
	// 					staff
	// 						? ""
	// 						: isProjectAlreadyApplied
	// 						? null
	// 						: navigate(`/project-details/${projectid}`)
	// 				}>
	// 				<CardContent>
	// 					<Typography
	// 						sx={{ fontSize: 14 }}
	// 						color="text.secondary"
	// 						gutterBottom>
	// 						{Math.abs(hoursDifference) === 0
	// 							? "posted just now"
	// 							: `posted ${Math.abs(hoursDifference)} hours ago`}
	// 					</Typography>
	// 					<Stack flexDirection={"row"} justifyContent={"space-between"}>
	// 						{isEditing ? (
	// 							<TextField
	// 								name="projectTitle"
	// 								onChange={(e) => handleChange(e)}
	// 								value={editedProjectValue.projectTitle}
	// 							/>
	// 						) : (
	// 							<>
	// 								<Stack flexDirection={"row"} alignItems={"center"} gap={1}>
	// 									<Typography
	// 										variant="body"
	// 										component="div"
	// 										color="text.secondary">
	// 										Id:
	// 									</Typography>
	// 									<Typography variant="h5" component="div">
	// 										{projectid}
	// 									</Typography>
	// 								</Stack>
	// 								<Stack flexDirection={"row"} alignItems={"center"} gap={1}>
	// 									<Typography
	// 										variant="body"
	// 										color="text.secondary"
	// 										component="div">
	// 										Title:
	// 									</Typography>
	// 									<Typography variant="h5" component="div">
	// 										{projectTitle}
	// 									</Typography>
	// 								</Stack>
	// 								<Stack flexDirection={"row"} alignItems={"center"} gap={1}>
	// 									<Typography
	// 										variant="body"
	// 										color="text.secondary"
	// 										component="div">
	// 										Supervisior:
	// 									</Typography>
	// 									<Typography variant="h5" component="div">
	// 										{supervisorName}
	// 									</Typography>
	// 								</Stack>
	// 							</>
	// 						)}
	// 						{/* {staff && (
	// 							<Stack flexDirection={"row-reverse"}>
	// 								<IconButton
	// 									onClick={() => dispatch(deleteProjectByIdAsync(projectid))}>
	// 									<Delete />
	// 								</IconButton>

	// 								{isEditing ? (
	// 									<IconButton onClick={handleProjectUpdate}>
	// 										<CheckCircleIcon></CheckCircleIcon>
	// 									</IconButton>
	// 								) : (
	// 									<IconButton onClick={handleEdit}>
	// 										<EditOutlinedIcon />
	// 									</IconButton>
	// 								)}
	// 							</Stack>
	// 						)} */}
	// 					</Stack>

	// 					{isEditing ? (
	// 						<TextField
	// 							name="description"
	// 							onChange={(e) => handleChange(e)}
	// 							multiline
	// 							rows={4}
	// 							value={editedProjectValue.description}
	// 						/>
	// 					) : (
	// 						<Typography gutterBottom variant="body2">
	// 							{/* {isExpanded ? problemStatement : shortText}
	// 							{isExpanded === true ? (
	// 								<Typography
	// 									sx={{ cursor: "pointer" }}
	// 									onClick={() => setIsExpanded((prev) => !prev)}>
	// 									show less
	// 								</Typography>
	// 							) : (
	// 								<Typography
	// 									sx={{ cursor: "pointer" }}
	// 									onClick={() => setIsExpanded((prev) => !prev)}>
	// 									...read more
	// 								</Typography>
	// 							)} */}
	// 						</Typography>
	// 					)}

	// 					<Stack flexDirection={"row"} mt={3} gap={2}>
	// 						<Stack flexDirection={"row"} flex={1}>
	// 							<Typography variant="body2" fontWeight={300}>
	// 								Difficulty Rate:
	// 							</Typography>
	// 							{isEditing ? (
	// 								<Select
	// 									name="difficultyRating"
	// 									onChange={(e) => handleChange(e)}
	// 									value={editedProjectValue.difficultyRating}>
	// 									<MenuItem value={1}>1</MenuItem>
	// 									<MenuItem value={2}>2</MenuItem>
	// 									<MenuItem value={3}>3</MenuItem>
	// 									<MenuItem value={4}>4</MenuItem>
	// 									<MenuItem value={5}>5</MenuItem>
	// 								</Select>
	// 							) : (
	// 								<Ratings value={difficultyRating} />
	// 							)}
	// 						</Stack>
	// 						<Box flex={1}>
	// 							<Stack flexDirection={"row"} gap={1} flex={1}>
	// 								<ProjectButton onClick={() => handleNavigate(projectid)}>
	// 									View
	// 								</ProjectButton>
	// 								{staff ? (
	// 									isEditing ? (
	// 										<ProjectButton onClick={handleProjectUpdate}>
	// 											Save
	// 										</ProjectButton>
	// 									) : (
	// 										<ProjectButton onClick={handleEdit}>Edit</ProjectButton>
	// 									)
	// 								) : null}
	// 							</Stack>
	// 							<Stack mt={3} flexDirection={"row"} gap={1} flex={1}>
	// 								{staff ? (
	// 									<>
	// 										<ProjectButton>Sign To</ProjectButton>
	// 										<ProjectButton
	// 											onClick={() =>
	// 												dispatch(deleteProjectByIdAsync(projectid))
	// 											}>
	// 											Remove
	// 										</ProjectButton>
	// 									</>
	// 								) : (
	// 									<ProjectButton
	// 										size="small"
	// 										onClick={handleNavigate}
	// 										disabled={isProjectAlreadyApplied}>
	// 										{isProjectAlreadyApplied ? "Applied" : "Apply"}
	// 									</ProjectButton>
	// 								)}
	// 							</Stack>
	// 						</Box>
	// 					</Stack>
	// 				</CardContent>
	// 				{/* <CardActions>
	// 					{staff ? (
	// 						isEditing ? (
	// 							<Button onClick={handleProjectUpdate} variant="contained">
	// 								Save
	// 							</Button>
	// 						) : (
	// 							<Button variant="contained" onClick={handleEdit}>
	// 								Edit
	// 							</Button>
	// 						)
	// 					) : (
	// 						<Button
	// 							size="small"
	// 							disabled={isProjectAlreadyApplied}
	// 							variant="contained">
	// 							{isProjectAlreadyApplied ? "Applied" : "Apply"}
	// 						</Button>
	// 					)}
	// 				</CardActions> */}
	// 			</Card>
	// 		)}
	// 	</>
	// );
};

const ProjectButton = ({ children, ...rest }) => {
	return (
		<Button
			sx={{
				borderRadius: "50px",
				height: "40px",
				flex: 1,
				minWidth: "38%",
			}}
			size="small"
			variant="contained"
			disableElevation
			{...rest}>
			{children}
		</Button>
	);
};
