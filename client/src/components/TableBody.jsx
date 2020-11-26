import React, { useState } from 'react';
import Row from './Row';
import Cell from './Cell';
import tableData from '../utilities/tableData';
import deleteValue from '../utilities/deleteValue';
import { useHourFilters } from '../contexts/HourFilters';
const data = {
  '13-3': { NRC: 'A1', name: 'Calculo 1' },
  '13-4': { NRC: 'A2', name: 'Calculo 2' },
  '13-5': { NRC: 'A3', name: 'Calculo 3' },
  '13-6': { NRC: 'A4', name: 'Calculo 4' },
  '2-3': { NRC: 'B1', name: 'Física 1' },
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
  const { hourFilters, setHourFilters } = useHourFilters();
  const [dataArray, setDataArray] = useState(data);

  function handleClick(id) {
    if (hourFilters.includes(id)) {
      const newState = deleteValue(hourFilters, (el_id) => el_id === id);
      setHourFilters(newState);
    } else {
      setHourFilters([...hourFilters, id]);
    }
  }
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
                  handleClick={() => handleClick(key)}
                  key={key}
                  selected={hourFilters.includes(key) ? true : false}
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
