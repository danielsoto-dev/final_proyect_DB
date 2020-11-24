import React from 'react';
import Row from './Row';
import Cell from './Cell';
import tableData from '../utilities/tableData';
export default function TableBody({ info }) {
  return (
    <tbody>
      {info.map((row, idx) => {
        let color = idx % 2 === 0 ? 'white' : 'gray.300';
        return (
          <Row bgColor={color} key={idx}>
            {row.map((cell, idx2) => {
              let isHour = false;
              if (idx2 === 0) {
                isHour = true;
              }
              let color = isHour ? 'blue.200' : '';
              const key = isHour ? idx2 : `${idx}-${idx2}`;
              return (
                <Cell id={key} bgColor={color} clickable={true} key={key}>
                  {isHour ? tableData[idx] : key}
                </Cell>
              );
            })}
          </Row>
        );
      })}
    </tbody>
  );
}
