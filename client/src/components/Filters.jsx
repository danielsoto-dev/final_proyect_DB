import React from 'react';
import { Button, Flex } from '@chakra-ui/core';
import { BsFilter, BsTrash } from 'react-icons/bs';
export default function Filters() {
  return (
    <Flex direction='column' justify='space-around' h='100%'>
      <Button leftIcon={<BsFilter />} bg='orange.600' color='white'>
        Filtrar Profesores
      </Button>
      <Button leftIcon={<BsTrash />} bg='orange.600' color='white'>
        Limpiar Filtros
      </Button>
    </Flex>
  );
}
