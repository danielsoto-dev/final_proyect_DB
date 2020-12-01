import { composeIndex } from './translators';

function simulateHoursArray(dataById) {
  let hourArray = {};
  let NRCSet = new Set();
  for (let index = 0; index < dataById.length; index++) {
    let { Id, materia, NRC, dia, hora } = dataById[index];
    materia = materia.toUpperCase().trim();
    NRC = NRC + '';
    let idx = composeIndex(hora.trim(), dia.trim());
    //Solo si el NRC no ha sido visto
    if (!NRCSet.has(NRC)) {
      NRCSet.add(NRC);
      hourArray[NRC] = { materia, indexes: [idx] };
    } else {
      hourArray[NRC].indexes.push(idx); // 8-2 9-2
    }
    //!  esto es para los horarios
  }
  return hourArray;
}

export function createHorarioData(horarioData) {
  window.horarioData = horarioData;
  let dif = [];
  let set = new Set();
  for (let i = 0; i < horarioData.length; i++) {
    const element = horarioData[i];
    if (set.has(element.Id)) continue;
    set.add(element.Id);
    dif.push(element.Id);
  }
  let result = [];
  for (let i = 0; i < dif.length; i++) {
    const element = dif[i];
    let setId = horarioData.filter((el) => el.Id === element);
    console.log('setId', setId);

    result.push(simulateHoursArray(setId));
  }
  console.log('result', result);

  return result;
}
