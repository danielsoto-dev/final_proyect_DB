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
        NRC: {asignatura.nrc} | {asignatura.nombreAsignatura}
      </Text>
    </Box>
  );
}
