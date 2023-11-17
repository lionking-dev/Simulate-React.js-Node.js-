import React from "react";
import { Box, TextField, Grid } from "@mui/material";

const CustomTextField = ({ label, type, value, setValue, prop }) => {
  return (
    <Box>
      <Box p={1}>
        <label>{label}</label>
      </Box>
      <TextField
        id="outlined-basic"
        variant="outlined"
        type={type}
        value={value}
        onChange={(e) => setValue(parseInt(e.target.value), prop)}
      />
    </Box>
  );
};

export default CustomTextField;
