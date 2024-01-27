import * as React from "react";
import Avatar from "@mui/material/Avatar";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ProjectProgressBar from "./ProjectProgressBar";
import { IconButton, Stack } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { deleteAssingmentByIdAsync } from "../features/assignments/AssignmentSlice";
import { selectLoggedInUser } from "../features/auth/AuthSlice";

export const AssignedProjectCard = ({
	data,
	projectName,
	dateJoined,
	supservisorName,
	status,
	assingmentId,
	completedPercentage,
	problemStatement,
}) => {
	const loggedInUser = useSelector(selectLoggedInUser);

	console.log(data);

	const navigate = useNavigate();

	const dispatch = useDispatch();

	const handleDelete = () => {
		dispatch(deleteAssingmentByIdAsync(assingmentId));
	};

	const [isExpanded, setIsExpanded] = React.useState(false);

	return (
		<Card sx={{ minWidth: 275, width: 600, mt: 3, cursor: "pointer" }}>
			<CardContent>
				<Stack>
					{/* date joined */}

					{/* <Stack
						flexDirection={"row"}
						justifyContent={"space-between"}
						alignItems={"center"}>
						<IconButton onClick={handleDelete}>
							<Delete sx={{ color: "lightslategray" }} />
						</IconButton>
					</Stack> */}

					{/* project name */}
					<Stack my={2}>
						<Typography variant="h6" fontWeight={700}>
							{projectName}
						</Typography>
						{/* <Typography
							sx={{ fontSize: 14 }}
							color="text.secondary"
							gutterBottom>
							{formateDate(dateJoined)}
						</Typography> */}
					</Stack>

					{/* teacher name */}
					{/* <Typography sx={{ mb: 1.5 }} color="text.secondary">
						{supservisorName}
					</Typography> */}
					<Box my={2}>
						<Stack gap={1} direction={"row"} alignItems={"center"}>
							<Typography sx={{ fontSize: 14 }} color={"text.secondary"}>
								Completed:
							</Typography>
							<Typography variant="body1" fontWeight={600} component="div">
								{completedPercentage}%{" "}
								{completedPercentage === 100 ? "✅" : null}
							</Typography>
						</Stack>
						<ProjectProgressBar completedPercentage={completedPercentage} />
					</Box>
					<Box my={2}>
						<Stack flexDirection={"row"} gap={2}>
							<Stack gap={1} direction={"row"} alignItems={"center"}>
								<Typography variant="body" color={"text.secondary"}>
									Date Joined:
								</Typography>
								<Typography variant="body1" fontWeight={600} component="div">
									{formateDate(dateJoined)}
								</Typography>
							</Stack>
						</Stack>
						<Stack mt={1} flexDirection={"row"} gap={2} alignItems={"center"}>
							<Typography variant="body1" color="text.secondary">
								Supervisor :
							</Typography>
							<Stack gap={1} direction={"row"} alignItems={"center"}>
								<Avatar
									sx={{ width: 24, height: 24 }}
									alt="Remy Sharp"
									src="https://static.vecteezy.com/system/resources/previews/009/292/244/original/default-avatar-icon-of-social-media-user-vector.jpg"
								/>
								<Typography variant="body1" fontWeight={600} component="div">
									{supservisorName}
								</Typography>
							</Stack>
						</Stack>
					</Box>
				</Stack>

				{/* project problem statement */}
				{/* <Stack m={".5rem 0rem"}>
					<Typography gutterBottom variant="body2">
						{isExpanded
							? problemStatement
							: problemStatement?.substring(0, 200)}
					</Typography>
				</Stack> */}

				{/* completed percentage */}
				{/* <Stack my={2}></Stack> */}

				{/* project status */}
				{/* <Typography mt={2} sx={{ fontSize: 14 }} color={"text.secondary"}>
					Completed {completedPercentage}%{" "}
					{completedPercentage === 100 ? "✅" : null}
				</Typography> */}
			</CardContent>

			<CardActions
				sx={{
					display: "flex",
					flexDirection: "row",
					alignItems: "center",
					justifyContent: "flex-end",
				}}>
				<ProjectButton
					onClick={() => {
						navigate("/project-details/" + data?.id);
					}}>
					{completedPercentage === 100 ? "Completed" : "View Details"}
				</ProjectButton>
				<ProjectButton color="error" onClick={handleDelete}>
					Delete
				</ProjectButton>
			</CardActions>
		</Card>
	);
};

function formateDate(dateString = "") {
	const dateObj = new Date(dateString);
	const formattedDate = dateObj.toLocaleDateString("en-US", {
		month: "long",
		day: "numeric",
		year: "numeric",
	});
	return formattedDate;
}

const ProjectButton = ({ children, ...rest }) => {
	return (
		<Button
			sx={{
				borderRadius: "50px",
				height: "40px",
				flex: 1,
				maxWidth: "180px",
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
