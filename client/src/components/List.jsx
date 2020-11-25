import React, { useState } from 'react';
import ListItem from './ListItem';
import deleteValue from '../utilities/deleteValue';
import asignaturas from '../dummyData/asignaturas'; //This is de API fetch
import { useLectureSelections } from '../contexts/LectureSelections';
import { BsArrowCounterclockwise } from 'react-icons/bs';
import { Box, Button, Text, Flex } from '@chakra-ui/core';
import axios from 'axios';

export default function List() {
  const [selected, setSelected] = useState([]);
  const { setLectureSelections } = useLectureSelections();
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
  //! CHANGE THIS TO FETCH THE LECTURES
  const fetchLectures = () => {
    axios
      .get('https://jsonplaceholder.typicode.com/users')
      .then(({ data }) => console.log(data));
    setLectureSelections();
  };

  return (
    <Flex direction='column'>
      <Box bgColor='blue.300' p='4px'>
        <Text fontWeight='bold'> Asignaturas Proyectadas</Text>
      </Box>
      {asignaturas.map((asignatura) => {
        return (
          <ListItem
            key={asignatura.codigo_asignatura}
            asignatura={asignatura}
            clickHandler={clickHandler}
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
