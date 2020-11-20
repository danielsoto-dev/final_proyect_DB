import React, { useState } from 'react';
import { Box } from '@chakra-ui/core';

import { useHourFilters } from '../contexts/HourFilters';
export default function Cell({ rol, children, clickable }) {
  // ? State for selection Styles
  const [isSelected, setState] = useState(false);
  // ? use of HourFilter Context.
  const { hourFilters, setHourFilters } = useHourFilters();

  const color = isSelected ? 'green.300' : 'inherit';
  const clickBehavior = clickable
    ? () => {
        setState(!isSelected);
        if (!isSelected) {
          setHourFilters(hourFilters.concat(children));
        } else {
          const index = hourFilters.indexOf(children);
          if (index > -1) {
            //! Holy Shit, splice devuelvo los elmininados y deja el resultado en el original WTF!!
            let newState = [...hourFilters];
            newState.splice(index, 1);
            setHourFilters(newState);
          }
        }
      }
    : null;

  return rol === 'header' ? (
    <Box as='th' bg='blue.300'>
      {children}
    </Box>
  ) : (
    <Box onClick={clickBehavior} as='td' background={color} textAlign='center'>
      {children}
    </Box>
  );
}
