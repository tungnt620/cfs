export function findNumberOccurrenceInString(masterString, stringNeedFind) {
  const re = new RegExp(stringNeedFind, 'gi');

  let result = 0;
  while (re.exec(masterString)) {
    ++result;
  }

  return result;
}
