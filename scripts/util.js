// GENERAL UTILITIES
function pretty(obj) {
  return JSON.stringify(obj, null, 2);
}
function quickTest(t1, t2, comment) {
  console.assert(t1 === t2, `${comment}failed: ${pretty(t1)} should be equal to ${pretty(t2)}`);
}
function oxfordCommaList(arr) {
  if (arr.length < 3) {
    return arr.join(" and ");
  } else {
    return arr.slice(0, -1).join(", ") + ", and " + arr.slice(-1);
  }
}
quickTest(oxfordCommaList([1, 2]), "1 and 2", `oxfordCommaList() for less than three entries`)
quickTest(oxfordCommaList([1, 2, 3]), "1, 2, and 3", `oxfordCommaList() for more than three entries`)
function copy(obj) { return JSON.parse(JSON.stringify(obj)) }
function assignDown(target, source) {
  // applies the properties from the source to the target, two levels down
  // assumes that the target already has all the keys the source does
  let n = copy(target);
  for (const [k1, v1] of Object.entries(copy(source))) {
    for (const [k2, v2] of Object.entries(v1)) {
      //console.log(`k1:${k1} k2:${k2} v2:${v2}`);
      n[k1][k2] = v2;
    }
  }
  return n
}
function log(info = "--------------") {
  /*
  console.groupCollapsed("log examples:")
  console.log("log");
  console.debug("debug");
  console.assert(false, "assert");
  console.dir({ fancy: { foo: 1, bar: 2 }});
  console.error("error")
  console.info("info")
  console.profile("profile")
  console.profileEnd("profile") 
  console.table([[1, 2], [3, 4]])
  console.time("time")
  console.timeEnd("time")
  console.timeLog("time")
  console.timeStamp("time stamp")
  console.trace("trace")
  console.warn("warn")
  console.groupEnd()
  */
  if (typeof info === "string") {
    console.info("%c" + info, "color: hsl(158, 50%, 30%)");
  } else {
    console.info(info);
  }
  return info;
}
function error(err) {
  console.error(err);
}
function reflow() {
  // see https://gist.github.com/paulirish/5d52fb081b3570c81e3a
  let foo = window.scrollX;
}
function remove(arr, value) {
  // source: https://stackoverflow.com/a/5767357
  var i = 0;
  while (i < arr.length) {
    if (arr[i] === value) {
      arr.splice(i, 1);
    } else {
      ++i;
    }
  }
  return arr;
}
function updateUrl(paramsObj = {}) {
  // set new url parameters
  function newUrl(paramsObj = {}) {
    // #later check to make sure there's no '#' in any of the paramsObj values
    let params = new URLSearchParams(window.location.search)
    for (const [key, value] of Object.entries(paramsObj)) {
      if (value !== '') {
        let encodedKey = encodeURIComponent(key, "UTF-8");
        let encodedVal = encodeURIComponent(value, "UTF-8");
        params.set(encodedKey, encodedVal);
      } else {
        params.delete(key)
      }
    }
    return `${window.location.origin}${window.location.pathname}?${params.toString()}`
  }
  // #later learn how/where the state information (here {}) can be accessed
  window.history.replaceState({}, 'New Page Title Here #todo', newUrl(paramsObj))
}
function paramValue(urlParams, key) {
  // decodes the encoding that updateUrl uses
  // see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/decodeURIComponent
  return decodeURIComponent(urlParams.get(key).replace(/\+/g, " "));
}
function splitByEach(string, breakAt = ", ") {
  let br = '<!split!>'
  return replaceEach(string, breakAt, br).split(br).filter(a => (a !== ''));
}
function regExEscape(string) {
  // via https://makandracards.com/makandra/15879-javascript-how-to-generate-a-regular-expression-from-a-string
  return string.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
}
function replaceEach(string, charsString, replaceWith = '') {
  charsString.split('').forEach(c => { string = string.replaceAll(c, replaceWith) });
  return string;
}
function occurs(string, substring) {
  let regex = new RegExp(regExEscape(substring), 'g')
  let matches = string.match(regex)
  if (matches) { return matches.length } else { return 0 }
}
function seeded(s) {
  // very much not actually random, but that's ok!
  // via https://stackoverflow.com/a/23304189
  // usage:
  // var random1 = seeded(42);
  // var random2 = seeded(random1());
  // Math.random = seeded(random2());
  // ^ that last may cause serious issues but could also be handy  
  return function () {
    // tinkering with the number of 0s can tweak the distribution
    s = Math.sin(s) * 10000; return s - Math.floor(s);
  };
};

