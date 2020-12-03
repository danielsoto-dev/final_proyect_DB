import React, { useState, useEffect } from 'react';
import EffectModal from './EffectModal';
import { useHourFilters } from '../contexts/HourFilters';
import { Button, Flex } from '@chakra-ui/core';
import { BsFilter, BsTrash, BsPlus } from 'react-icons/bs';
import { RiFileExcel2Line } from 'react-icons/ri';
import { useBlockedNRCProf } from '../contexts/BlockedNRCProf';
import ProfesorItem from './ProfesorItem';
import deleteValue from '../utilities/deleteValue';
import { getTableById, downloadCVS } from '../utilities/TableCVSExporter';
import { useErrors } from '../contexts/Errors';
import { useLectureSelections } from '../contexts/LectureSelections';
import axios from 'axios';
import { useToast } from '@chakra-ui/core';

const registroExitoso = (toast) => {
  toast({
    title: '¡Horario agredado exitosamente!',
    description: 'Ya puedes consultar tu horario',
    status: 'success',
    isClosable: true,
    position: 'top',
  });
};
function postNRCHorario(NRC_list, id) {
  console.log('NRC_list', NRC_list);
  axios
    .post(`http://localhost:3001/api/estudiantes/horarios/${id}`, {
      NRC_list,
      id,
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
}

export default function Filters({ items, student }) {
  //! Agregar conexión con el limpiar filtros
  const toast = useToast();
  const { errors, setErrors } = useErrors();
  const [isModalOpen, setisModalOpen] = useState(false);
  const [selectedProf, setSelectedProf] = useState([]);
  const { setHourFilters } = useHourFilters();
  const displayedProf = new Set();
  const { lectureSelections } = useLectureSelections(); //! Usar este
  const { blockedNRCProf, setblockedNRCProf } = useBlockedNRCProf();
  let block = errors.table || errors.list ? true : false;
  useEffect(() => {
    let posibleNRCBlocks = [];
    items.forEach((item) => {
      if (selectedProf.includes(item.codDoc)) {
        posibleNRCBlocks.push(item.nrc);
      }
    });
    setblockedNRCProf(posibleNRCBlocks);
  }, [selectedProf]);

  const clickHandler = (ele, add = true) => {
    if (add) {
      setSelectedProf([...selectedProf, ele]);
    } else {
      const newArray = deleteValue(selectedProf, (el) => {
        return el === ele;
      });
      setSelectedProf([...newArray]);
    }
  };

  return (
    <Flex
      mt='20px'
      padding='25px'
      direction='column'
      justify='space-around'
      h='275px'
    >
      <Button
        onClick={() => setisModalOpen(true)}
        leftIcon={<BsFilter />}
        bg='orange.600'
        color='white'
      >
        Filtrar Profesores
      </Button>
      <EffectModal
        effectTitle='Seleccione a sus profesores'
        isOpen={isModalOpen}
        onClose={() => setisModalOpen(false)}
      >
        {items.map((item) => {
          if (displayedProf.has(item.codDoc)) {
            return null;
          }
          displayedProf.add(item.codDoc);
          const isSelected = selectedProf.indexOf(item.codDoc) > -1;
          return (
            <ProfesorItem
              key={item.codDoc}
              nombre={item.nombreProfesor}
              cod={item.codDoc}
              onClick={clickHandler}
              isSelected={isSelected}
            ></ProfesorItem>
          );
        })}
      </EffectModal>
      <Button
        onClick={() => {
          setHourFilters([]);
          setblockedNRCProf([]);
          setSelectedProf([]);
        }}
        leftIcon={<BsTrash />}
        bg='orange.600'
        color='white'
      >
        Limpiar Filtros
      </Button>
      <Button
        isDisabled={block}
        onClick={() => {
          postNRCHorario(lectureSelections, student.codigo);
          registroExitoso(toast);
        }}
        leftIcon={<BsPlus />}
        bg='orange.600'
        color='white'
      >
        Agregar Horario
      </Button>
      <Button
        isDisabled={block}
        onClick={() => {
          downloadCVS(getTableById('mainTable'));
        }}
        leftIcon={<RiFileExcel2Line />}
        bg='orange.600'
        color='white'
      >
        Descargar CVS
      </Button>
    </Flex>
  );
}
