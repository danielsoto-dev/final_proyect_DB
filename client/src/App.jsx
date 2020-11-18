import React from 'react';
import { ChakraProvider } from '@chakra-ui/core';
import Header from './components/Header';
import Main from './components/Main';
function App() {
  return (
    <ChakraProvider>
      <Header />
      <Main></Main>
    </ChakraProvider>
  );
}

export default App;
