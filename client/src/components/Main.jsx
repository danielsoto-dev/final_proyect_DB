import React, { useEffect, useState } from 'react';
import Wrapper from './Wrapper';
import Schedule from './Schedule';
import matrix from '../utilities/parser';
import List from './List';
import LectureSelectionsProvider from '../contexts/LectureSelections';
import HourFiltersProvider from '../contexts/HourFilters';
import Filters from './Filters';
import { Box, Flex, Input, Text, Button } from '@chakra-ui/core';
export default function Main() {
  const scheme = matrix();
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
  // //MIRAR DONDE Y QUÉ DEBO FETCHEAR
  // useEffect(() => {
  //   async function fetchData() {
  //     //const result = await axios('http://localhost:3001/api/personas/id/2');
  //     const ma = await matrix();
  //     setPersonas(ma);
  //   }
  //   fetchData();
  // }, []);

  return (
    <Flex alignItems='center' justifyContent='center' h='80vh'>
      <HourFiltersProvider>
        <LectureSelectionsProvider>
          <Wrapper>
            <Box p='25px'>
              {!isLogged ? (
                <>
                  <Text mb='8px' fontSize='24px'>
                    Log-In
                  </Text>
                  <Input
                    value={id}
                    onChange={handleInputChange}
                    fontSize='16px'
                    mb='8px'
                    placeholder='Ingrese su código'
                    size='sm'
                    w='250px'
                  />
                  <Button
                    bg='orange.600'
                    color='white'
                    onClick={handleLoginSubmit}
                  >
                    Ingresar
                  </Button>
                </>
              ) : (
                <>
                  <Text mb='8px' fontSize='20px'>
                    Está logeado el Id: {id}
                  </Text>
                  <Button
                    bg='orange.600'
                    color='white'
                    onClick={() => {
                      setId();
                      setIsLogged(false);
                    }}
                  >
                    Deslogear
                  </Button>
                </>
              )}
            </Box>
            <Flex
              w='1400px'
              justifyContent='space-around'
              alignContent='center'
            >
              <Schedule scheme={scheme}></Schedule>
              <Flex flexDir='column'>
                <List></List>
                <Filters></Filters>
              </Flex>
            </Flex>
          </Wrapper>
        </LectureSelectionsProvider>
      </HourFiltersProvider>
    </Flex>
  );
}
