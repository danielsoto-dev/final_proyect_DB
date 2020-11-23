import React, { useEffect, useState } from 'react';
//import axios from 'axios';
import matrix from '../utilities/parser';
import { Box, Flex } from '@chakra-ui/core';
import Schedule from './Schedule';
import Filters from './Filters';
import List from './List';
import HourFiltersProvider from '../contexts/HourFilters';
import LectureSelectionsProvider from '../contexts/LectureSelections';

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
    <Flex alignItems='center' justifyContent='center' h='80vh'>
      <HourFiltersProvider>
        <LectureSelectionsProvider>
          <Flex
            w='1400px'
            justifyContent='space-around'
            alignContent='center'
            gap={6}
          >
            <Schedule info={personas}></Schedule>
            <Flex flexDir='column'>
              <Box>
                <List></List>
              </Box>
              <Filters></Filters>
            </Flex>
          </Flex>
        </LectureSelectionsProvider>
      </HourFiltersProvider>
    </Flex>
  );
}
