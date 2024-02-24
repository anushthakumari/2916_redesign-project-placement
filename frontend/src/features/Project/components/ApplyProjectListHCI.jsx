import { Box, Stack, Typography } from "@mui/material";
import { Leftbar } from "../../../components/Leftbar";
import { ProjectCard } from "./ApplyProjectCardHCI";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProjectAsync, selectAllProjects } from "../ProjectSlice";
import { selectLoggedInUser } from "../../auth/AuthSlice";
import BasicSpeedDial from "./BasicSpeedDial";
import { fetchAssignmentByStudentId } from "../../assignments/AssignmentApi";
import { fetchAssignmentByStudentIdAsync } from "../../assignments/AssignmentSlice";

export const ApplyProjectListHCI = () => {
	const dispatch = useDispatch();
	const loggedInUser = useSelector(selectLoggedInUser);
	const newProjectsData = useSelector(selectAllProjects);

	useEffect(() => {
		if (loggedInUser) {
			dispatch(fetchAllProjectAsync());
			dispatch(fetchAssignmentByStudentIdAsync(loggedInUser.id));
		}
	}, [dispatch, loggedInUser]);

	return (
		<>
			{newProjectsData && (
				<Stack
					sx={{
						width: "100vw",
						height: "100vw",
						minHeight: "calc(100vh - 6rem)",
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
						{/* leftbar */}
						<Box flex={"20%"} height={"100%"}>
							<Leftbar />
						</Box>

						{/* apply cards shown here */}
						<Stack
							flex={"80%"}
							justifyContent={"flex-start"}
							alignItems={"center"}
							height={"100%"}>
							<Typography variant="h4" fontWeight={700}>
								Browse Projects
							</Typography>
							<Stack
								width={"100%"}
								p={2}
								justifyContent={"center"}
								alignItems={"center"}>
								{newProjectsData &&
									newProjectsData.map((data) => {
										return (
											<ProjectCard
												projectid={data.id}
												projectTitle={data.projectTitle}
												supervisorName={data.supervisorName}
												postedDateTime={data.postedDateTime}
												problemStatement={data.description}
												difficultyRating={data.difficultyRating}
												key={data.id}
												data={data}
											/>
										);
									})}
							</Stack>
						</Stack>

						<Stack sx={{ position: "fixed", right: "2rem", bottom: "2rem" }}>
							{loggedInUser?.role === "staff" && <BasicSpeedDial />}
						</Stack>
					</Stack>
				</Stack>
			)}
		</>
	);
};
