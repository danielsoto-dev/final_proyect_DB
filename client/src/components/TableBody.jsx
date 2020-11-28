import React, { useState, useEffect } from 'react';
import Row from './Row';
import Cell from './Cell';
import tableData from '../utilities/tableData';
import deleteValue from '../utilities/deleteValue';
import { useHourFilters } from '../contexts/HourFilters';
import { useBlockedNRC } from '../contexts/BlockedNRC';

function keyInHours(key, hours_list) {
  let list = Object.entries(hours_list);
  for (let i = 0; i < list.length; i++) {
    const tags = list[i][1].indexes;
    if (tags.indexOf(key) !== -1) {
      return { ...list[i][1], nrc: list[i][0] };
    }
  }
  return null;
}

function blockNRCByFilter(hours_list, filter) {
  let list = Object.entries(hours_list);
  let blockedNRC_list = [];
  for (let i = 0; i < list.length; i++) {
    //tags son los indices del NRC
    const tags = list[i][1].indexes;
    // Ver si se puede cambiar el orden de esto
    if (tags.some((tag) => filter.includes(tag))) {
      list[i][1].isBlocked = true;
      blockedNRC_list.push(list[i][0]);
    } else {
      list[i][1].isBlocked = false;
    }
  }
  return blockedNRC_list;
}

export default function TableBody({ scheme, hours, reset }) {
  const { hourFilters, setHourFilters } = useHourFilters();
  const { blockedNRC, setblockedNRC } = useBlockedNRC();

  useEffect(() => {
    //Se eliminó un tag a hourFilter
    let blocked = blockNRCByFilter(hours, hourFilters);
    console.log('blocked', blocked);
    setblockedNRC(blocked);
  }, [hourFilters]);

  if (Object.entries(hourFilters).length === 0) {
    reset();
  }
  // ? Logica cuando se hace click
  function handleClick(idx) {
    // Preguntamos si ya estaba ese valor
    if (hourFilters.includes(idx)) {
      //Si estaba, lo eliminamos
      const newHourFilter = deleteValue(hourFilters, (el_id) => el_id === idx);
      setHourFilters(newHourFilter);
    } else {
      //Sino, se agrega
      setHourFilters([...hourFilters, idx]); //Ahora, buscamos que NRC, tiene el tag bloqueado y seleccionamos a ese grupo como bloqueado
    }
    //!CREO QUE IS IN HOURS ES REDUNDANTE O NO PORQUE LOS  VACIOS AJA
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
              // ? Generamos la key/tag/idx
              const key = `${idx}-${idx2}`;
              let value = key;
              if (Object.keys(hours).length !== 0) {
                //key in hours && !hours[key].isBlocked
                let nrc = keyInHours(key, hours);
                //nrc && !nrc.isBlocked
                if (nrc && !nrc.isBlocked) {
                  value = nrc.nrc + ' ' + nrc.materia;
                }
              }
              //? Esto ^ ^ se irá cuando ya haya datos de verdad
              return (
                <Cell
                  //id es posiblemente inutil
                  id={key}
                  handleClick={() => handleClick(key)}
                  key={key}
                  // esto determina si se pone rojo o no
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
