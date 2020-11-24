import React, { useState } from 'react';
import { Button, Flex } from '@chakra-ui/core';
import { BsFilter, BsTrash } from 'react-icons/bs';
import EffectModal from './EffectModal';
import { useHourFilters } from '../contexts/HourFilters';
export default function Filters() {
  const [isModalOpen, setisModalOpen] = useState(false);
  const { setHourFilters } = useHourFilters();
  return (
    <Flex direction='column' justify='space-around' h='200px'>
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
    </Flex>
  );
}
