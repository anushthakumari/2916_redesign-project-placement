import * as React from "react";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import { Stack, Typography } from "@mui/material";

const labels = {
	1: "Very easy",
	2: "Easy",
	3: "Moderate",
	4: "Hard",
	5: "Extremely hard",
};

export const Ratings = ({ value }) => {
	return (
		<Stack direction={"row"} gap={1}>
			<Rating
				value={value}
				readOnly
				precision={0.5}
				emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
			/>
			<Typography variant="body1" fontWeight={600}>
				({labels[value]})
			</Typography>
		</Stack>
	);
};
