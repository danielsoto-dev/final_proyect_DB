import React from 'react';
import { Box } from '@chakra-ui/core';
export default function Row({ children, bgColor }) {
  return (
    <Box as='tr' bg={bgColor} border='2px' borderColor='white'>
      {children}
    </Box>
  );
}
