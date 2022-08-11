var data = {
  setup: {
    member: {
      alts: 3,
    }
  },
  templates: {
    member: {
      // @todo where to store callsign?
      proxies: [],
      status: {
        // @todo
        available: true,
        present: false, // @later rename active
        stable: false, // @later
        resting: false, // @later
        named: false, // @todo
      },
      relatives: {}
    },
    proxy_differences: [
      { etc: { suffix: ''  } },
      { etc: { suffix: "'" } },
      { etc: { suffix: '"' } },
    ],
    proxy: {
      pk: {
        name: "Unnamed",
        proxy_tags: []
      },
      etc: {
        emoji: '|',
        suffix: '',
        picrew: ''
      }
    }
  },
  members: {},
  callsigns_by_id: {}
}

// UPDATING
function updateDisplayName(n) {
  n.pk.display_name = `${n.etc.callsign + n.etc.suffix} ${n.etc.emoji} ${n.pk.name}`;
  return n;
}
function newProxyTag(prefix = null, suffix = null) {
  return { "prefix": prefix, "suffix": suffix }
}
function checkProxyTags(p) {
  // @todo deduplicate
  // @later make sure these proxies do not conflict with any other members'
  return p
}
function updateRequiredProxyTags(p) {
  function addProxyTag(a, b) { p.pk.proxy_tags.push(newProxyTag(a, b)) }
  addProxyTag(null, ` -${p.etc.callsign + p.etc.suffix}`);
  addProxyTag(`${p.etc.callsign + p.etc.suffix}: `);
  if (p.pk.name !== data.templates.proxy.pk.name) {
    addProxyTag(null, ` -${p.etc.callsign + p.etc.suffix}`);
    addProxyTag(`${p.etc.callsign + p.etc.suffix}: `);
  }
  return checkProxyTags(p);
}
function updateProxies(m) {
  m.proxies.map(p => {
    p = updateDisplayName(p);
    p = updateRequiredProxyTags(p);
    return p;
  })
  return m;
}

// INIT
function newMemberObject(callsign) {
  let dT = data.templates;
  let newObj = copy(dT.member);
  for (i = 0; i < data.setup.member.alts; i++) {    
    let n = copy(dT.proxy);
    n = assignDown(n, dT.proxy_differences[i]);
    n.etc.callsign = callsign;
    n.etc.index = i;
    newObj.proxies.push(n);
  }

  return updateProxies(newObj);
}
function dataStructureSetup() {
  console.log(pretty(newMemberObject(2)));
  // @todo make list
  // @todo make new member objects
  // @todo validate them (to create display names etc)
}
dataStructureSetup(); // @todo move to init()


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
    num += (20 ** 10);
  } else if (!headmate.status.present) {
    num += (10 ** 10);
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

function listFronters() {
  let fronting = [];
  for (const [callsign, value] of Object.entries(headmates)) {
    if (value.status.present) { fronting.push(callsign) }
  }
  return sortByCallsign(fronting);
}
function updatePage() {
  // @todo update url with active fronters too  
  note.value = listFronters().join(", ");
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

  updatePage();
}

function addPluralKitDetails(m, autofix = false) {
  let callsign = m.display_name.split(" ")[0];
  callsign = callsign.replace('-', '') // for Altar etc

  if (callsign in headmates) {
    // main registry
    headmates[callsign].pk = m;
  } else if (callsign.slice(-1) === "'") {
    // registered alt?
    callsign = [callsign.slice(0, -1)]
    if (callsign in headmates) {
      headmates[callsign].pk_alt = m;
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

  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.has('alts') === true) {
    flipTiles();
  }

  updatePage();
}
init()
