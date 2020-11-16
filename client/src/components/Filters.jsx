import React from 'react';
import { Button, Flex } from '@chakra-ui/core';
import { AiOutlineFilter, AiOutlineClear } from 'react-icons/ai';
export default function Filters() {
  return (
    <Flex direction='column' justify='space-evenly' h='100%'>
      <Button leftIcon={<AiOutlineFilter />} bg='orange.600' color='white'>
        Filtrar Profesores
      </Button>
      <Button leftIcon={<AiOutlineClear />} bg='orange.600' color='white'>
        Limpiar Filtros
      </Button>
    </Flex>
  );
}
