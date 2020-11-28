import React, { useState } from 'react';
import { Box } from '@chakra-ui/core';
export default function ProfesorItem({ nombre, cod, onClick }) {
  const [isSelected, setIsSelected] = useState(false);
  const add = !isSelected;
  const ele = cod;
  return (
    <Box
      pr='5px'
      pl='5px'
      p='10px'
      m='4px'
      cursor='pointer'
      bgColor={isSelected ? 'tomato' : 'red.200'}
      onClick={() => {
        onClick(ele, add);
        setIsSelected(!isSelected);
      }}
    >
      cod: {cod} | nombre: {nombre}
    </Box>
  );
}
