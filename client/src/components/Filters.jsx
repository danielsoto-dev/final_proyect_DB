import React, { useState } from 'react';
import EffectModal from './EffectModal';
import { useHourFilters } from '../contexts/HourFilters';
import { Button, Flex } from '@chakra-ui/core';
import { BsFilter, BsTrash, BsPlus } from 'react-icons/bs';
import ProfesorItem from './ProfesorItem';
import deleteValue from '../utilities/deleteValue';

export default function Filters({ items }) {
  const [isModalOpen, setisModalOpen] = useState(false);
  const [selectedProf, setSelectedProf] = useState([]);
  const { setHourFilters } = useHourFilters();
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
          return (
            <ProfesorItem
              key={item.nrc}
              nrc={item.nrc}
              nombre={item.nombreProfesor}
              onClick={clickHandler}
              isSelected
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
