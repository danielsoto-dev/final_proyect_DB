import { Box } from '@chakra-ui/core';
import React from 'react';
import asignaturas from '../dummyData/asignaturas.json'; //This is de API fetch
import Row from './Row';
import Column from './Column';

export default function List() {
  return (
    <Box>
      <table>
        <thead>
          <tr>
            <Column as='th' rol='header'>
              NRC
            </Column>
            <Column as='th' rol='header'>
              Nombre
            </Column>
          </tr>
        </thead>
        <tbody>
          {asignaturas.map((asignatura, idx) => {
            return (
              <Row clickable={true} key={idx}>
                <Column>{asignatura.NRC}</Column>
                <Column>{asignatura.codigo_asignatura}</Column>
              </Row>
            );
          })}
        </tbody>
      </table>
    </Box>
  );
}
