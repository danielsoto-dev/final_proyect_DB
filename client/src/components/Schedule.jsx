import React, { useState } from 'react';
import Row from './Row';
import Cell from './Cell';
import { useHourFilters } from '../contexts/HourFilters';
export default function Schedule({ info }) {
  const { hourFilters, setHourFilters } = useHourFilters();
  if (info == null) {
    return null;
  }
  return (
    <table>
      <thead>
        <tr>
          <Cell as='th' rol='header'>
            Lunes
          </Cell>
          <Cell as='th' rol='header'>
            Martes
          </Cell>
          <Cell as='th' rol='header'>
            Miercoles
          </Cell>
          <Cell as='th' rol='header'>
            Jueves
          </Cell>
          <Cell as='th' rol='header'>
            Viernes
          </Cell>
          <Cell as='th' rol='header'>
            Sabado
          </Cell>
        </tr>
      </thead>
      <tbody>
        {info.map((row, idx) => {
          let color = idx % 2 === 0 ? 'white' : 'gray.300';
          return (
            <Row bgColor={color} key={idx}>
              {row.map((cell, idx) => {
                return (
                  <Cell clickable={true} key={idx}>
                    {cell}
                  </Cell>
                );
              })}
            </Row>
          );
        })}
      </tbody>
    </table>
  );
}
