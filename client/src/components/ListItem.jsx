import React, { useState } from 'react';
import { Box, Text } from '@chakra-ui/core';
export default function ListItem({ asignatura, clickHandler }) {
  const [isSelected, setIsSelected] = useState(false);
  const color = isSelected ? 'tomato' : '';
  const decoration = isSelected ? 'line-through' : ';';
  const clickFun = () => {
    if (!isSelected) {
      clickHandler({
        NRC: asignatura.NRC,
        cod_asig: asignatura.codigo_asignatura,
      });
    } else {
      clickHandler(
        {
          NRC: asignatura.NRC,
          cod_asig: asignatura.codigo_asignatura,
        },
        false
      );
    }

    setIsSelected(!isSelected);
  };
  return (
    <Box onClick={clickFun} bg={color} m='2px'>
      <Text textDecoration={decoration} userSelect='none'>
        NRC: {asignatura.NRC} | {asignatura.codigo_asignatura}
      </Text>
    </Box>
  );
}
