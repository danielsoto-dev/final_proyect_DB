import React, { useState } from 'react';
import { Box } from '@chakra-ui/core';
import deleteValue from '../utilities/deleteValue';
import { useLectureSelections } from '../contexts/LectureSelections';
export default function Row({ disable, children, bgColor, clickable }) {
  const [isSelected, setState] = useState(false);
  const { lectureSelections, setLectureSelections } = useLectureSelections();

  const color = isSelected ? 'green.300' : bgColor;
  const clickBehavior = clickable
    ? () => {
        setState(!isSelected);
        // ? Revisar si es necesario usar Updater
        if (!isSelected) {
          setLectureSelections([...lectureSelections, children]);
        } else {
          const newState = deleteValue([...lectureSelections], children);
          setLectureSelections(newState);
        }
      }
    : null;

  return (
    <Box as='tr' onClick={clickBehavior} bg={color}>
      {children}
    </Box>
  );
}
