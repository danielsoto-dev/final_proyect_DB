import React, { useState } from 'react';
import { Box } from '@chakra-ui/core';
export default function Row({ children, bgColor, clickable }) {
  const [isSelected, setState] = useState(false);
  const color = isSelected ? 'green.300' : bgColor;

  const clickBehavior = clickable ? () => setState(!isSelected) : null;

  return (
    <Box as='tr' onClick={clickBehavior} bg={color}>
      {children}
    </Box>
  );
}
