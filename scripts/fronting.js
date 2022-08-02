console.clear(); // for debugging, remove @later

const hexVals = [
"#B0171F",
"#DC143C",
"#FFB6C1",
"#FFAEB9",
"#EEA2AD",
"#CD8C95",
"#8B5F65",
"#FFC0CB",
"#FFB5C5",
"#EEA9B8",
"#CD919E",
"#8B636C",
"#DB7093",
"#FF82AB",
"#EE799F",
"#CD6889",
"#8B475D",
"#FFF0F5",
"#EEE0E5",
"#CDC1C5",
"#8B8386",
"#FF3E96",
"#EE3A8C",
"#CD3278",
"#8B2252",
"#FF69B4",
"#FF6EB4",
"#EE6AA7",
"#CD6090",
"#8B3A62",
"#872657",
"#FF1493",
"#EE1289",
"#CD1076",
"#8B0A50",
"#FF34B3",
"#EE30A7",
"#CD2990",
"#8B1C62",
"#C71585",
"#D02090",
"#DA70D6",
"#FF83FA",
"#EE7AE9",
"#CD69C9",
"#8B4789",
"#D8BFD8",
"#FFE1FF",
"#EED2EE",
"#CDB5CD",
"#8B7B8B",
"#FFBBFF",
"#EEAEEE",
"#CD96CD",
"#8B668B",
"#DDA0DD",
"#EE82EE",
"#FF00FF",
"#EE00EE",
"#CD00CD",
"#8B008B",
"#800080",
"#BA55D3",
"#E066FF",
"#D15FEE",
"#B452CD",
"#7A378B",
"#9400D3",
"#9932CC",
"#BF3EFF",
"#B23AEE",
"#9A32CD",
"#68228B",
"#4B0082",
"#8A2BE2",
"#9B30FF",
"#912CEE",
"#7D26CD",
"#551A8B",
"#9370DB",
"#AB82FF",
"#9F79EE",
"#8968CD",
"#5D478B",
"#483D8B",
"#8470FF",
"#7B68EE",
"#6A5ACD",
"#836FFF",
"#7A67EE",
"#6959CD",
"#473C8B",
"#F8F8FF",
"#E6E6FA",
"#0000FF",
"#0000EE",
"#0000CD",
"#00008B",
"#000080",
"#191970",
"#3D59AB",
"#4169E1",
"#4876FF",
"#436EEE",
"#3A5FCD",
"#27408B",
"#6495ED",
"#B0C4DE",
"#CAE1FF",
"#BCD2EE",
"#A2B5CD",
"#6E7B8B",
"#778899",
"#708090",
"#C6E2FF",
"#B9D3EE",
"#9FB6CD",
"#6C7B8B",
"#1E90FF",
"#1C86EE",
"#1874CD",
"#104E8B",
"#F0F8FF",
"#4682B4",
"#63B8FF",
"#5CACEE",
"#4F94CD",
"#36648B",
"#87CEFA",
"#B0E2FF",
"#A4D3EE",
"#8DB6CD",
"#607B8B",
"#87CEFF",
"#7EC0EE",
"#6CA6CD",
"#4A708B",
"#87CEEB",
"#00BFFF",
"#00B2EE",
"#009ACD",
"#00688B",
"#33A1C9",
"#ADD8E6",
"#BFEFFF",
"#B2DFEE",
"#9AC0CD",
"#68838B",
"#B0E0E6",
"#98F5FF",
"#8EE5EE",
"#7AC5CD",
"#53868B",
"#00F5FF",
"#00E5EE",
"#00C5CD",
"#00868B",
"#5F9EA0",
"#00CED1",
"#F0FFFF",
"#E0EEEE",
"#C1CDCD",
"#838B8B",
"#E0FFFF",
"#D1EEEE",
"#B4CDCD",
"#7A8B8B",
"#BBFFFF",
"#AEEEEE",
"#96CDCD",
"#668B8B",
"#2F4F4F",
"#97FFFF",
"#8DEEEE",
"#79CDCD",
"#528B8B",
"#00FFFF",
"#00EEEE",
"#00CDCD",
"#008B8B",
"#008080",
"#48D1CC",
"#20B2AA",
"#03A89E",
"#40E0D0",
"#808A87",
"#00C78C",
"#7FFFD4",
"#76EEC6",
"#66CDAA",
"#458B74",
"#00FA9A",
"#F5FFFA",
"#00FF7F",
"#00EE76",
"#00CD66",
"#008B45",
"#3CB371",
"#54FF9F",
"#4EEE94",
"#43CD80",
"#2E8B57",
"#00C957",
"#BDFCC9",
"#3D9140",
"#F0FFF0",
"#E0EEE0",
"#C1CDC1",
"#838B83",
"#8FBC8F",
"#C1FFC1",
"#B4EEB4",
"#9BCD9B",
"#698B69",
"#98FB98",
"#9AFF9A",
"#90EE90",
"#7CCD7C",
"#548B54",
"#32CD32",
"#228B22",
"#00FF00",
"#00EE00",
"#00CD00",
"#008B00",
"#008000",
"#006400",
"#308014",
"#7CFC00",
"#7FFF00",
"#76EE00",
"#66CD00",
"#458B00",
"#ADFF2F",
"#CAFF70",
"#BCEE68",
"#A2CD5A",
"#6E8B3D",
"#556B2F",
"#6B8E23",
"#C0FF3E",
"#B3EE3A",
"#9ACD32",
"#698B22",
"#FFFFF0",
"#EEEEE0",
"#CDCDC1",
"#8B8B83",
"#F5F5DC",
"#FFFFE0",
"#EEEED1",
"#CDCDB4",
"#8B8B7A",
"#FAFAD2",
"#FFFF00",
"#EEEE00",
"#CDCD00",
"#8B8B00",
"#808069",
"#808000",
"#BDB76B",
"#FFF68F",
"#EEE685",
"#CDC673",
"#8B864E",
"#F0E68C",
"#EEE8AA",
"#FFFACD",
"#EEE9BF",
"#CDC9A5",
"#8B8970",
"#FFEC8B",
"#EEDC82",
"#CDBE70",
"#8B814C",
"#E3CF57",
"#FFD700",
"#EEC900",
"#CDAD00",
"#8B7500",
"#FFF8DC",
"#EEE8CD",
"#CDC8B1",
"#8B8878",
"#DAA520",
"#FFC125",
"#EEB422",
"#CD9B1D",
"#8B6914",
"#B8860B",
"#FFB90F",
"#EEAD0E",
"#CD950C",
"#8B6508",
"#FFA500",
"#EE9A00",
"#CD8500",
"#8B5A00",
"#FFFAF0",
"#FDF5E6",
"#F5DEB3",
"#FFE7BA",
"#EED8AE",
"#CDBA96",
"#8B7E66",
"#FFE4B5",
"#FFEFD5",
"#FFEBCD",
"#FFDEAD",
"#EECFA1",
"#CDB38B",
"#8B795E",
"#FCE6C9",
"#D2B48C",
"#9C661F",
"#FF9912",
"#FAEBD7",
"#FFEFDB",
"#EEDFCC",
"#CDC0B0",
"#8B8378",
"#DEB887",
"#FFD39B",
"#EEC591",
"#CDAA7D",
"#8B7355",
"#FFE4C4",
"#EED5B7",
"#CDB79E",
"#8B7D6B",
"#E3A869",
"#ED9121",
"#FF8C00",
"#FF7F00",
"#EE7600",
"#CD6600",
"#8B4500",
"#FF8000",
"#FFA54F",
"#EE9A49",
"#CD853F",
"#8B5A2B",
"#FAF0E6",
"#FFDAB9",
"#EECBAD",
"#CDAF95",
"#8B7765",
"#FFF5EE",
"#EEE5DE",
"#CDC5BF",
"#8B8682",
"#F4A460",
"#C76114",
"#D2691E",
"#FF7F24",
"#EE7621",
"#CD661D",
"#8B4513",
"#292421",
"#FF7D40",
"#FF6103",
"#8A360F",
"#A0522D",
"#FF8247",
"#EE7942",
"#CD6839",
"#8B4726",
"#FFA07A",
"#EE9572",
"#CD8162",
"#8B5742",
"#FF7F50",
"#FF4500",
"#EE4000",
"#CD3700",
"#8B2500",
"#5E2612",
"#E9967A",
"#FF8C69",
"#EE8262",
"#CD7054",
"#8B4C39",
"#FF7256",
"#EE6A50",
"#CD5B45",
"#8B3E2F",
"#8A3324",
"#FF6347",
"#EE5C42",
"#CD4F39",
"#8B3626",
"#FA8072",
"#FFE4E1",
"#EED5D2",
"#CDB7B5",
"#8B7D7B",
"#FFFAFA",
"#EEE9E9",
"#CDC9C9",
"#8B8989",
"#BC8F8F",
"#FFC1C1",
"#EEB4B4",
"#CD9B9B",
"#8B6969",
"#F08080",
"#CD5C5C",
"#FF6A6A",
"#EE6363",
"#8B3A3A",
"#CD5555",
"#A52A2A",
"#FF4040",
"#EE3B3B",
"#CD3333",
"#8B2323",
"#B22222",
"#FF3030",
"#EE2C2C",
"#CD2626",
"#8B1A1A",
"#FF0000",
"#EE0000",
"#CD0000",
"#8B0000",
"#800000",
"#8E388E",
"#7171C6",
"#7D9EC0",
"#388E8E",
"#71C671",
"#8E8E38",
"#C5C1AA",
"#C67171"  
];

