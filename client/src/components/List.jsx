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

    console.log(`${property}: ${dict[property]}`);
  }
  if (result.error) {
    setErrors({ ...errors, list: true });
    matIsRequired(toast, result.mat);
  } else {
    setErrors({ ...errors, list: false });
  }

  return dict;
}

export default function List({ items = [], student }) {
  const toast = useToast();

  const { errors, setErrors } = useErrors();
  const [selected, setSelected] = useState([]);
  const [nrcDic, setNrcDic] = useState({});
  const { lectureSelections, setLectureSelections } = useLectureSelections(); //! Usar este
  const { blockedNRC, setblockedNRC } = useBlockedNRC();
  const { blockedNRCProf } = useBlockedNRCProf();
  const blocked = [...new Set([...blockedNRC, ...blockedNRCProf])];
  useEffect(() => {
    console.log('Change');
    if (Object.entries(student).length !== 0)
      setNrcDic(createNRCDict(items, errors, setErrors, student, toast));
  }, [items, selected, blockedNRC, blockedNRCProf, lectureSelections]);

  // ? Puedo guardar solo los NRC a ver
  const clickHandler = (ele, add = true) => {
    if (add) {
      setSelected([...selected, ele]);
    } else {
      const newArray = deleteValue(selected, (el) => {
        return el === ele;
      });
      setSelected([...newArray]);
    }
  };
  //! CHANGE THIS TO FETCH THE LECTURES in Effect
  const setLectures = () => {
    let selectedNRC = [];
    items.forEach((item) => {
      //Agrego las seleccionadas que no estén bloqueadas
      if (!item.isBlocked && selected.indexOf(item.nrc) !== -1) {
        selectedNRC.push(item.nrc);
      }
    });
    //! Solo mando lo que necesito, perfect para tirar la query console.log('selectedNRC', selectedNRC);
    setLectureSelections(selectedNRC);
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
            if (selected.indexOf(item.nrc) !== -1) {
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
      <Button
        onClick={setLectures}
        leftIcon={<BsArrowCounterclockwise />}
        bg='orange.600'
        color='white'
        variant='solid'
        mt='20px'
      >
        Actualizar asignaturas
      </Button>
    </Flex>
  );
}
