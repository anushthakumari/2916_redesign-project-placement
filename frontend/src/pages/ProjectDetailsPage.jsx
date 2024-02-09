import React from "react";
import { Navbar } from "../components/Navbar";
import { ProjectDetails } from "../features/Project/components/ProjectDetails";
import { ProjectDetailsGet } from "../features/Project/components/ProjectDetailsGet";

export const ProjectDetailsPage = () => {
	return (
		<>
			<Navbar />
			<ProjectDetailsGet />
		</>
	);
};
