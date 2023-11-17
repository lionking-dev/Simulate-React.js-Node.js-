import React from "react";
import { Box, Typography } from '@mui/material';

const ProcessResult = ({
  title,
  result
}) => {
  return (
    <>
      <Typography variant="h5" gutterBottom>
        {title}
      </Typography>
      <Box py={3}>
        {
          result?.map((item, index) => (
            <Box key={index} px={5} py={1}>
              <Typography variant="h6" gutterBottom>
                <span style={{paddingRight: "20px"}}>{index+1}.</span>{item}
              </Typography>
            </Box>
          ))
        }
      </Box>
    </>
  );
};

export default ProcessResult;
