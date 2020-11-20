import { Box } from '@chakra-ui/core';
import React from 'react';
import asignaturas from '../dummyData/asignaturas.json'; //This is de API fetch
import Row from './Row';
import Cell from './Cell';

export default function List() {
  return (
    <Box>
      <table>
        <thead>
          <tr>
            <Cell as='th' rol='header'>
              NRC
            </Cell>
            <Cell as='th' rol='header'>
              Nombre
            </Cell>
          </tr>
        </thead>
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
    </Box>
  );
}
