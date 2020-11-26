const dictDays = {
  lunes: 1,
  martes: 2,
  miercoles: 3,
  miércoles: 3,
  jueves: 4,
  viernes: 5,
  sabado: 6,
};

const dictHours = {
  '6:30': 0,
  '7:30': 1,
  '8:30': 2,
  '9:30': 3,
  '10:30': 4,
  '11:30': 5,
  '12:30': 6,
  '13:30': 7,
  '14:30': 8,
  '15:30': 9,
  '16:30': 10,
  '17:30': 11,
  '18:30': 12,
  '19:30': 13,
};
function dayToIndex(strDay) {
  return dictDays[strDay.toLowerCase()];
}
function hourToIndex(strHour) {
  return dictHours[strHour.toLowerCase()];
}

function composeIndex(hour, day) {
  return `${hourToIndex(hour)}-${dayToIndex(day)}`;
}

export { dayToIndex, hourToIndex, composeIndex };
