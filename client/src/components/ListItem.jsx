import React, { useState } from 'react';
import { Box, Text } from '@chakra-ui/core';
export default function ListItem({ asignatura, clickHandler }) {
  const [isSelected, setIsSelected] = useState(false);
  const color = isSelected ? 'green.200' : '';
  const clickFun = () => {
    if (!isSelected) {
      clickHandler({
        NRC: asignatura.NRC,
        codAsig: asignatura.codigo_asignatura,
        nameDoc: asignatura.codigo_docente,
      });
    } else {
      clickHandler(
        {
          NRC: asignatura.NRC,
          codAsig: asignatura.codigo_asignatura,
          nameDoc: asignatura.codigo_docente,
        },
        false
      );
    }
    setIsSelected(!isSelected);
  };
  return (
    // userSelect='none' ? this is when i want to disable
    <Box
      cursor='pointer'
      userSelect='none'
      onClick={clickFun}
      bg={color}
      m='2px'
    >
      <Text>
        NRC: {asignatura.NRC} | {asignatura.codigo_asignatura} |{' '}
        {asignatura.codigo_docente}
      </Text>
    </Box>
  );
}
