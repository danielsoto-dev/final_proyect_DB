import React, { useState, useEffect } from 'react';
import ListItem from './ListItem';
import deleteValue from '../utilities/deleteValue'; //This is de API fetch
import { useLectureSelections } from '../contexts/LectureSelections';
import { useBlockedNRC } from '../contexts/BlockedNRC';
import { useBlockedNRCProf } from '../contexts/BlockedNRCProf';
import { BsArrowCounterclockwise } from 'react-icons/bs';
import { Box, Button, Text, Flex } from '@chakra-ui/core';
import { useErrors } from '../contexts/Errors';
import { useToast } from '@chakra-ui/core';

const matIsRequired = (toast, mat) => {
  toast({
    title: 'Bloqueo de asignatura obligatoria',
    description: `La asignatura: ${mat} es obligatoria, no puede bloquear todos los cursos`,
    status: 'warning',
    isClosable: true,
    position: 'top',
  });
};

function createNRCDict(items, errors, setErrors, student, toast) {
  let dict = {};
  let semestre = student.Semestre;
  items.forEach((item) => {
    // TODO: Revisar esta
    if (!item.isBlocked && item.semestreAsig - semestre <= 2) {
      if (!dict.hasOwnProperty(item.materia)) {
        dict[item.materia] = 1;
      } else {
        dict[item.materia] += 1;
      }
    } else {
      if (!dict.hasOwnProperty(item.materia)) {
        dict[item.materia] = 0;
      }
    }
  });
  let result = { error: false, mat: null };
  for (const property in dict) {
    if (dict[property] === 0) {
      result.error = true;
      result.mat = property;
    }
  }
  if (result.error) {
    setErrors((err) => {
      return { ...err, list: true };
    });
    matIsRequired(toast, result.mat);
  } else {
    setErrors((err) => {
      return { ...err, list: false };
    });
  }

  return dict;
}

export default function List({ items = [], student }) {
  const toast = useToast();

  const { errors, setErrors } = useErrors();
  const [nrcDic, setNrcDic] = useState({});
  const { lectureSelections, setLectureSelections } = useLectureSelections(); //! Usar este
  const { blockedNRC, setblockedNRC } = useBlockedNRC();
  const { blockedNRCProf } = useBlockedNRCProf();
  const blocked = [...new Set([...blockedNRC, ...blockedNRCProf])];
  useEffect(() => {
    if (Object.entries(student).length !== 0)
      setNrcDic(createNRCDict(items, errors, setErrors, student, toast));
  }, [items, blockedNRC, blockedNRCProf, lectureSelections]);

  // ? Puedo guardar solo los NRC a ver
  const clickHandler = (ele, add = true) => {
    if (add) {
      setLectureSelections([...lectureSelections, ele]);
    } else {
      const newArray = deleteValue(lectureSelections, (el) => {
        return el === ele;
      });
      setLectureSelections([...newArray]);
    }
  };
  return (
    <Flex direction='column'>
      <Box bgColor='blue.300' p='4px'>
        <Text textAlign='center' fontWeight='bold'>
          Cursos Proyectados
        </Text>
      </Box>
      <Box h='200px' overflow='scroll' overflowX='hidden'>
        {items.map((item) => {
          let isSelected = false;
          if (blocked.indexOf(item.nrc) !== -1) {
            item.isBlocked = true;
          } else {
            item.isBlocked = false;
            if (lectureSelections.indexOf(item.nrc) !== -1) {
              isSelected = true;
            }
          }
          return (
            <ListItem
              key={item.nrc}
              asignatura={item}
              isDisable={item.isBlocked}
              onClick={clickHandler}
              isSelected={isSelected}
            ></ListItem>
          );
        })}
      </Box>
    </Flex>
  );
}
