import React from 'react';
import { Box } from '@chakra-ui/core';

export default function Wrapper({ children }) {
  return (
    <Box border='red' w='1400px'>
      {children}
    </Box>
  );
}
