// = Status Management =
function updateTileClasses(active) {
  let unavailable = listUnavailable(active);
  let showAvailable = data.setup.show.available;
  let showUnavailable = data.setup.show.unavailable;
  getMemberList().forEach(cs => {
    let e = elementByCallsign(cs);
    if (e) { // accounting for tiles that may not be present
      let tileClass = "hidden"
      if (active.includes(cs)) {
        tileClass = "active"
      } else if (unavailable.includes(cs) && showUnavailable) {
        tileClass = "unavailable"
      } else if (showAvailable && !unavailable.includes(cs)) {
        tileClass = "available"
      }
      e.className = tileClass + ' flip-coin';
    }
  });
}

function listUnavailable(active) {
  let unavailable = [];
  active.forEach(cs => {
    if (cs.length > 1) {
      unavailable = unavailable.concat(getAllSibsList(cs))
    }
  });
  /*
  digits().forEach(cs => {    
    if (!active.includes(cs)) {       
      unavailable.push(cs)
      if (active.join("").indexOf(cs) === -1) {
        unavailable = unavailable.concat(getAllSibsList(cs))
      }
    }
  });
  */
  return sortByCallsign(unavailable)  
}

function updateActiveList(active, targetCS) {
  function c(cs) { return active.includes(cs) }
  function r(cs) { active = remove(active, cs) }
  function a(cs) { if (!c(cs)) { active.push(cs) } }
  
  function toggleOff(cs) {
    if (cs.length > 1 && c(cs)) {
      cs.split('').forEach(a);
    }
    r(cs)
  }
  function toggleOn(cs) {
    a(cs)

    // make sure only headmates that can coexist are present:
    getAllSibsList(cs).forEach(toggleOff)
  }

  if (c(targetCS)) { toggleOff(targetCS)
  } else { toggleOn(targetCS) }

  return active;
}