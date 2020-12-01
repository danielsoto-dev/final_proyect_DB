import React, { useState } from 'react';
import Row from './Row';
import Cell from './Cell';
import tableData from '../utilities/tableData';
function keyInHours(key, hours_list = {}) {
  let list = Object.entries(hours_list);
  for (let i = 0; i < list.length; i++) {
    const tags = list[i][1].indexes;
    if (tags.indexOf(key) !== -1) {
      return { ...list[i][1], nrc: list[i][0] };
    }
  }
  return null;
}

// We fetch the saved schedules
export default function TableBody({ scheme, hours }) {
  return (
    <tbody>
      {scheme.map((row, idx) => {
        let color = idx % 2 === 0 ? 'white' : 'gray.300';
        return (
          <Row bgColor={color} key={idx}>
            {row.map((_, idx2) => {
              // Arreglar comportamiento para celda no utilizable
              if (idx2 === 0) {
                return (
                  <Cell bgColor={'blue.200'} key={idx2}>
                    {tableData[idx]}
                  </Cell>
                );
              }
              // ? Generamos la key/tag/idx
              const key = `${idx}-${idx2}`;
              let value = '';
              //key in hours && !hours[key].isBlocked
              let nrc = keyInHours(key, hours);

              //nrc && !nrc.isBlocked && lecturesSelections.indexOf(nrc.nrc) !== -1
              if (nrc) {
                value = nrc.nrc + ' ' + nrc.materia;
              }
              //? Esto ^ ^ se irá cuando ya haya datos de verdad
              return (
                <Cell
                  //id es posiblemente inutil
                  id={key}
                  key={key}
                >
                  {value}
                </Cell>
              );
            })}
          </Row>
        );
      })}
    </tbody>
  );
}
