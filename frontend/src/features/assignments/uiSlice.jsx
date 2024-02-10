import { createSlice } from "@reduxjs/toolkit";

const initialState = "hci";

const uiSlice = createSlice({
	name: "uiState",
	initialState: initialState,
	reducers: {
		toggle(state) {
			return state === "hci" ? "getsalt" : "hci";
		},
	},
});

export const selectUiState = (state) => state.uiSlice;

export const { toggle } = uiSlice.actions;

export default uiSlice.reducer;
