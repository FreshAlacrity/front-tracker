// GLOBAL STORAGE
// keep total storage under 700 mb (including all the files)
var data = {
  page: {
    container: document.getElementById("fronters"),
  },
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
      relatives: {
        big_sibs: [],
        lil_sibs: [],
        sibs: []
      }
    },
    proxy_differences: [
      // @todo add privacy differences for pk
      { etc: { suffix: '' } },
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
        description: {
          Picrew: ''
        }
      }
    }
  },
  members: {},
  callsigns_by_id: {}
}


// MATCHING + FETCHING
function getLoc(id, cs) {
  // check if ID is mapped to a member already
  if (!data.callsigns_by_id.hasOwnProperty(id)) {
    // figure out the callsign from display_name
    // iterate backwards because the default suffix is ''
    // @later make this a separate function
    for (i = (data.setup.member.alts - 1); i >= 0; i--) {
      let suffix = data.templates.proxy_differences[i].etc.suffix;
      if (suffix.length === 0) {
        // @later check if the member is entirely private and if so set to 2nd proxy
        data.callsigns_by_id[id] = {
          callsign: cs,
          proxy: i + 0
        }
      } else if (cs.slice(suffix.length * -1) === suffix) {
        cs = cs.slice(0, cs.length - suffix.length)
        data.callsigns_by_id[id] = {
          callsign: cs,
          proxy: i
        }
        break;
      }
    }
  }
  
  if (!data.members.hasOwnProperty(cs)) {
    // callsign isn't part of the generated/existing set
    console.warn(`Unconventional callsign added: ${cs} (id: ${id})`)
    data.members[cs] = newMemberObject(cs);
  }
  return data.callsigns_by_id[id]
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
function objFromDescription(string) {
  let d = {};
  if (string) {
    string.split('\n**').slice(1).forEach(n => {
      let pairs = n.split('**: ');
      d[pairs[0]] = pairs.slice(1).join("**: ");
    });
  }
  return d;
}
function fusionNote(callsign) {
  // @todo later check + update these automatically
  let names = ["1 ☸️ Moth", "2 🍀 Clover", "3 🧮 Val", "4 🏗️ Kent", "5 🐏 Faun", "6 🤝 Ruth", "7 🎇 Lucky", "8 📜 Giles", "9 🌑 Thorn"];
  if (new RegExp(/^\d+$/).test(callsign)) {
    if (callsign.length === 1) {
      return `Holds seat ${callsign} on our internal Council`
    } else {
      // @todo set up and pull from a list of digit display_names
      return `Temporary fusion of ` + oxfordCommaList((callsign+'').split('').map(a => names[parseInt(a-1)]));
    }
  } else {
    return "Unconventional headmate";
  }
}
quickTest(fusionNote("E"), "Unconventional headmate", "No digit fusionNote() test");
quickTest(fusionNote("6"), "Holds seat 6 on our internal Council", "One digit fusionNote() test");
quickTest(fusionNote(24), "Temporary fusion of 2 🍀 Clover and 4 🏗️ Kent", "Two digit fusionNote() test");
quickTest(fusionNote(246), "Temporary fusion of 2 🍀 Clover, 4 🏗️ Kent, and 6 🤝 Ruth", "Three digit fusionNote() test");
 // @later add versions for alt proxies?

function discordStringFromObj(d) {
  let string = '';
  for ([key, value] of Object.entries(d)) {
    string += `\n**${key}**: ${value}`;
  }
  return string;
}
function updateMainDescription(p) {
  p.pk.description = fusionNote(p.etc.callsign) + discordStringFromObj(p.etc.description);
  return p;
}
function updateProxies(m) {
  m.proxies.map(p => {
    p = updateDisplayName(p);
    p = updateRequiredProxyTags(p);
    // @todo when renaming if old name is not Unnamed:
    // add old name to Nicknames comment
    // add old name parenthetically to display_name
    return p;
  })
  return m;
}

async function updateFromPluralKit(pk) {
  let parts = pk.display_name.split(" ");  
  let loc = getLoc(pk.id, parts[0]);
  pk = validatePK(pk, loc);
  let obj = data.members[loc.callsign].proxies[loc.proxy];
  obj.pk = pk;
  obj.etc.emoji = parts[1]; // note that may not be accurate to all members
  if (pk.description) {
    // @later each proxy layer should have a description set up in the validation step
    obj.etc.description = objFromDescription(pk.description);
  }
  data.members[loc.callsign].proxies[loc.proxy] = obj;
  log(`${pk.display_name} updated (p${loc.proxy})`);
  // @todo update the html object, if found
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
  function tempFix(n) {
    return { relatives: {
        big_sibs: n.in,
        lil_sibs: n.components,
        sibs: n.siblings
      }}
  }
  for (let [cs, g] of Object.entries(makeInitialList())) {
    let m = newMemberObject(cs);
    g = tempFix(g); // @later remove
    data.members[cs] = assignDown(m, g);
  }
}
async function updateDataFromMemberList(list = exported.members) {
  console.groupCollapsed("Updating from member list:")
  list.forEach(m => {
    updateFromPluralKit(m);
    });
  console.groupEnd()
}

// @later move to init()
dataStructureSetup();
updateDataFromMemberList();


// OLD
var headmates = {};
var container = data.page.container;
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

function updateFromPk(m, autofix = false) {
  function getCallsign(m) {
    let callsign = m.display_name.split(" ")[0];
    return callsign.replace('-', '') // for Altar etc
  }
  let callsign = getCallsign(m);

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
    d.forEach(m => { checkMemberObject(m).then(updateFromPk) });
  }).then(d => {
    // #todo print data to console

  });
}

function init() {

  // fill in a list of all possible members
  headmates = makeInitialList()

  // add tiles for all possible members
  addAllHeadmateTiles()

  // load in info from system.js file
  exported.members.forEach(m => { updateFromPk(m) });

  // load in from PK
  //loadFromPK();

  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.has('alts') === true) {
    flipTiles();
  }

  updatePage();

  // until there's a tidy way to do this:
  // rn just sets up number proxies and temp fusion description
  //newMember("149");
}
init()
