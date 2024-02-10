import { Box, Stack, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { Navbar } from "../components/Navbar";
import { Leftbar } from "../components/Leftbar";
import { assignedProjectsData } from "../constants";
import { AssignedProjectCardHCI } from "../components/AssignedProjectCardHCI";
import { AssignedProjectCard } from "../components/AssignedProjectCard";
import { useDispatch, useSelector } from "react-redux";
import {
	fetchAssignmentByStudentIdAsync,
	selectAssignments,
} from "../features/assignments/AssignmentSlice";
import { selectLoggedInUser } from "../features/auth/AuthSlice";

export const HomePageHCI = () => {
	const dispatch = useDispatch();

	const assingments = useSelector(selectAssignments);
	const user = useSelector(selectLoggedInUser);

	useEffect(() => {
		if (user?.id) {
			dispatch(fetchAssignmentByStudentIdAsync(user.id));
		}
	}, [dispatch, user]);

	console.log(assingments);

	return (
		<>
			<Navbar />
			{assingments && user && (
				<Stack
					sx={{
						width: "100vw",
						height: "calc(100vh - 8rem)",
						justifyContent: "center",
						alignItems: "center",
						flexDirection: "row",
						display: "flex",
						p: 1,
					}}>
					<Stack
						width={"70%"}
						height={"100%"}
						justifyContent={"space-evenly"}
						alignItems={"center"}
						flexDirection={"row"}>
						<Box flex={"20%"} bgcolor={"red"} height={"100%"}>
							<Leftbar />
						</Box>

						{/* rightbar */}
						<Stack flex={"80%"} height={"100%"}>
							<Stack
								width={"100%"}
								p={2}
								justifyContent={"center"}
								alignItems={"center"}>
								<Typography variant="h4" fontWeight={700}>
									Home Page
								</Typography>
								{assingments?.length === 0 ? (
									<Stack>
										<Typography variant="h6">
											No assignments available☹️
										</Typography>
										<Typography variant="h6">
											Please apply for new assingments and complete them
										</Typography>
									</Stack>
								) : (
									assingments &&
									assingments.map((data) => {
										return (
											<AssignedProjectCardHCI
												data={data}
												assingmentId={data.assignmentId}
												problemStatement={data?.description}
												projectName={data?.projectTitle}
												dateJoined={data?.postedDateTime}
												completedPercentage={data?.completed_percentage || 0}
												status={data.status}
												supservisorName={data?.supervisorName}
												key={data.assignmentId}
											/>
										);
									})
								)}
							</Stack>
						</Stack>
					</Stack>
				</Stack>
			)}
		</>
	);
};
