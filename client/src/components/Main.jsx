import React, { useEffect, useState } from 'react';
//import axios from 'axios';
import matrix from '../utilities/parser';
import { Box, Grid } from '@chakra-ui/core';
import Schedule from './Schedule';
import Filters from './Filters';
import List from './List';
import HourFiltersProvider from '../contexts/HourFilters';
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
      <Grid
        margin={2}
        w='1200px'
        marginX='auto'
        borderWidth={2}
        borderColor='black'
        h='85vh'
        // gridArea='schedule list'
        templateColumns='950px auto'
        // templateRows='1fr'
        justifyContent='center'
        alignContent='center'
        gap={6}
      >
        <HourFiltersProvider>
          <Schedule info={personas}></Schedule>
          <Filters></Filters>
          <List></List>
        </HourFiltersProvider>
      </Grid>
    </Box>
  );
}
