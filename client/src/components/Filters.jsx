import React, { useState } from 'react';
import EffectModal from './EffectModal';
import { useHourFilters } from '../contexts/HourFilters';
import { Button, Flex } from '@chakra-ui/core';
import { BsFilter, BsTrash } from 'react-icons/bs';

export default function Filters() {
  const [isModalOpen, setisModalOpen] = useState(false);
  const { setHourFilters } = useHourFilters();
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
        onEffect={() => alert('We gucci 🤑')}
      >
        Aquí Filtro a los profes
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
        leftIcon={<BsTrash />}
        bg='orange.600'
        color='white'
      >
        Agregar Horario
      </Button>
    </Flex>
  );
}
