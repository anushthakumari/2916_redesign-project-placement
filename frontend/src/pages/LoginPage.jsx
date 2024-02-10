import React from "react";
import { Login } from "../features/auth/components/Login";
import { LoginHCI } from "../features/auth/components/LoginHCI";
import useUIstate from "../hooks/useUIstate";

export const LoginPage = () => {
	const { uiState } = useUIstate();

	return <>{uiState === "hci" ? <LoginHCI /> : <Login />}</>;
};
