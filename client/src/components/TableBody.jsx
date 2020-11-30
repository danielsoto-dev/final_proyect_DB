import React, { useState, useEffect } from 'react';
import Row from './Row';
import Cell from './Cell';
import tableData from '../utilities/tableData';
import deleteValue from '../utilities/deleteValue';
import { useLectureSelections } from '../contexts/LectureSelections';
import { useHourFilters } from '../contexts/HourFilters';
import { useBlockedNRC } from '../contexts/BlockedNRC';
import { useToast } from '@chakra-ui/core';
import { useErrors } from '../contexts/Errors';

const collisionDetected = (toast, NRCs) => {
  toast({
    title: 'Colisión detectada',
    description: `Hubo una colisión entre los NRC: \n ${NRCs}`,
    status: 'warning',
    isClosable: true,
    position: 'top',
  });
};

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

function collisionChecker(selectedNRC, hourDict) {
  let hours = {};
  for (let i = 0; i < selectedNRC.length; i++) {
    hours[selectedNRC[i]] = [...hourDict[selectedNRC[i]].indexes];
  }
  let iter_hours = Object.entries(hours);
  let collisionNRC = [];
  for (let i = 0; i < iter_hours.length; i++) {
    const tags = iter_hours[i][1];
    for (let j = i; j < iter_hours.length - 1; j++) {
      let inner_tags = iter_hours[i + 1][1];
      if (tags.some((tag) => inner_tags.includes(tag))) {
        collisionNRC.push(`${iter_hours[i][0]}-${iter_hours[i + 1][0]}`);
      }
    }
  }
  console.log('collisionNRC', collisionNRC);
  return [...new Set(collisionNRC)];
}

export default function TableBody({ scheme, hours = {}, reset }) {
  const { errors, setErrors } = useErrors();

  const toast = useToast();
  const { hourFilters, setHourFilters } = useHourFilters();
  const { setblockedNRC } = useBlockedNRC();
  const { lectureSelections } = useLectureSelections(); //! Usar este

  useEffect(() => {
    //Agrego los NRC que están bloqueados en los tags de hourFilter
    let blocked = blockNRCByFilter(hours, hourFilters);
    setblockedNRC(blocked);
    let collisions = collisionChecker(lectureSelections, hours);
    if (collisions.length !== 0) {
      collisionDetected(toast, collisions);
      setErrors(true);
    } else {
      setErrors(false);
    }
  }, [lectureSelections, hourFilters]);

  if (Object.entries(hourFilters).length === 0) {
    reset();
  }

  // ? Logica cuando se hace click
  function handleClick(idx) {
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
        if (errors) color = 'red.200';
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
              if (
                nrc &&
                !nrc.isBlocked &&
                lectureSelections.indexOf(nrc.nrc) !== -1
              ) {
                value = nrc.nrc + ' ' + nrc.materia;
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
