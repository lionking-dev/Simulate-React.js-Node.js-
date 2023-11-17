import React from "react";
import { Box, Button } from "@mui/material";

const CustomButton = ({ handleClick, text }) => {
  return (
    <Box pt={5}>
      <Button variant="contained" onClick={handleClick}>
        {text}
      </Button>
    </Box>
  );
};

export default CustomButton;
