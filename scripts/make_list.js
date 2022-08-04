// populate the headmates object and return # generated
function makeInitialList() {
  let headmates = {}
  let count = 0;
    
  function newHeadmate(callsign, status = "not present") {
    let n = {
      in: [],
      components: [],
      siblings: [],
      status: { 
        available: true, 
        present: false,
        stable: false,
        resting: false
      }
    };
    let key = callsign + '';
    headmates[key] = n;
    if (status == "present") {
      n.status.present = true;
    }
    //addHeadmateTile(callsign, headmates[key]);
    count++;
  }
  
  for (a = 1; a <= baseNum; a++) { 
    newHeadmate(a, "present");
    fronting.push(a);
  }
  
  function mergeEntries(a, b) {
    // @later why does removing the length from here cause an infinite loop?
    let comb = (a + '' + b);
    let key = sortCallsign(comb);
    if (a !== b && key.length <= cap && comb.length == key.length) {
      let A = headmates[a].components;
      let B = headmates[b].components;
      let C = [];
      if (headmates.hasOwnProperty(key)){
        C = headmates[key].components;
      } else {
        newHeadmate(key);
      }
      headmates[key].components = [a, b].concat(A, B, C);
      
      headmates[a].in.push(key);
      headmates[b].in.push(key);
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
  
  for (g = 0; g < cap; g++) {
    addMergeGeneration();
    dedupCallsigns();
  }
  
  /*
  for (a = 1; a <= baseNum; a++) {
    for (b = a + 1; b <= baseNum; b++) {
      num = "" + a + b;
      newHeadmate(num, "not present");
      //headmates[a + ""].siblings.push(num);
      //headmates[b + ""].siblings.push(num);

      
      for (c = b + 1; c <= baseNum; c++) {

        num = '' + a + b + c;

        addHeadmateTile(num, "not present");
        headmates[a + ''].siblings.push(num);
        headmates[b + ''].siblings.push(num);
        headmates[c + ''].siblings.push(num);

      }
      
    }
  }
  */

  // fill in all siblings
  function fillInSiblings(key) {
    let sibs = [];

    function addSibs(sibKey) {
      let lilSib = headmates[key].components.includes(sibKey);
      let bigSib = headmates[key].in.includes(sibKey)
      if (!lilSib & !bigSib) {
        sibs.push(sibKey);
      }
    }

    if (key.length > 1) {
      key.split('').forEach(a => {
        // @todo add support for multi-part components?
        headmates[a].in.forEach(addSibs);
      });
    }
    
    // deduplicate and sort the sibling array
    sibs = sortByCallsign(sibs);

    // remove the callsign for this headmate
    if (sibs.indexOf(key) >= 0) {
      sibs.splice(sibs.indexOf(key), 1);
    }
    
    headmates[key].siblings = sibs;
  }
  for (const [callsign, value] of Object.entries(headmates)) {
    fillInSiblings(callsign);
  }
  
  return headmates;
}
