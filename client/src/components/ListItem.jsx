import React from 'react';
import { Box, Text } from '@chakra-ui/core';
export default function ListItem({
  asignatura,
  onClick,
  isDisable = false,
  isSelected = false,
}) {
  const color = isSelected ? 'green.200' : '';
  const add = !isSelected;
  const ele = asignatura.nrc;
  return (
    <Box
      cursor={isDisable ? 'not-allowed' : 'pointer'}
      userSelect='none'
      onClick={() => {
        onClick(ele, add);
      }}
      bg={isDisable ? 'gray.500' : color}
      m='2px'
      padding='3px'
    >
      <Text>
        NRC: {asignatura.nrc} | {asignatura.materia}|
        {asignatura.nombreAsignatura}
      </Text>
    </Box>
  );
}
