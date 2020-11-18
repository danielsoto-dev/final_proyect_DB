import React, { useState } from 'react';
import { Box } from '@chakra-ui/core';
export default function Row({ children, bgColor, clickable }) {
  const [isSelected, setState] = useState(false);
  const color = isSelected ? 'blue.300' : 'inherit';
  const clickBehavior = clickable ? () => setState(!isSelected) : null;

  return (
    <Box
      as='tr'
      onClick={clickBehavior}
      bg={bgColor}
      border='2px'
      borderColor='white'
      bgColor={color}
    >
      {children}
    </Box>
  );
}
