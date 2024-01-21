import * as React from "react";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";

const labels = {
	1: "Very easy",
	2: "Easy",
	3: "Moderate",
	4: "Hard",
	5: "Extremely hard",
};

export const Ratings = ({ value }) => {
	return (
		<Box
			sx={{
				display: "flex",
				alignItems: "center",
			}}>
			<Rating
				name="text-feedback"
				value={value}
				readOnly
				precision={0.5}
				emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
			/>
			{/* <Box sx={{ ml: 2 }}>{labels[value]}</Box> */}
		</Box>
	);
};
