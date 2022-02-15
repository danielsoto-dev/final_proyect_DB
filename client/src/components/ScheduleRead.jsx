import React, { useState } from "react";
import { Box, Button } from "@chakra-ui/core";
import TableHeader from "./TableHeader";
import TableBodyRead from "./TableBodyRead";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
export default function Schedule({ scheme, arrayOfSchedules }) {
  const [index, setIndex] = useState(0);
  console.log("index", index);

  const headerTitles = [
    "Hora",
    "Lunes",
    "Martes",
    "Miercoles",
    "Jueves",
    "Viernes",
    "Sabado",
  ];

  function nextSchedule() {
    setIndex((idx) => {
      if (idx + 1 > arrayOfSchedules.length - 1) return idx;
      return idx + 1;
    });
  }
  function previousSchedule() {
    setIndex((idx) => {
      if (idx - 1 < 0) return idx;
      return idx - 1;
    });
  }
  if (scheme == null) {
    return null;
  }

  return (
    <Box display="flex" alignContent="center">
      <Button
        fontSize="20px"
        bg="black"
        color="white"
        mr="10px"
        alignSelf="center"
        onClick={previousSchedule}
      >
        <BsArrowLeft></BsArrowLeft>
      </Button>
      <table width="70%">
        <TableHeader headerTitles={headerTitles}></TableHeader>
        <TableBodyRead
          hours={arrayOfSchedules[index]}
          scheme={scheme}
        ></TableBodyRead>
      </table>
      <Button
        fontSize="20px"
        bg="black"
        color="white"
        ml="10px"
        alignSelf="center"
        onClick={nextSchedule}
      >
        <BsArrowRight></BsArrowRight>
      </Button>
    </Box>
  );
}
