import * as React from 'react';
import { pink } from '@mui/material/colors';
import Checkbox from '@mui/material/Checkbox';
import { FormControlLabel } from '@mui/material';


export const MuiCheckbox=({label,checked,handleOnChange})=> {
  return (
    <>
      <FormControlLabel
  control={
    <Checkbox
      checked={checked}
      onChange={handleOnChange}
      color="primary"
    />
  }
  label={label}
/>
    </>
  );
}