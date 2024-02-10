import React from "react";
import { Navbar } from "../components/Navbar";
import { ApplyProjectList } from "../features/Project/components/ApplyProjectList";
import { ApplyProjectListHCI } from "../features/Project/components/ApplyProjectListHCI";
import useUIstate from "../hooks/useUIstate";

export const ApplyPage = () => {
	const { uiState } = useUIstate();

	return (
		<>
			<Navbar />
			{uiState === "hci" ? <ApplyProjectListHCI /> : <ApplyProjectList />}
		</>
	);
};
