import React, { useState } from 'react';
import { Box } from '@chakra-ui/core';
export default function Column({ rol, children }) {
  const [isSelected, setState] = useState(false);

  const color = isSelected ? 'blue.300' : 'inherit';
  if (rol === 'header') {
    return (
      <Box as='th' bg='blue.300'>
        {children}
      </Box>
    );
  }
  //color='white' w='120px' h='30px' m={2} bg='blue.900
  return (
    <Box
      onClick={() => setState(!isSelected)}
      as='td'
      background={color}
      textAlign='center'
    >
      {children}
    </Box>
  );
}
