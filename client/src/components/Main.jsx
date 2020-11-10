import React from 'react';
import { Box, Grid } from '@chakra-ui/core';
import Horario from './Horario';
export default function Main() {
  return (
    <Box
      margin={2}
      w='1020px'
      marginX='auto'
      borderWidth={2}
      borderColor='black'
      minH='85vh'
    >
      <Grid templateColumns='900px 50px' justifyContent='center' gap={2}>
        <Horario></Horario>
        <Box bg='red.300'>Aquí debe ir los botones</Box>
      </Grid>
    </Box>
  );
}