// = Ordering =
function digits() {
  let arr = []
  for (a = 1; a <= 9; a++) {
    arr.push(a + '')
  }
  arr.push('*')
  return arr;
}
function digitIndex(d) {
  return digits().indexOf(d + '');
}
function sortCallsign(callsign) {
  // sorts digits within a callsign
  let key = callsign + '';
  if (key.length > 1) {
    key = sortByCallsign(key.split('')).join('');
  }
  return key;
}
function sortByCallsign(arr) {
  // sorts and deduplicates a callsign list
  function compare(x, y) {
    function c(d, i) {
      return digitIndex((d + '').charAt(i));
    }
    if (x.length !== y.length) { 
      return x.length - y.length; 
    } else {
      for(i = 0; i <= x.length; i++){
        if (c(x, i) !== c(y, i)) { 
          return c(x, i) - c(y, i);
        }
      }
      return 0;
    }
  }
  return [...new Set(arr)].sort(compare);
}

function getMemberList() {
  return sortByCallsign(Object.keys(data.structure.relatives));
}

// = Find Individual Member Data =
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
function discordStringFromObj(d) {
  let string = '';
  for ([key, value] of Object.entries(d)) {
    string += `\n**${key}**: ${value}`;
  }
  return string;
}
function updatedDescription(pk) {
  return fusionNote(getCallsign(pk)) + discordStringFromObj(objFromDescription(pk.description));
}
function newMemberPkFromCallsign(callsign) {
  // #todo add defaults for alt accounts also  
  // if alt, add a parenthetical to name with nickname from main
  // #todo if alt has same name as main, add the alt suffix after the pk.name to avoid duplicates
  if (isMainProxy(callsign)) {
    return {
      name: callsign,
      display_name: `${callsign} | Unnamed`,
      pronouns: 'they/them',
      "proxy_tags": [
        { "prefix": null, "suffix": " -" + callsign },
        { "prefix": callsign + ": ", "suffix": null }
      ],
      "privacy": {
        "name_privacy": "private",
      },
      description: fusionNote(callsign)
    }
  } else {
    // alt account
    let main = getPkObject(mainCallsign(callsign));
    // #todo

  }
}
function getPkObject(callsign) {
  if (data.members_by_callsign.hasOwnProperty(callsign)) {
    // #todo figure out why the copy() is needed/if it helps
    return copy(data.members_by_callsign[callsign]);
  } else {
    return newMemberPkFromCallsign(callsign);
  }
}
function idFromCallsign(callsign) {
  if (data.members_by_callsign.hasOwnProperty(callsign)) {
    return data.members_by_callsign[callsign].id;
  } else {
    return undefined
  }
}
function callsignFromNickname(nickname) {
  // later also find close matches
  return data.callsigns_by_name[nickname.toLowerCase()];
}
function getCallsign(pk) {
  let callsign = (pk.display_name || pk.name).split(" ")[0];
  return callsign.replace('-', '') // for Altar etc
}
function mainCallsign(callsign) {
  // #todo check this is working
  data.structure.proxies.forEach(s => {
    callsign = callsign.replaceAll(s, '');
  });
  return callsign;
}
function getEmoji(pk) {
  if (pk.display_name) {
    let e = pk.display_name.split(" ")[1];
    if (e !== "|") { return e }
  }
  return ''
}
function getNickname(pk) {
  let nickname = "Unknown";
  if (pk.display_name) {
    nickname = pk.display_name;
  } else if (pk.name) {
    nickname = pk.name
  }
  let parts = nickname.split(" ");
  function shortNameFromLong() {
    let short = ''
    if (parts[2]) {
      short += parts[2]
      // it's really just Sweet William with a space in his name rn
      let isWord = /^\w+$/ // or /\w/ if we want parentheticals
      if (parts[3] && isWord.test(parts[3])) {
        short += ' ' + parts[3];
      }
    }
    return short
  }
  return shortNameFromLong()
}
function getAvatarURL(pk) {
  if (pk.avatar_url && pk.avatar_url !== "null") {
    return pk.avatar_url;
  } else {
    // #later find better default image
    return 'https://cdn.discordapp.com/attachments/982166756837707786/982761923667976242/web.png';
  }
}
function getBgColor(cs) {
  //let pk = getPkObject(cs);
  //if (pk.name.name) {
    // #todo troubleshoot this and close the GitHub issue
    //log(pretty(pk))
  //}
  // if (pk && pk.color && pk.color !== "null") {
    //return "#" + pk.color;
  //} else {
    let baseHue = [];
    function colorFromCallsign(cs) {
      return Math.floor(seeded(cs)() * 361)
    }
    // #later set color 'homes' per digit
    // and average the hue values?
    let hue = colorFromCallsign(cs)
    return `hsl(${hue}, 20%, 40%)`;
  //}
}
function getSideSibsList(cs) {
  let h = data.structure.relatives;
  return h[cs].sibs.reverse();
}
function getAllSibsList(cs) {
  let h = data.structure.relatives;
  if (!h.hasOwnProperty(cs)) { 
    log(cs + " has no sibling entry") 
    return [];
  } else {
    let all = [].concat(h[cs].sibs, h[cs].lil_sibs, h[cs].big_sibs);
    return sortByCallsign(all).reverse();
  }
}
function isMainProxy(callsign) {  
  return (callsign == mainCallsign(callsign));
}

