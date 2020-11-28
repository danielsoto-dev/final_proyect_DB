import React from 'react';
import { Box } from '@chakra-ui/core';
export default function ProfesorItem({ nombre, nrc, isSelected, onClick }) {
    if (!isSelected) {
        clickHandler({
          NRC: asignatura.nrc,
          codAsig: asignatura.nombreAsignatura,
        });
      } else {
        clickHandler(
          {
            NRC: asignatura.nrc,
            codAsig: asignatura.nombreAsignatura,
          },
          false
        );
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
