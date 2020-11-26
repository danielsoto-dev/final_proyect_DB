import React from 'react';
import { Box, Input, Text, Button } from '@chakra-ui/core';

export default function BasicInput({
  labelText,
  btnText,
  inputPlaceHolder,
  inputOnChange,
  btnOnClick,
  id,
}) {
  return (
    <Box mb='20px'>
      <Text mb='8px' fontSize='24px'>
        {labelText}
      </Text>
      <Input
        value={id}
        onChange={inputOnChange}
        fontSize='16px'
        mb='8px'
        placeholder={inputPlaceHolder}
        size='sm'
        w='250px'
        mr='10px'
      />
      <Button bg='orange.600' color='white' onClick={btnOnClick}>
        {btnText}
      </Button>
    </Box>
  );
}
