import React from 'react';
import { Box } from '@chakra-ui/core';
export default function Column({ rol, children }) {
  if (rol == 'header') {
    return (
      <Box as='th' bg='blue.300'>
        {children}
      </Box>
    );
  }
  //color='white' w='120px' h='30px' m={2} bg='blue.900
  return (
    <Box as='td' textAlign='center'>
      {children}
    </Box>
  );
}
