import React, { useState } from 'react';
import { Box, Text } from '@chakra-ui/core';
export default function ListItem({
  asignatura,
  clickHandler,
  isDisable = false,
}) {
  const [isSelected, setIsSelected] = useState(false);
  const color = isSelected ? 'green.200' : '';
  const clickFun = () => {
    // ? This logic needs to change when fetching real data
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
      cursor={isDisable ? 'not-allowed' : 'pointer'}
      userSelect='none'
      onClick={isDisable ? null : clickFun}
      bg={isDisable ? 'gray.200' : color}
      m='2px'
      padding='3px'
    >
      <Text>
        NRC: {asignatura.NRC} | {asignatura.codigo_asignatura} |{' '}
        {asignatura.codigo_docente}
      </Text>
    </Box>
  );
}
