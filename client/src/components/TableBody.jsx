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
              let isHour = false;
              let selected = false;
              if (idx2 === 0) {
                isHour = true;
              }
              let color = isHour ? 'blue.200' : '';
              const key = isHour ? idx2 : `${idx}-${idx2}`;
              let value = key;
              if (!isHour && key in dataArray) {
                value = dataArray[key].name;
              }

              if (hourFilters.includes(key)) {
                color = 'red.500';
                selected = true;
              }
              return (
                <Cell
                  id={key}
                  handleClick={() => handleClick(key)}
                  bgColor={color}
                  key={key}
                  selected={selected}
                >
                  {isHour ? tableData[idx] : value}
                </Cell>
              );
            })}
          </Row>
        );
      })}
    </tbody>
  );
}