// = Plugging in Data =
function getToggle(string) {
  return document.getElementById("toggle-" + string).checked;
}
function updateNameList(name, callsign) {
  // #todo use this when renaming members also
  let nick = name.toLowerCase();
  let previous = callsignFromNickname(nick);
  if (previous && previous !== callsign) {
    // this should never happen, but just in case:
    error(`Name '${nick}' (${callsign}) already belongs to another member with callsign ${previous}:`);
    log(pretty(getPkObject(previous)));
  } else {
    data.callsigns_by_name[nick] = callsign;
  }
}
function updatePkInfo(pk, noSave = false) {
  pk = checkMemberObject(pk);
  let callsign = getCallsign(pk);
  data.callsigns_by_id[pk.id] = callsign;
  if (pk.name) { updateNameList(pk.name, callsign) }
  data.members_by_callsign[callsign] = pk;
  if (!noSave) {
    //log(`Saving member to localForage: ${pk.id}`)
    localforage.setItem(pk.id, pk).catch(err => error);    
  }
}
function namesListToCallsigns(string, doAlert = false) {
  // called with active input, usually from the text box but also URL params

  function plain(string) { return replaceEach(string, "+-") };

  // split into an array and substitute in callsigns for names
  let arr = splitByEach(string, ",.~ ;:/").map(entry => {     
    let match = callsignFromNickname(plain(entry));
    if (match) {
      return entry.replace(plain(entry), match);
    } else {
      return entry
    }
  });

  let all = getMemberList();
  let notMembers = arr.filter(cs => !all.includes(plain(cs)));
  if (notMembers.length > 0) {
    // currently can cause a softlock if using alert()
    showMessage(`These are not registered member(s): ${notMembers.join(", ")}`);
  }
  return sortByCallsign(arr.filter(cs => all.includes(plain(cs)))); // does this need to be sorted?
}
function getActive(doAlert) {
  return namesListToCallsigns(data.page.active_list.value, doAlert)
}
async function updateDataFromMemberList(list = exported.members) {
  console.groupCollapsed("Updating from member list:");

  list.forEach(updatePkInfo);

  console.groupEnd();
}
