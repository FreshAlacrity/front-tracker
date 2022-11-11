// = Status Management =
function updateTileClasses(active) {
  let unavailable = listUnavailable(active);

  let showAvailable = getToggle("available");
  let showUnavailable = getToggle("unavailable");

  getMemberList().forEach(cs => {
    let e = elementByCallsign(cs);
    if (e) { // accounting for tiles that may not be present
      let tileClass = "hidden"
      if (active.includes(cs) || active.length === 0) {
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
  // takes as input an array of callsigns with + and - syntax

  let no = [];
  let all = getMemberList();
  function isMember(cs) { return all.includes(cs) }
  function has(key, str) {
    if (key.length === 1) {
      return str.indexOf(key) > -1
    } else {
      return (key.split('').filter(d => (str.indexOf(d) > -1)).length >= key.length)
    }
  }
  function have(key, arr, match = true) { return arr.filter(e => (has(key, e) === match)) }
  function endsIn(end, str) { return str.slice(-1) === end }
  function hasEach(arr, str) {
    return (arr.filter(wd => has(wd, str)).length === arr.length)
  }
   // #todo implement + and - here instead
  let wild = have("+", active);    

  if (wild.length > 0) {
    no = no.concat(all);
    no = no.filter(cs => {
      return !((wild.filter(w => {
        if (endsIn('+', w)) {} // what should this do differently?
        return hasEach(w.replace('+','').split(''), cs);        
      }).length) > 0)
    });
  }

  let exclusions = have("-", active);
  no = no.concat(all.filter(cs => {
      return ((exclusions.filter(e => {
          return hasEach(e.replace('-','').split(''), cs);
      }).length) > 0)
    }));

  // add as unavailable any siblings of active fusions
  no = no.concat(active.filter(isMember).filter(cs => cs.length > 1).map(getAllSibsList));

  return sortByCallsign(no.flat());
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

  if (c(targetCS)) {
    toggleOff(targetCS)
  } else { toggleOn(targetCS) }

  return active;
}