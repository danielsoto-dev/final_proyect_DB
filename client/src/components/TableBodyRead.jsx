import React, { useState } from 'react';
import Row from './Row';
import Cell from './Cell';
import tableData from '../utilities/tableData';
const data = {};
// We fetch the saved schedules
export default function TableBody({ scheme }) {
  const [dataArray, setDataArray] = useState(data);

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
              // ? Arreglar esto cuando haga el fetch real
              const key = `${idx}-${idx2}`;

              let value = key;
              if (key in dataArray) {
                value = dataArray[key].name;
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
