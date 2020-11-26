import React, { useState, useEffect } from 'react';
import ListItem from './ListItem';
import deleteValue from '../utilities/deleteValue'; //This is de API fetch
import { useLectureSelections } from '../contexts/LectureSelections';
import { BsArrowCounterclockwise } from 'react-icons/bs';
import { Box, Button, Text, Flex } from '@chakra-ui/core';
import axios from 'axios';

export default function List({ items = [] }) {
  useEffect(() => {}, [items]);
  const [selected, setSelected] = useState([]);
  const { setLectureSelections } = useLectureSelections();
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

  //! CHANGE THIS TO FETCH THE LECTURES in Effect
  const fetchLectures = () => {
    axios
      .get('https://jsonplaceholder.typicode.com/users')
      .then(({ data }) => console.log(data));
    setLectureSelections();
  };
  return (
    <Flex direction='column'>
      <Box bgColor='blue.300' p='4px'>
        <Text textAlign='center' fontWeight='bold'>
          Cursos Proyectados
        </Text>
      </Box>
      {items.map((item) => {
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
