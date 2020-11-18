import React, { useState } from 'react';
import { Box } from '@chakra-ui/core';

import { useHourFilters } from '../contexts/HourFilters';
export default function Column({ rol, children, clickable }) {
  const [isSelected, setState] = useState(false);
  const { hourFilters, setHourFilters } = useHourFilters();
  const color = isSelected ? 'blue.300' : 'inherit';
  const clickBehavior = clickable
    ? () => {
        setState(!isSelected);
        if (!isSelected) {
          setHourFilters(hourFilters.concat(children));
        } else {
          const index = hourFilters.indexOf(children);
          console.log(index);
          if (index > -1) {
            //! Holy Shit, splice devuelvo los elmininados y deja el resultado en el original WTF!!
            console.log([...hourFilters]);
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
