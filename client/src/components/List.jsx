import React, { useState, useEffect } from 'react';
import ListItem from './ListItem';
import deleteValue from '../utilities/deleteValue'; //This is de API fetch
import { useLectureSelections } from '../contexts/LectureSelections';
import { useBlockedNRC } from '../contexts/BlockedNRC';
import { BsArrowCounterclockwise } from 'react-icons/bs';
import { Box, Button, Text, Flex } from '@chakra-ui/core';
import axios from 'axios';

export default function List({ items = [] }) {
  const [selected, setSelected] = useState([]);
  const { setLectureSelections } = useLectureSelections();
  const { blockedNRC, setblockedNRC } = useBlockedNRC();
  // ? Puedo guardar solo los NRC a ver
  const clickHandler = (ele, add = true) => {
    if (add) {
      setSelected([...selected, ele]);
    } else {
      const newArray = deleteValue(selected, (el) => {
        return el.NRC === ele.NRC;
      });
      setSelected([...newArray]);
    }
  };
  console.log(items);
  //! CHANGE THIS TO FETCH THE LECTURES in Effect
  const fetchLectures = () => {
    let selectedNRC = [];
    items.forEach((item) => {
      if (!item.isBlocked) {
        selectedNRC.push(item.nrc);
      }
    });
    //selectedNRC se envia a Schedule para que proyecte las seleccionadas
    console.log('selectedNRC', selectedNRC);
  };
  return (
    <Flex direction='column'>
      <Box bgColor='blue.300' p='4px'>
        <Text textAlign='center' fontWeight='bold'>
          Cursos Proyectados
        </Text>
      </Box>
      {items.map((item) => {
        //Verifico en la lista de NRC bloqueados si está bloqueado lo pongo en la lista
        if (blockedNRC.indexOf(item.nrc) !== -1) {
          item.isBlocked = true;
        } else {
          item.isBlocked = false;
        }
        return (
          <ListItem
            key={item.nrc}
            asignatura={item}
            clickHandler={clickHandler}
            isDisable={item.isBlocked ? true : false}
          ></ListItem>
        );
      })}

      <Button
        onClick={fetchLectures}
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
