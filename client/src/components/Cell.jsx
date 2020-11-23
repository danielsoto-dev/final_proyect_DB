import React, { useState } from 'react';
import { Box } from '@chakra-ui/core';
import deleteValue from '../utilities/deleteValue';
import { useHourFilters } from '../contexts/HourFilters';
export default function Cell({ children, rol, clickable, bgColor }) {
  // ? State for selection Styles
  const [isSelected, setState] = useState(false);
  // ? use of HourFilter Context.
  const { hourFilters, setHourFilters } = useHourFilters();

  const color = isSelected && !bgColor ? 'green.300' : bgColor;
  const clickBehavior = clickable
    ? () => {
        // () => diferencia, buscarla.
        setState(!isSelected);
        // ? Revisar si es necesario usar Updater
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
    <Box onClick={clickBehavior} as='td' background={color} textAlign='center'>
      {children}
    </Box>
  );
}
