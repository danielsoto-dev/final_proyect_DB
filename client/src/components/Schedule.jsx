import React from 'react';

import TableHeader from './TableHeader';
import TableBody from './TableBody';

export default function Schedule({ info }) {
  const headerTitles = [
    'Hora',
    'Lunes',
    'Martes',
    'Miercoles',
    'Jueves',
    'Viernes',
    'Sabado',
  ];

  if (info == null) {
    return null;
  }
  return (
    <>
      <table width='70%'>
        <TableHeader headerTitles={headerTitles}></TableHeader>
        <TableBody info={info}></TableBody>
      </table>
    </>
  );
}
