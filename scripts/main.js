console.clear(); // for debugging, remove @later

var baseNum = 9;
var cap = 4; // n-fusion maximum
var totalNum = 0;
var fronting = [];
var headmates = {};
var container = document.getElementById("fronters"); 
var note = document.getElementById("fronters-note"); 

function elementByCallsign(callsign) {
  return document.getElementById("tile-" + callsign);
}

// returns a flexbox sort order integer
function sortOrder(callsign, headmate) {
  let num = callsign.length;
  if (!headmate.status.available) {
    num += (20 ** (cap + 1));
  } else if (!headmate.status.present) {
    num += (10 ** (cap + 1));
  }
  return num;
}

function sortByCallsign(arr) {
  // sorts and deduplicates a callsign list
  // @later use custom sort?
  return [...new Set(arr)].sort(function (x, y) {
    x = parseInt(x);
    y = parseInt(y);
    if (x < y) {
      return -1;
    }
    if (x > y) {
      return 1;
    }
    return 0;
  });
}

function updatePage(frontList) {
  frontList = sortByCallsign(frontList);
  // @todo update url too  
  note.value = frontList.join(", ");
}

function checkStatus(callsign, string, bool = true) {
  return (headmates[callsign].status[string] == bool);
}
function setStatus(callsign, string, bool = true) {
  headmates[callsign].status[string] = bool;
}
function bulkSetStatus(list, string, bool) {
  list.forEach(a => {
    setStatus(a, string, bool);
  })
}
function setAvailability() {
  bulkSetStatus(Object.keys(headmates), "available", true)

  for (const [callsign, p] of Object.entries(headmates)) {
    if (callsign.length == 1 && p.status.resting) {
      // mark resting digits unavailable
      setStatus(callsign, 'available', false);
      // mark unavailable any fusions with resting digits
      bulkSetStatus(p.in, 'available', false);
    } else if (callsign.length > 1 && p.status.present) {
      // mark unavailable siblings of present fusions
      bulkSetStatus(p.siblings, 'available', false);
      // mark unavailable components of present fusions
      bulkSetStatus(p.components, 'available', false);
    }
  }

  // output front signature
  fronting = [];
  for (const [callsign, value] of Object.entries(headmates)) {
    if (value.status.present) {
      fronting.push(callsign);
    }
  }
  updatePage(fronting);
}

function addPluralKitDetails(m, autofix = false) {
  function getHTMLname(displayName, callsign) {
    // @later maybe set this up another way?
    // it's really just Sweet William with a space in his name
    let parts = displayName.split(' ')
    let isWord = /^\w+$/ // /\w/ // for if we want parentheticals
    let name = '';
    name += parts[0]
    if (parts[1] != "|") {
      name = parts[1] + ' ' + name + ' ' + parts[1];
    }
    name += "<br>";
    // @todo get this working
    name += `<span class="name" contenteditable="true" onchange="nameChange()" id="name-${callsign}">`
    name += parts[2];
    if (parts[3] && isWord.test(parts[3])) {
      name += ' ' + parts[3];
    }
    name += "</span>";
    return name;
  }
  
  let callsign = m.display_name.split(" ")[0];
  callsign = callsign.replace('-', '') // for Altar etc

  if (callsign in headmates) {
    // main registry
    headmates[callsign].pk = m;
    headmates[callsign].html_name = getHTMLname(m.display_name, callsign);
  } else if (callsign.slice(-1) == "'") {
    // registered alt?
    if (callsign.slice(0, -1) in headmates) {
      let altCs = [callsign.slice(0, -1)]
      headmates[altCs].pk_alt = m;
      headmates[altCs].alt_name = getHTMLname(m.display_name, callsign);

    } else {
      // catches unassigned alts
      //console.log(callsign + ' alt found but no matching headmate?')
    }
  } else {
    // irregular headmate
    // @later handle these
    //console.log(callsign + ' not found')
  }
  updateHeadmateTile(callsign, headmates[callsign])
}


function loadFromPK() {
  console.log("Loading all members from PK");
  getAllMembers().then(d => {
    //console.log(JSON.stringify(d, null, 2))
    d.forEach(m => { checkMemberObject(m).then(addPluralKitDetails) })
  });
}
function init() {
  
  // fill in a list of all possible members
  headmates = makeInitialList()

  // add tiles for all possible members
  addAllHeadmateTiles()

  // load in info from system.js file
  exported.members.forEach(m => { addPluralKitDetails(m) });

  // load in from PK
  //loadFromPK();

  // test alts
  //flipTiles();

  updatePage(fronting);
}
init()
