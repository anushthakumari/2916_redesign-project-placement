import React from "react";
import { Navbar } from "../components/Navbar";
import { ProjectDetails } from "../features/Project/components/ProjectDetails";
import { ProjectDetailsGet } from "../features/Project/components/ProjectDetailsGet";
import useUIstate from "../hooks/useUIstate";

export const ProjectDetailsPage = () => {
	const { uiState } = useUIstate();

	return (
		<>
			<Navbar />
			{uiState === "hci" ? <ProjectDetails /> : <ProjectDetailsGet />}
		</>
	);
};
