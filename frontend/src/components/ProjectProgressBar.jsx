import React from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import { Stack, Typography } from '@mui/material';

function ProjectProgressBar({ completedPercentage }) {
  return (
    <Stack>
    <LinearProgress sx={{m:0,p:0}} variant="determinate" value={completedPercentage} />
    {/* <Typography justifySelf={'flex-end'} alignSelf={'flex-end'} color={'text.secondary'}mt={1}>Completed {completedPercentage}%</Typography> */}
    </Stack>
  );
}

export default ProjectProgressBar;
