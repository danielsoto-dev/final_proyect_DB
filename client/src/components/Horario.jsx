import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box } from '@chakra-ui/core';

export default function Calendar() {
  const [personas, setPersonas] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const result = await axios(
        'http://localhost:3001/api/personas/name?name=a'
      );

      setPersonas(result.data);
    }
    fetchData();
  });
  return (
    <Box>
      {personas.map((el, idx) => {
        return <h1 key={idx}>{el.nombre}</h1>;
      })}
    </Box>
  );
}
