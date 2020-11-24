import React, { useState } from 'react';
import { Box } from '@chakra-ui/core';
import deleteValue from '../utilities/deleteValue';
import { useHourFilters } from '../contexts/HourFilters';
export default function Cell({ children, rol, clickable, bgColor, id }) {
  const [isSelected, setIsSelected] = useState(false);
  const { hourFilters, setHourFilters } = useHourFilters();

  let color = isSelected && !bgColor ? 'green.300' : bgColor;
  // if (hourFilters.length === 0) {
  //   setIsSelected(false);
  // }
  const clickBehavior = clickable
    ? () => {
        // () => diferencia, buscarla.
        setIsSelected(!isSelected);
        if (!isSelected) {
          setHourFilters([...hourFilters, children]);
        } else {
          const newState = deleteValue(hourFilters, (ele) => ele === children);
          setHourFilters(newState);
        }
      }
    : null;
  return rol === 'header' ? (
    <Box padding={1} as='th' bg='blue.300'>
      {children}
    </Box>
  ) : (
    <Box
      id={id}
      onClick={clickBehavior}
      as='td'
      background={color}
      textAlign='center'
    >
      {children}
    </Box>
  );
}
