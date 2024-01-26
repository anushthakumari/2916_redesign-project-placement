import * as React from "react";
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
	console.log(data);
	console.log("assignemtneid", assingmentId);

	const loggedInUser = useSelector(selectLoggedInUser);

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

					<Stack
						flexDirection={"row"}
						justifyContent={"space-between"}
						alignItems={"center"}>
						<Typography
							sx={{ fontSize: 14 }}
							color="text.secondary"
							gutterBottom>
							Joined - {formateDate(dateJoined)}
						</Typography>

						<IconButton onClick={handleDelete}>
							<Delete sx={{ color: "lightslategray" }} />
						</IconButton>
					</Stack>

					{/* project name */}
					<Typography variant="h5" component="div">
						{projectName}
					</Typography>

					{/* teacher name */}
					<Typography sx={{ mb: 1.5 }} color="text.secondary">
						{supservisorName}
					</Typography>
				</Stack>

				{/* project problem statement */}
				<Stack m={".5rem 0rem"}>
					<Typography gutterBottom variant="body2">
						{isExpanded
							? problemStatement
							: problemStatement?.substring(0, 200)}
					</Typography>
				</Stack>

				{/* completed percentage */}
				<Stack mt={2}>
					<ProjectProgressBar completedPercentage={completedPercentage} />
				</Stack>

				{/* project status */}
				<Typography mt={2} color={"text.secondary"}>
					Completed {completedPercentage}%{" "}
					{completedPercentage === 100 ? "✅" : null}
				</Typography>
			</CardContent>

			<CardActions>
				<Button size="medium" variant="contained">
					{completedPercentage === 100 ? "Completed" : "Open"}
				</Button>
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
