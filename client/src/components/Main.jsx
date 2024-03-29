import React, { useState } from "react";
import Wrapper from "./Wrapper";
import ScheduleRead from "./ScheduleRead";
import Schedule from "./Schedule";
import matrix from "../utilities/parser";
import List from "./List";
import Filters from "./Filters";
import BasicInput from "./BasicInput";
import ContextWrapper from "./ContextWrapper";
import { createDataSets } from "../utilities/createDataSets";
import { Box, Flex, Text, Button } from "@chakra-ui/core";
import { useToast } from "@chakra-ui/core";
import { createHorarioData } from "../utilities/createHorarioData";
import axios from "axios";

const invalidInput = (toast) => {
  toast({
    title: "Entrada no valida",
    description: "Verifique el dato ingresado",
    status: "error",
    duration: 3000,
    isClosable: true,
    position: "bottom-left",
  });
};

const cantFindData = (toast) => {
  toast({
    title: "No sé encontró el id",
    description: "Verifique el dato ingresado",
    status: "error",
    duration: 3000,
    isClosable: true,
    position: "bottom-left",
  });
};

export default function Main() {
  const scheme = matrix();
  const toast = useToast();
  const [generalData, setGeneralData] = useState({
    hourArray: {},
    listArray: [],
    profArray: [],
  });
  const [isLogged, setIsLogged] = useState(false);
  const [isLogged2, setIsLogged2] = useState(false);
  const [student, setStudent] = useState({});
  const [student2, setStudent2] = useState({});
  const [id, setId] = useState("");
  const [id2, setId2] = useState("");
  const [horarioData, setHorarioData] = useState([]);
  console.log("horarioData", horarioData);
  const resetHour = () => {
    let iterable = Object.entries(generalData.hourArray);
    iterable.forEach((element) => {
      element[1].isBlocked = false;
    });
  };

  const handleInputChange2 = (event) => {
    setId2(event.target.value);
  };

  const handleInputChange = (event) => {
    setId(event.target.value);
  };
  // Fetch ID HORARIOS
  const handleLoginSubmit = async () => {
    let idToQuery = parseInt(id);
    if (!!idToQuery) {
      let consulta = await axios.get(
        `http://localhost:3001/api/estudiantes/id/${idToQuery}`
      );
      if (consulta.data.length === 0) {
        cantFindData(toast);
      } else {
        let subConsulta = await axios.get(
          `http://localhost:3001/api/estudiantes/proyectadas/${idToQuery}`
        );
        setGeneralData(createDataSets(subConsulta.data));
        setStudent(consulta.data[0]);
        setIsLogged(true);
      }
    } else {
      invalidInput(toast);
    }
  };
  const handleLoginSubmitCompare = async () => {
    let idToQuery = parseInt(id2);
    if (!!idToQuery) {
      let consulta = await axios.get(
        `http://localhost:3001/api/estudiantes/id/${idToQuery}`
      );
      if (consulta.data.length === 0) {
        cantFindData(toast);
      } else {
        let subConsulta = await axios.get(
          `http://localhost:3001/api/estudiantes/horarios/guardados/${idToQuery}`
        );
        setHorarioData(createHorarioData(subConsulta.data));
        console.log("subConsulta.data", subConsulta.data);
        setStudent2(consulta.data[0]);
        setIsLogged2(true);
      }
    } else {
      invalidInput(toast);
    }
  };

  return (
    <Flex mt="50px" alignItems="center" justifyContent="center">
      <ContextWrapper>
        <Wrapper>
          {!isLogged ? (
            <BasicInput
              labelText="Log-In"
              btnText="Ingresar"
              inputPlaceHolder="Ingrese su código"
              inputOnChange={handleInputChange}
              btnOnClick={handleLoginSubmit}
              id={id}
            ></BasicInput>
          ) : (
            <Box mb="20px">
              <Text mb="8px" fontSize="20px">
                ¡Bienvenid@ {student.nombre}! del {student.Semestre} semestre.
              </Text>
              <Button
                bg="black"
                color="white"
                onClick={() => {
                  setId(id);
                  setIsLogged(false);
                  setGeneralData({
                    hourArray: {},
                    listArray: [],
                    profArray: [],
                  });
                }}
              >
                Deslogear
              </Button>
            </Box>
          )}
          <Flex w="1400px" justifyContent="space-around" alignContent="center">
            <Schedule
              reset={resetHour}
              hours={generalData.hourArray}
              scheme={scheme}
            ></Schedule>
            <Flex flexDir="column">
              <List student={student} items={generalData.listArray}></List>
              <Filters
                student={student}
                items={generalData.profArray}
              ></Filters>
            </Flex>
          </Flex>
          <Box mb="20px">
            {!isLogged2 ? (
              <BasicInput
                labelText="Buscar Horarios guardados"
                btnText="Ingresar"
                inputPlaceHolder="Ingrese su código"
                inputOnChange={handleInputChange2}
                btnOnClick={handleLoginSubmitCompare}
                id={id2}
              ></BasicInput>
            ) : (
              <Box mb="20px">
                <Text mb="8px" fontSize="20px">
                  ¡Bienvenid@ {student2.nombre}! del {student2.Semestre}{" "}
                  semestre.
                </Text>
                <Button
                  bg="black"
                  color="white"
                  onClick={() => {
                    setId2(id2);
                    setIsLogged2(false);
                  }}
                >
                  Deslogear
                </Button>
              </Box>
            )}
            <Box ml="45px" mb="200px">
              <ScheduleRead
                arrayOfSchedules={horarioData}
                scheme={scheme}
              ></ScheduleRead>
            </Box>
          </Box>
        </Wrapper>
      </ContextWrapper>
    </Flex>
  );
}
