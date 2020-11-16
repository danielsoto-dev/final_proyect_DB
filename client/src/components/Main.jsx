import React, { useEffect, useState } from 'react';
//import axios from 'axios';
import matrix from '../utilities/parser';
import { Box, Grid, Input } from '@chakra-ui/core';
import Schedule from './Schedule';
import Filters from './Filters';

export default function Main() {
  const [personas, setPersonas] = useState(null);

  useEffect(() => {
    async function fetchData() {
      //const result = await axios('http://localhost:3001/api/personas/id/2');
      const ma = await matrix();
      setPersonas(ma);
    }
    fetchData();
  }, []);

  return (
    <Box>
      <Input w='200px' placeholder='Ingrese el NRC...' />
      <Grid
        margin={2}
        w='1200px'
        marginX='auto'
        borderWidth={2}
        borderColor='black'
        h='85vh'
        templateColumns='950px auto'
        justifyContent='center'
        alignContent='center'
        gap={6}
      >
        <Schedule info={personas}></Schedule>
        <Filters></Filters>
      </Grid>
    </Box>
  );
}