let baseNum = 9;
let cap = 4; // n-fusion maximum
let totalNum = 0;
let fronting = [];
let headmates = {};

// @later fetch by ID from HTML
let container = document.createElement("div");
container.classList.add("container");
document.body.appendChild(container);

// @todo change to search box, move to top
let note = document.createElement("div");
note.classList.add("note");
document.body.appendChild(note);


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
  return [...new Set(arr)].sort(function(x, y) {
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

function onClick(event) {
  
  function unmerge(callsign) {
    callsign.split('').forEach(d => {        
      setStatus(d, "present", true);
    });
    setStatus(callsign, "present", false);  
  }

  function toggleOn(callsign) {
    setStatus(callsign, "present", true);
    
    // for digits:
    setStatus(callsign, "resting", false);
    
    // make sure only headmates that can coexist are present:
    let bigSibs = headmates[callsign].in;
    let lilSibs = headmates[callsign].components;  
    let sideSibs = headmates[callsign].siblings;
    let all = [].concat(sideSibs, lilSibs, bigSibs);
    all = sortByCallsign(all).reverse();
    all.forEach(s => {
      if (s.length > 1 && checkStatus(s, "present")) {
        unmerge(s);
      }
      setStatus(s, "present", false);
    });
  }

  function toggleOff(callsign) {
    setStatus(callsign, "present", false);  
    if (callsign.length == 1) {
      setStatus(callsign, "resting", true); 
    } else {
      unmerge(callsign);
    }
  }
  
  // update headmate statuses
  let cs = event.target.id.slice("tile-".length);
  if (event.target.classList.contains("present")) {
    toggleOff(cs);
  } else {
    toggleOn(cs);
  }
   
  // reset availability
  bulkSetStatus(Object.keys(headmates), "available", true)
  
  // deprioritize/show with less emphasis the headmates who cannot (also) be present
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
  
  for (const [callsign, value] of Object.entries(headmates)) {
    let e = elementByCallsign(callsign);
    e.classList.toggle("available", value.status.available);
    e.classList.toggle("present", value.status.present);    
    e.style.order = sortOrder(callsign, value);
  }
  
  // output front signature
  fronting = [];
  for (const [callsign, value] of Object.entries(headmates)) {
    if (value.status.present) {
      fronting.push(callsign);
    }
  }
  fronting = sortByCallsign(fronting);
  
  note.textContent = `${totalNum} shown & fronting: ${fronting.join(', ')}`;
}

function addPluralKitDetails() {
  exported.members.forEach(m => {
    let callsign = ''
    if (m.display_name) {
      callsign = m.display_name.split(" ")[0]
    } else if (parseInt(m.name)) {
      callsign = m.name
    }

    callsign = callsign.replace('-','')

    if (callsign in headmates) {
      // main registry
      headmates[callsign].pk = m;
    } else if (callsign.slice(-1) == "'") {
      // registered alt?
      if (callsign.slice(0, -1) in headmates) {
        headmates[callsign.slice(0, -1)].pk_alt = m;
      } else {
        //console.log(callsign + ' alt found but no matching headmate?')
      }
    } else {
      // irregular headmate
      // @later handle these
      //console.log(callsign + ' not found')
    }
  })
}
function getDisplayname(callsign) {
  // @later maybe set this up another way?
  // it's really just Sweet William with a space in his name
  let m = headmates[callsign];
  if (m && m.pk && m.pk.display_name) {
    let parts = m.pk.display_name.split(' ')
    let isWord = /^\w+$/ // /\w/ // for if we want parentheticals
    if (parts[3] && isWord.test(parts[3])) {
      return parts.slice(0, 4).join(' ')
    } else {
      return parts.slice(0, 3).join(' ')
    }
  } else {
    return callsign + ''
  }
}
function getAvatarURL(callsign) {
  let m = headmates[callsign];
  if (m && m.pk && m.pk.avatar_url) {
    return m.pk.avatar_url
  } else {
    return ''
  }
}
function getMemberPageURL() {
  // @todo
}
function addHeadmateTile(num, headmate) {
  function makeCoin() {    
    let coin = document.createElement("div");
    coin.addEventListener("click", onClick);
    coin.classList.add("flip-coin");
    coin.id = "tile-" + num;
    if (headmate.status.present) {
      coin.style.order = num.length;
      coin.classList.add("present");
      coin.classList.add("available");
    } else {
      coin.style.order = sortOrder(num, headmate);
      coin.classList.add("available");
    }
    container.appendChild(coin);
    
    let coinFaces = document.createElement("div");
    coinFaces.classList.add("flip-coin-inner");
    coin.appendChild(coinFaces);
    return coinFaces;
  }
  function coinFace(type = "front") {
    let coinFront = document.createElement("div");
    coinFront.classList.add("flip-coin-" + type);
    
    let icon = document.createElement("div");
    icon.classList.add("icon");
    icon.style.backgroundColor = hexVals[(num * 61) % hexVals.length];  
    coinFront.appendChild(icon);
    coinFront.title = num;
      
    let name = document.createElement("div");
    name.classList.add("name");  
    name.textContent = num;
    
    name.innerHTML = getDisplayname(num)
    coinFront.appendChild(name);

    icon.style.backgroundImage = `url('${getAvatarURL(num)}')`  
    coinFront.title += '\n' + status;
    return coinFront;
  }
    
  let coin = makeCoin();
  coin.appendChild(coinFace("front"));
  coin.appendChild(coinFace("back"));
}
function addAllHeadmateTiles() {
  for (const [callsign, value] of Object.entries(headmates)) {
    addHeadmateTile(callsign, value)
  }
}

// sorts digits within a callsign
function sortCallsign(callsign) {
  let key = callsign + '';
  if (key.length > 1) {
    key = sortByCallsign(key.split('')).join('');
  }
  return key;
}

// populate the headmates object and return # generated
function fillInHeadmates() {
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
  
  return count;
}

function init() {
  totalNum = fillInHeadmates()
  addPluralKitDetails()
  addAllHeadmateTiles()
  note.textContent = `${totalNum} shown & fronting: ${fronting.join(', ')}`
}
init()

// make a printout to check values
function printDetails(printIf = [1, 12]) {
  let printout = `-------------------\n\n`;
  printIf.forEach(a => {
    printout += `Callsign: ${a}\n\n`
    if (headmates[a + '']) {
      for (const [key, value] of Object.entries(headmates[a + ''])) {
        if (value.length > 0) {
          printout += `${key}: ${value.join(', ')}\n\n`;
        }
      }
    } else {
      printout += `not found\n\n`;
    }
    printout += `-------------------\n\n`;
  });
  console.log(printout);
}
//printDetails()

