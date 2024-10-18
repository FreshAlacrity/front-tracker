let lastNamesList = [["Lotus"],["Hart"],["Gray"],["Davis"],["Wood"],["Evans"],["Lee","Ley"], ["Locke"],["Thorne"],["Foster"]];

function lastNameGenerator (cs) {
  // #todo show and test
  
  //add a hyphen unless it's vowel-consonant (just compare to a list of vowels)
  // consider also: sun, price for 3? Howard
  return cs.split('').map(d => {
    if (lastNamesList[digitIndex(d)]) {
      return lastNamesList[digitIndex(d)][0]
    } else { return '' }
  }).join("-") //needs convert-to-int
  //hartwood
  //lockehart
  //lockeley
  //foster-thorne
  //grey-hart
}
function lastToCallsign (lastName) {
  // #todo add tests and implement
  return sortCallsign(lastNamesList.filter(arr => arr.filter(d => {
    return has(lastName.toLowerCase())
  })));
}