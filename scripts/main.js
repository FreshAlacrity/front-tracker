// GLOBAL STORAGE
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
function keyAndIndex(id, callsign) {
  // check if ID is mapped to a member already
  if (!data.callsigns_by_id.hasOwnProperty(id)) {
    // figure out the callsign from display_name
    // iterate backwards because the default suffix is ''
    for (i = (data.setup.member.alts - 1); i >= 0; i--) {
      let suffix = data.templates.proxy_differences[i].etc.suffix;
      if (suffix.length === 0) {
        data.callsigns_by_id[id] = {
          callsign: callsign,
          proxy: i
        }
      } else if (callsign.slice(suffix.length * -1) === suffix) {
        data.callsigns_by_id[id] = {
          callsign: callsign.slice(0, suffix.length * -1),
          proxy: i
        }
      }
    }
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
  string.split('\n**').slice(1).forEach(n => {
    let pairs = n.split('**: ');
    d[pairs[0]] = pairs.slice(1).join("**: ");
  });
  return d;
}
function fusionNote(callsign) {
  if (callsign.length === 1) {
    return `Holds seat ${callsign} on our internal Council`
  } else {
    // @todo set up and pull from a list of digit display_names
    return `Temporary fusion of...`
  }
}
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
    // @todo add old name to Nicknames comment
    return p;
  })
  return m;
}
function updateFromPluralKit(pk) {
  let parts = pk.display_name.split(" ");
  let loc = keyAndIndex(pk.id, parts[0]);
  let obj = data.members[loc.callsign].proxies[loc.proxy];
  obj.pk = pk;
  obj.etc.emoji = parts[1];
  obj.etc.description = objFromDescription(pk.description);
  data.members[loc.callsign].proxies[loc.proxy] = obj;

  console.log(`Proxy ${loc.proxy} for ${parts[0]} updated: ${pk.display_name}`);
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
  let obj = makeInitialList();
  function tempFix(n) {
    return { relatives: {
        big_sibs: n.in,
        lil_sibs: n.components,
        sibs: n.siblings
      }}
  }

  for (let [cs, g] of Object.entries(obj)) {
    let m = newMemberObject(cs);
    g = tempFix(g); // @later remove
    data.members[cs] = assignDown(m, g);
  }

  console.log(pretty(data.members))
  // @todo make a function to update them from PK member lists
}
function updateDataFromMemberList() {
  // @todo remove test case:
  let clover = {
    "id": "wzgzt",
    "uuid": "260367f9-b242-43ae-8ff3-ddc3c03fbb9d",
    "name": "Clover",
    "display_name": "2 🍀 Clover 🧡 Hugs Welcome",
    "color": null,
    "birthday": "2022-05-30",
    "pronouns": "she/her, they/them",
    "avatar_url": "https://cdn.discordapp.com/attachments/982166756837707786/994839470119587941/clover_cropped.png",
    "banner": null,
    "description": "Holds seat 2 on our internal Council\n**Verbal**: occasionally\n**Descriptive**: often\n**Internal Name Translation**: the beautiful, intuitive and intimate connections between people and things\n**Nickname**: Previously 'Fennel' and before that Ivy (fusion of previous Clover and Mihaly, took her mother's name)\n**About**: Loves being to care for others and show them how they make the world a brighter place by being in it; enjoying the experience of being herself\n**Common Duties**: Encourages us to reach out to and take a chance on folk and to think on our feet, offers hugs + comfort\n**Anti-Duties/Kryptonite**: Enforcing boundaries, typing (isn't quite as fast or accurate)\n**Gifts/Care**: Touch, especially firm possessive-desiring touches and physical closeness\n**Great Compliments**: lovely, kind, caring\n**Gender Identity**: (cis)female but doesn't believe that means she should stay in a little box\n**Picrew**: https://picrew.me/image_maker/287392/complete?cd=zhOzSHU4La",
    "created": "2022-05-28T18:10:12.604415Z",
    "keep_proxy": false,
    "proxy_tags": [
      {
        "prefix": null,
        "suffix": " -2"
      },
      {
        "prefix": "2: ",
        "suffix": null
      },
      {
        "prefix": "Clover: ",
        "suffix": null
      },
      {
        "prefix": null,
        "suffix": " -Clover"
      },
      {
        "prefix": null,
        "suffix": " 🍀"
      },
      {
        "prefix": null,
        "suffix": " ☘️"
      }
    ],
    "privacy": {
      "visibility": "public",
      "name_privacy": "private",
      "description_privacy": "public",
      "birthday_privacy": "private",
      "pronoun_privacy": "public",
      "avatar_privacy": "public",
      "metadata_privacy": "public"
    }
  }
  updateFromPluralKit(clover); // @debug @todo remove
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
