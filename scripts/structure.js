
// sets an object that describes our system architecture and returns an array of callsigns
function makeInitialList() {
  let headmates = {}
  let count = 0;
  let baseNum = data.setup.digits;
  let cap = 4; // n-fusion maximum

  function newMember(callsign) {
    headmates[callsign + ''] = {
      big_sibs: [],
      lil_sibs: [],
      sibs: []
    };
    count++;
  }
  function mergeEntries(a, b) {
    // @later why does removing the length from here cause an infinite loop?
    let comb = (a + '' + b);
    let key = sortCallsign(comb);
    if (a !== b && key.length <= cap && comb.length == key.length) {
      let A = headmates[a].lil_sibs;
      let B = headmates[b].lil_sibs;
      let C = [];
      if (headmates.hasOwnProperty(key)){
        C = headmates[key].lil_sibs;
      } else {
        newMember(key);
      }
      headmates[key].lil_sibs = [a, b].concat(A, B, C);
      
      headmates[a].big_sibs.push(key);
      headmates[b].big_sibs.push(key);
    }
  }
  function addMergeGeneration() {
    let currentKeys = Object.keys(headmates);
    currentKeys.forEach(a => {
      currentKeys.forEach(b => {
        mergeEntries(a, b);
      });
    });
  }
  function dedupCallsigns() {
    for (const [key, value] of Object.entries(headmates)) {
      for (const [p, list] of Object.entries(value)) {
        if (Array.isArray(list)) {
          headmates[key][p] = sortByCallsign(list);
        }
      }
    }
  }
  
  // set up generation 1 and then recursively combine
  for (a = 1; a <= baseNum; a++) { newMember(a) }
  for (g = 0; g < cap; g++) {
    addMergeGeneration();
    dedupCallsigns();
  }
    
  // fill in all sibs
  function fillInSiblings(key) {
    let sibs = [];

    function addSibs(sibKey) {
      let lilSib = headmates[key].lil_sibs.includes(sibKey);
      let bigSib = headmates[key].big_sibs.includes(sibKey)
      if (!lilSib & !bigSib) {
        sibs.push(sibKey);
      }
    }

    // add each digit in the callsign as a little sibling
    if (key.length > 1) {
      key.split('').forEach(a => {
        // @todo add support for multi-part lil_sibs?
        headmates[a].big_sibs.forEach(addSibs);
      });
    }
    
    // deduplicate and sort the sibling array
    sibs = sortByCallsign(sibs);

    // remove sibling ties to self
    if (sibs.indexOf(key) >= 0) {
      sibs.splice(sibs.indexOf(key), 1);
    }
    
    headmates[key].sibs = sibs;
  }
  for (const [callsign, value] of Object.entries(headmates)) {
    fillInSiblings(callsign);
  }
  
  data.structure.relatives = headmates;
  return Object.keys(headmates);
}