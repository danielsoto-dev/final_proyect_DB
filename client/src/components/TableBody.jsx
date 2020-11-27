import React, { useState } from 'react';
import Row from './Row';
import Cell from './Cell';
import tableData from '../utilities/tableData';
import deleteValue from '../utilities/deleteValue';
import { useHourFilters } from '../contexts/HourFilters';
import { useBlockedNRC } from '../contexts/BlockedNRC';
function blockNRCbyId(hours, id) {
  let nrc_buscado = hours[id].nrc;
  if (nrc_buscado) {
    let iterable = Object.entries(hours);
    iterable.forEach((element) => {
      if (element[1].nrc === nrc_buscado) {
        element[1].isBlocked = true;
      }
    });
  }
}

function unblockNRCbyId(hours, id) {
  let nrc_buscado = hours[id].nrc;
  if (nrc_buscado) {
    let iterable = Object.entries(hours);
    iterable.forEach((element) => {
      if (element[1].nrc === nrc_buscado) {
        element[1].isBlocked = false;
      }
    });
  }
}
export default function TableBody({ scheme, hours, reset }) {
  const { hourFilters, setHourFilters } = useHourFilters();
  const { blockedNRC, setblockedNRC } = useBlockedNRC();
  const [dataArray, setDataArray] = useState([]);
  if (Object.entries(hourFilters).length === 0) {
    reset();
  }
  function handleClick(id) {
    let isInHours = id in hours;
    if (hourFilters.includes(id)) {
      const newState = deleteValue(hourFilters, (el_id) => el_id === id);
      if (isInHours) {
        const newBlocked = deleteValue(
          blockedNRC,
          (el) => el === hours[id].nrc
        );
        unblockNRCbyId(hours, id);
        setblockedNRC([...newBlocked]);
      }
      setHourFilters(newState);
    } else {
      //! CUIDADO CON ESTE LLAMADO

      if (isInHours) {
        blockNRCbyId(hours, id);
        setblockedNRC([...blockedNRC, hours[id].nrc]);
      }
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
              // ? Arreglar esto cuando haga el fetch real
              const key = `${idx}-${idx2}`;
              let value;
              if (key in hours && !hours[key].isBlocked) {
                value = hours[key].materia + hours[key].nrc;
              }
              //? Esto ^ ^ se irá cuando ya haya datos de verdad
              return (
                <Cell
                  //id es posiblemente inutil
                  id={key}
                  handleClick={() => handleClick(key)}
                  key={key}
                  selected={hourFilters.includes(key) ? true : false}
                  //selected={hours[key] && hours[key].isBlocked ? true : false}
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
