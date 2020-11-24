import React, { useEffect } from 'react';
import { Box } from '@chakra-ui/core';
export default function Cell({
  children,
  rol,
  bgColor,
  id,
  handleClick,
  selected,
  value,
}) {
  let color = selected && !bgColor ? 'green.300' : bgColor;
  // useEffect(() => {
  //   effect;
  //   return () => {
  //     cleanup;
  //   };
  // }, [value]);
  return rol === 'header' ? (
    <Box padding={1} as='th' bg='blue.300'>
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
