import React, { useState } from 'react';
import { Box, Text } from '@chakra-ui/core';
export default function ListItem({
  asignatura,
  clickHandler,
  isDisable = false,
}) {
  const [isSelected, setIsSelected] = useState(false);
  const color = isSelected ? 'green.200' : '';

  return (
    // userSelect='none' ? this is when i want to disable
    <Box
      cursor={isDisable ? 'not-allowed' : 'pointer'}
      userSelect='none'
      onClick={() => setIsSelected(!isSelected)}
      bg={isDisable ? 'gray.200' : color}
      m='2px'
      padding='3px'
    >
      <Text>
        NRC: {asignatura.nrc} | {asignatura.nombreAsignatura} |{' '}
        {asignatura.nombreProfesor}
      </Text>
    </Box>
  );
}
