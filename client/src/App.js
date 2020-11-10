import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [lista, setList] = useState([]);
  useEffect(() => {
    axios
      .get('http://localhost:3001/api/personas/name?name=a')
      .then((response) => {
        setList(response.data);
        console.log('response.data', response.data);
      });
  }, []);
  return (
    <div className='App'>
      <header className='App-header'>
        <p>Maybe i remember. 😀</p>
        {lista.map((el) => {
          return <h3>{el.nombre}</h3>;
        })}
      </header>
    </div>
  );
}

export default App;
