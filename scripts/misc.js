// sorts digits within a callsign
function sortCallsign(callsign) {
  let key = callsign + '';
  if (key.length > 1) {
    key = sortByCallsign(key.split('')).join('');
  }
  return key;
}
