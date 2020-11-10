import React from 'react';
import { ThemeProvider, CSSReset } from '@chakra-ui/core';
import Header from './components/Header';
import Main from './components/Main';
function App() {
  return (
    <ThemeProvider>
      <CSSReset />
      <Header />
      <Main></Main>
    </ThemeProvider>
  );
}

export default App;
