import React, { useState } from 'react';
import Row from './Row';
import Cell from './Cell';
import tableData from '../utilities/tableData';
const data = {
  '13-3': { NRC: 'A1', name: 'Calculo 1' },
  '13-4': { NRC: 'A1', name: 'Calculo 2' },
  '13-5': { NRC: 'A1', name: 'Calculo 3' },
  '13-6': { NRC: 'A1', name: 'Calculo 4' },
  '2-3': { NRC: 'A1', name: 'Física 1' },
  '4-4': { NRC: 'A1', name: 'Física 2' },
  '6-5': { NRC: 'A1', name: 'Física 3' },
  '8-6': { NRC: 'A1', name: 'Física 4' },
};

// function isBlocked(hourFilters, dataArray) {
//   for (let index = 0; index < hourFilters.length; index++) {
//     if (hourFilters[index] in dataArray) {
//       alert(
//         `La materia ${
//           dataArray[hourFilters[index]].name
//         } no puede proyectarse para estos filtros`
//       );
//       let newState = { ...dataArray };
//       delete newState[hourFilters[index]];
//       setDataArray(newState);
//     }
//   }
// }
// isBlocked(hourFilters, dataArray);

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
