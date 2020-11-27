import React from 'react';
import { Box } from '@chakra-ui/core';
export default function Cell({
  children,
  rol,
  id,
  handleClick = () => {},
  selected = false,
  bgColor,
}) {
  let color = selected && !bgColor ? 'red.300' : bgColor;
  let borderColor = 'gray.300';
  return rol === 'header' ? (
    <Box padding={1} as='th' background='blue.300'>
      {children}
    </Box>
  ) : (
    <Box
      as='td'
      borderColor={borderColor}
      borderBottomStyle='solid'
      borderWidth='2px'
      id={id}
      onClick={handleClick}
      background={color}
      textAlign='center'
      p='3px'
    >
      {children}
    </Box>
  );
}
