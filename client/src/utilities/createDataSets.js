import { composeIndex } from './translators';

export function createDataSets(generalData) {
  let hourArray = {};
  let listArray = [];
  let profArray = [];
  let nrcSet = new Set();
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
    let idx = composeIndex(hora, dia);
    hourArray[idx] = { materia, nrc, isBlocked: false };
    if (nrcSet.has(nrc)) continue;
    nrcSet.add(nrc);
    listArray.push({ nrc, nombreAsignatura, isBlocked: false, tipo });
    profArray.push({ nrc, nombreProfesor, isBlocked: false });
    //!  esto es para los horarios
  }
  console.log(listArray);
  let allData = {
    hourArray,
    listArray,
    profArray,
  };
  window.myData = allData;
  console.log('allData', allData);

  return allData;
}
