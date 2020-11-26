import React from 'react';

import TableHeader from './TableHeader';
import TableBody from './TableBody';

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
      <table height='100%' width='70%'>
        <TableHeader headerTitles={headerTitles}></TableHeader>
        <TableBody scheme={scheme}></TableBody>
      </table>
    </>
  );
}
