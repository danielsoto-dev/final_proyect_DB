import React, { useState } from 'react';
import Row from './Row';
import Column from './Column';
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
          <Column as='th' rol='header'>
            Lunes
          </Column>
          <Column as='th' rol='header'>
            Martes
          </Column>
          <Column as='th' rol='header'>
            Miercoles
          </Column>
          <Column as='th' rol='header'>
            Jueves
          </Column>
          <Column as='th' rol='header'>
            Viernes
          </Column>
          <Column as='th' rol='header'>
            Sabado
          </Column>
        </tr>
      </thead>
      <tbody>
        {info.map((el, idx) => {
          let color = 'white';
          if (idx % 2 === 0) {
            color = 'yellow.300';
          }
          return (
            <Row bgColor={color} key={idx}>
              {el.map((ele, idx) => {
                return (
                  <Column clickable={true} key={idx}>
                    {ele}
                  </Column>
                );
              })}
            </Row>
          );
        })}
      </tbody>
    </table>
  );
}
