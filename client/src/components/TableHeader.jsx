import React from 'react';
import Cell from './Cell';
export default function TableHeader({ headerTitles }) {
  return (
    <thead>
      <tr>
        {headerTitles.map((header, idx) => {
          return (
            <Cell key={idx} as='th' rol='header'>
              {header}
            </Cell>
          );
        })}
      </tr>
    </thead>
  );
}
