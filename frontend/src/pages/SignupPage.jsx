import React from "react";
import { Signup } from "../features/auth/components/Signup";
import { SignupGet } from "../features/auth/components/SignupGet";

import useUIstate from "../hooks/useUIstate";

export const SignupPage = () => {
	const { uiState } = useUIstate();

	return <>{uiState === "hci" ? <Signup /> : <SignupGet />}</>;
};
