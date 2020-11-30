import { composeIndex } from './translators';

export function createDataSets(generalData) {
  console.log('generalData', generalData);
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
      codDoc,
      semestreAsig,
    } = generalData[index];
    materia = materia.toUpperCase();
    nrc = nrc + '';
    let idx = composeIndex(hora, dia);
    //Solo si el nrc no ha sido visto
    if (!nrcSet.has(nrc)) {
      nrcSet.add(nrc);
      hourArray[nrc] = { materia, indexes: [idx], isBlocked: false };
      listArray.push({
        materia,
        nrc,
        nombreAsignatura,
        nombreProfesor,
        isBlocked: false,
        semestreAsig,
        tipo,
      });
      profArray.push({ nrc, nombreProfesor, codDoc, isBlocked: false });
    } else {
      hourArray[nrc].indexes.push(idx);
    }
    //!  esto es para los horarios
  }
  //console.log(listArray);
  let allData = {
    hourArray,
    listArray,
    profArray,
  };
  window.myData = allData;

  return allData;
}
