import React, { useState, useEffect } from 'react';
import ListItem from './ListItem';
import deleteValue from '../utilities/deleteValue'; //This is de API fetch
import { useLectureSelections } from '../contexts/LectureSelections';
import { useBlockedNRC } from '../contexts/BlockedNRC';
import { useBlockedNRCProf } from '../contexts/BlockedNRCProf';
import { BsArrowCounterclockwise } from 'react-icons/bs';
import { Box, Button, Text, Flex } from '@chakra-ui/core';

function createNRCDict(items) {
  let dict = {};
  items.forEach((item) => {
    if (!item.isBlocked) {
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
  return dict;
}

export default function List({ items = [] }) {
  const [selected, setSelected] = useState([]);
  const [nrcDic, setNrcDic] = useState({});
  const { setLectureSelections } = useLectureSelections(); //! Usar este
  const { blockedNRC, setblockedNRC } = useBlockedNRC();
  const { blockedNRCProf } = useBlockedNRCProf();
  const blocked = [...new Set([...blockedNRC, ...blockedNRCProf])];
  useEffect(() => {
    console.log('cambio items');
    setNrcDic(createNRCDict(items));
  }, [items, blockedNRC, blockedNRCProf]);

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
