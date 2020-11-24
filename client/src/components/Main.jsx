import React, { useEffect, useState } from 'react';
//import axios from 'axios';
import matrix from '../utilities/parser';
import { Box, Flex, Input, Text, Button } from '@chakra-ui/core';
import Schedule from './Schedule';
import Filters from './Filters';
import List from './List';
import HourFiltersProvider from '../contexts/HourFilters';
import LectureSelectionsProvider from '../contexts/LectureSelections';

export default function Main() {
  const [personas, setPersonas] = useState(null);
  const [isLogged, setIsLogged] = useState(false);
  const [error, setError] = useState(false);
  const [id, setId] = useState('');
  const handleInputChange = (event) => {
    setId(event.target.value);
  };
  const handleLoginSubmit = () => {
    let fetch = true;
    if (id === '') {
      fetch = false;
    }
    if (fetch) {
      setIsLogged(true);
    } else {
      alert('error');
      setError(true);
    }
  };
  //MIRAR DONDE Y QUÉ DEBO FETCHEAR
  useEffect(() => {
    async function fetchData() {
      //const result = await axios('http://localhost:3001/api/personas/id/2');
      const ma = await matrix();
      setPersonas(ma);
    }
    fetchData();
  }, []);
  if (error) {
    return <h1>Error</h1>;
  }

  return (
    <>
      <Flex alignItems='center' justifyContent='center' h='80vh'>
        <HourFiltersProvider>
          <LectureSelectionsProvider>
            <Flex
              w='1400px'
              justifyContent='space-around'
              alignContent='center'
              gap={6}
            >
              {!isLogged ? (
                <Box p='25px'>
                  <Text mb='8px'>Log-In</Text>
                  <Input
                    value={id}
                    onChange={handleInputChange}
                    fontSize='16px'
                    mb='8px'
                    placeholder='Ingrese su código'
                    size='sm'
                  />
                  <Button onClick={handleLoginSubmit}>
                    Consultar Asignaturas
                  </Button>
                </Box>
              ) : (
                <>
                  <p> Está logeado el Id: {id} </p>
                  <Button
                    onClick={() => {
                      setId();
                      setIsLogged(false);
                    }}
                  >
                    Deslogear
                  </Button>
                </>
              )}
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
    </>
  );
}
