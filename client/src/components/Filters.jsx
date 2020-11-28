import React, { useState, useEffect } from 'react';
import EffectModal from './EffectModal';
import { useHourFilters } from '../contexts/HourFilters';
import { Button, Flex } from '@chakra-ui/core';
import { BsFilter, BsTrash, BsPlus } from 'react-icons/bs';
import { useBlockedNRC } from '../contexts/BlockedNRC';
import ProfesorItem from './ProfesorItem';
import deleteValue from '../utilities/deleteValue';

export default function Filters({ items }) {
  const [isModalOpen, setisModalOpen] = useState(false);
  const [selectedProf, setSelectedProf] = useState([]);
  const { setHourFilters } = useHourFilters();
  const displayedProf = new Set();
  const { blockedNRC, setblockedNRC } = useBlockedNRC();
  useEffect(() => {
    let posibleNRCBlocks = [];
    items.forEach((item) => {
      if (selectedProf.includes(item.codDoc)) {
        if (blockedNRC.indexOf(item.nrc + '') === -1) {
          posibleNRCBlocks.push(item.nrc + '');
        }
      }
    });
    setblockedNRC([...new Set([...blockedNRC, ...posibleNRCBlocks])]);
  }, [selectedProf]);

  console.log([...blockedNRC]);
  const clickHandler = (ele, add = true) => {
    if (add) {
      setSelectedProf([...selectedProf, ele]);
    } else {
      const newArray = deleteValue(selectedProf, (el) => {
        return el.NRC === ele.NRC;
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
          return (
            <ProfesorItem
              key={item.codDoc}
              nombre={item.nombreProfesor}
              cod={item.codDoc}
              onClick={clickHandler}
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
