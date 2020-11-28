import React, { useState, useEffect } from 'react';
import EffectModal from './EffectModal';
import { useHourFilters } from '../contexts/HourFilters';
import { Button, Flex } from '@chakra-ui/core';
import { BsFilter, BsTrash, BsPlus } from 'react-icons/bs';
import { useBlockedNRCProf } from '../contexts/BlockedNRCProf';
import ProfesorItem from './ProfesorItem';
import deleteValue from '../utilities/deleteValue';

export default function Filters({ items }) {
  //! Agregar conexión con el limpiar filtros
  const [isModalOpen, setisModalOpen] = useState(false);
  const [selectedProf, setSelectedProf] = useState([]);
  const { setHourFilters } = useHourFilters();
  const displayedProf = new Set();
  const { setblockedNRCProf } = useBlockedNRCProf();
  useEffect(() => {
    let posibleNRCBlocks = [];
    items.forEach((item) => {
      if (selectedProf.includes(item.codDoc)) {
        posibleNRCBlocks.push(item.nrc + '');
      }
    });
    setblockedNRCProf(posibleNRCBlocks);
  }, [selectedProf]);

  const clickHandler = (ele, add = true) => {
    if (add) {
      setSelectedProf([...selectedProf, ele]);
    } else {
      const newArray = deleteValue(selectedProf, (el) => {
        return el === ele;
      });
      setSelectedProf([...newArray]);
    }
  };

  return (
    <Flex
      mt='20px'
      padding='25px'
      direction='column'
      justify='space-around'
      h='200px'
    >
      <Button
        onClick={() => setisModalOpen(true)}
        leftIcon={<BsFilter />}
        bg='orange.600'
        color='white'
      >
        Filtrar Profesores
      </Button>
      <EffectModal
        effectTitle='Seleccione a sus profesores'
        isOpen={isModalOpen}
        onClose={() => setisModalOpen(false)}
        onEffect={() => alert('Aquí envio la actualización de blockNRc 🤑')}
      >
        {items.map((item) => {
          if (displayedProf.has(item.codDoc)) {
            return null;
          }
          displayedProf.add(item.codDoc);
          const isSelected = selectedProf.indexOf(item.codDoc) > -1;
          return (
            <ProfesorItem
              key={item.codDoc}
              nombre={item.nombreProfesor}
              cod={item.codDoc}
              onClick={clickHandler}
              isSelected={isSelected}
            ></ProfesorItem>
          );
        })}
      </EffectModal>
      <Button
        onClick={() => setHourFilters([])}
        leftIcon={<BsTrash />}
        bg='orange.600'
        color='white'
      >
        Limpiar Filtros
      </Button>
      <Button
        onClick={() => null}
        leftIcon={<BsPlus />}
        bg='orange.600'
        color='white'
      >
        Agregar Horario
      </Button>
    </Flex>
  );
}
