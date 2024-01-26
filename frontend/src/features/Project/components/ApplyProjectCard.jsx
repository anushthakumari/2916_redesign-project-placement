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
} from "@mui/material";
import {
	deleteProjectByIdAsync,
	updateProjectByIdAsync,
} from "../ProjectSlice";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

export const ProjectCard = ({
	wholeProjectData,
	projectTitle,
	supervisorName,
	difficultyRating,
	problemStatement,
	postedDateTime,
	projectid,
	staff = false,
}) => {
	const assignments = useSelector((state) => state.AssignmentSlice.assignments);
	console.log(assignments);
	const [isExpanded, setIsExpanded] = useState(false);

	const [isEditing, setIsEditing] = useState(false);

	const shortText = problemStatement.slice(0, 100);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const currentDate = new Date();
	const timeDifference = new Date(postedDateTime) - currentDate;

	const hoursDifference = Math.floor(timeDifference / (1000 * 60 * 60));

	const [isProjectAlreadyApplied, setIsProjectAlreadyApplied] = useState(false);
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

	return (
		<>
			{assignments && statusChecked && (
				<Card
					sx={{
						width: 700,
						mt: 2,
						cursor: staff ? "" : isProjectAlreadyApplied ? "" : "pointer",
					}}
					onClick={() =>
						staff
							? ""
							: isProjectAlreadyApplied
							? null
							: navigate(`/project-details/${projectid}`)
					}>
					<CardContent>
						<Stack mb={2}>
							<Typography variant={"h6"} fontWeight={700}>
								{projectTitle}
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
						<Stack flexDirection={"row"} gap={2}>
							{isEditing ? (
								<TextField
									name="projectTitle"
									onChange={(e) => handleChange(e)}
									value={editedProjectValue.projectTitle}
								/>
							) : (
								<>
									<Stack flexDirection={"row"} alignItems={"center"} gap={1}>
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

						<Stack flexDirection={"row"} mt={3} gap={2}>
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
									<Ratings value={difficultyRating} />
								)}
							</Stack>
						</Stack>

						<Stack
							mt={2}
							justifyContent={"flex-end"}
							direction={"row"}
							alignItems={"center"}
							gap={1}
							flex={1}>
							<Stack flexDirection={"row"} gap={1}>
								<ProjectButton onClick={() => handleNavigate(projectid)}>
									Click Here to know more
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
				minWidth: "100px",
			}}
			size="small"
			variant="contained"
			disableElevation
			{...rest}>
			{children}
		</Button>
	);
};
