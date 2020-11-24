import React from 'react';

import TableHeader from './TableHeader';
import TableBody from './TableBody';
import { useHourFilters } from '../contexts/HourFilters';

export default function Schedule({ info }) {
  const { hourFilters } = useHourFilters();
  let count = hourFilters.length;
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
      <p>{count}</p>
    </>
  );
}
