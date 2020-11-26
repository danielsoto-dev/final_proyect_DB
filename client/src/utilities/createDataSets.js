import { composeIndex } from './translators';

export function createDataSets(generalData) {
  let hourArray = {};
  let listArray = [];
  let profArray = [];
  for (let index = 0; index < generalData.length; index++) {
    let {
      materia,
      nrc,
      nombreAsignatura,
      nombreProfesor,
      tipo,
      hora,
      dia,
    } = generalData[index];

    //!  esto es para los horarios
    let idx = composeIndex(hora, dia);
    hourArray[idx] = materia;
  }
  console.log(hourArray);
  return hourArray;
}
