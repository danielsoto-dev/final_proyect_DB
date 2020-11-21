import { Box, Button } from '@chakra-ui/core';
import React from 'react';
import asignaturas from '../dummyData/asignaturas'; //This is de API fetch
import TableHeader from './TableHeader';
import Row from './Row';
import Cell from './Cell';

export default function List() {
  return (
    <Box>
      <table>
        <TableHeader headerTitles={['NRC', 'Asignatura']}></TableHeader>
        <tbody>
          {asignaturas.map((asignatura, idx) => {
            return (
              <Row clickable={true} key={idx}>
                <Cell>{asignatura.NRC}</Cell>
                <Cell>{asignatura.codigo_asignatura}</Cell>
              </Row>
            );
          })}
        </tbody>
      </table>
      <Button bgColor='blue.300' variant='solid'>
        Actualizar asignaturas
      </Button>
    </Box>
  );
}
