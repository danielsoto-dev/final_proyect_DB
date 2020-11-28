import React from 'react';
import { Box } from '@chakra-ui/core';
export default function ProfesorItem({ nombre, nrc, selected, onClick }) {
  return (
    <Box
      pr='5px'
      pl='5px'
      p='10px'
      m='4px'
      cursor='pointer'
      bgColor={selected ? 'tomato' : 'red.200'}
      onClick={onClick}
    >
      NRC: {nrc} | nombre: {nombre}
    </Box>
  );
}
