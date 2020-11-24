import { Box, Button, Text, Flex } from '@chakra-ui/core';
import React, { useState } from 'react';
import asignaturas from '../dummyData/asignaturas'; //This is de API fetch
import ListItem from './ListItem';
import deleteValue from '../utilities/deleteValue';
import { BsArrowCounterclockwise } from 'react-icons/bs';

export default function List() {
  const [selected, setSelected] = useState([]);
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
        onClick={() => alert(JSON.stringify(selected))}
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
