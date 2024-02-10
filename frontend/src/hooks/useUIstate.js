import { useSelector, useDispatch } from "react-redux";

import { selectUiState, toggle } from "../features/assignments/uiSlice";

const useUIstate = () => {
	const dispatch = useDispatch();
	const uiState = useSelector(selectUiState);

	function toggleState(params) {
		dispatch(toggle());
	}

	return {
		uiState,
		toggleState,
	};
};

export default useUIstate;
