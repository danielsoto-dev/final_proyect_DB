import React from 'react';
import { Box } from '@chakra-ui/core';
export default function Cell({
  children,
  rol,
  id,
  handleClick,
  selected = false,
  bgColor,
}) {
  let color = selected && !bgColor ? 'red.300' : bgColor;
  return rol === 'header' ? (
    <Box padding={1} as='th' background='blue.300'>
      {children}
    </Box>
  ) : (
    <Box
      id={id}
      onClick={handleClick}
      as='td'
      background={color}
      textAlign='center'
    >
      {children}
    </Box>
  );
}
