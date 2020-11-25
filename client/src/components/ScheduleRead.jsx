import React from 'react';

import TableHeader from './TableHeader';
import TableBodyRead from './TableBodyRead';

export default function Schedule({ scheme }) {
  const headerTitles = [
    'Hora',
    'Lunes',
    'Martes',
    'Miercoles',
    'Jueves',
    'Viernes',
    'Sabado',
  ];

  if (scheme == null) {
    return null;
  }
  return (
    <>
      <table width='70%'>
        <TableHeader headerTitles={headerTitles}></TableHeader>
        <TableBodyRead scheme={scheme}></TableBodyRead>
      </table>
    </>
  );
}
