import React from 'react';
import Row from './Row';
import Cell from './Cell';
import tableData from '../utilities/tableData';
import deleteValue from '../utilities/deleteValue';
import { useHourFilters } from '../contexts/HourFilters';

export default function TableBody({ info }) {
  const { hourFilters, setHourFilters } = useHourFilters();
  const dataArray = {
    '3-3': { NRC: 'A1', name: 'Calculo 1' },
    '3-4': { NRC: 'A1', name: 'Calculo 2' },
    '3-5': { NRC: 'A1', name: 'Calculo 3' },
    '3-6': { NRC: 'A1', name: 'Calculo 4' },
    '2-3': { NRC: 'A1', name: 'Física 1' },
    '4-4': { NRC: 'A1', name: 'Física 2' },
    '6-5': { NRC: 'A1', name: 'Física 3' },
    '7-6': { NRC: 'A1', name: 'Física 4' },
  };

  function handleClick(id) {
    if (hourFilters.includes(id)) {
      const newState = deleteValue(hourFilters, (el_id) => el_id === id);
      setHourFilters(newState);
    } else {
      setHourFilters([...hourFilters, id]);
    }
  }
  console.log(hourFilters);
  return (
    <tbody>
      {info.map((row, idx) => {
        let color = idx % 2 === 0 ? 'white' : 'gray.300';
        return (
          <Row bgColor={color} key={idx}>
            {row.map((_, idx2) => {
              // Arreglar comportamiento para celda no utilizable
              let selected = false;
              if (idx2 === 0) {
                return (
                  <Cell bgColor={'blue.200'} key={idx2}>
                    {tableData[idx]}
                  </Cell>
                );
              }
              const key = `${idx}-${idx2}`;
              let value = key;
              if (key in dataArray) {
                value = dataArray[key].name;
              }
              if (hourFilters.includes(key)) {
                console.log(key);
                selected = true;
              }
              return (
                <Cell
                  id={key}
                  handleClick={() => handleClick(key)}
                  key={key}
                  selected={selected}
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
