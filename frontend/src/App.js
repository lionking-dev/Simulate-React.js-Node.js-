import React, { useState } from 'react';
import { Box, Container, Grid } from '@mui/material';
import dataInfo from './data.json';
import axios from 'axios';
import CustomTextField from './components/customTextField';
import CustomButton from './components/customButton';
import ProcessResult from './components/processResult';

const App = () => {
  
  const [data, setData] = useState({
    numOrders: 10,
    maxProcessingTime: 5,
    numOrderProcessors: 3,
  });

  const [simulationResults, setSimulationResults] = useState({
    result_0: [],
    result_1: []
  });

  const handleChange = (value, prop) => {
    setData({
      ...data,
      [prop]: value
    })
  }

  const handleSimulateClick = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/simulate', {
        numOrders : data.numOrders,
        maxProcessingTime: data.maxProcessingTime,
        numOrderProcessors: data.numOrderProcessors,
      });
      setSimulationResults({
        result_0: response.data.result_0,
        result_1: response.data.result_1
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Container maxWidth="lg">
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, md: 1, md: 1 }} pt={8}>
          {
            dataInfo?.text_fields?.map((item, index) => (
              <Grid item xs={3} key={index}>
                <CustomTextField 
                  label={item.label}
                  type={item.type}
                  value={data[item.prop]}
                  prop={item.prop}
                  setValue={handleChange}
                />
              </Grid>
            ))
          }
          {
            <Grid item xs={3}>
              <CustomButton  
                handleClick={handleSimulateClick}
                text={dataInfo?.submit_buttons?.text}
              />
            </Grid>
          }
        </Grid>
      </Container>
      <Container maxWidth="lg">
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, md: 2, md: 3 }}>
          <Grid item xs={12} >
            <Box pt={4}>
              {
                dataInfo?.result_text?.map((item, index) => (
                  <ProcessResult 
                    key={index}
                    title={item.text}
                    result={index == 0 ? simulationResults?.result_0 : simulationResults?.result_1}
                  />
                ))
              }
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default App;
