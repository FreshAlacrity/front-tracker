// GENERAL UTILITIES
function pretty (obj) {
  return JSON.stringify(obj, null, 2);
}
function quickTest (t1, t2, comment) {
  console.assert(t1 === t2, `${comment}failed: ${pretty(t1)} should be equal to ${pretty(t2)}`);
}
function oxfordCommaList (arr) {
  if (arr.length < 3) {
    return arr.join(" and ");
  } else {
    return arr.slice(0, -1).join(", ") + ", and " + arr.slice(-1);
  }
}
quickTest(oxfordCommaList([1, 2]), "1 and 2", `oxfordCommaList() for less than three entries`)
quickTest(oxfordCommaList([1, 2, 3]), "1, 2, and 3", `oxfordCommaList() for more than three entries`)
function intersect(a, b) {
  // Return elements of array a that are also in b in linear time:
  // via https://stackoverflow.com/a/43820518
  return a.filter(Set.prototype.has, new Set(b));
}
function copy (obj) { return JSON.parse(JSON.stringify(obj)) }
function assignDown (target, source) {
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
function log (info = "--------------") {
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
function error (err) {
  console.error(err);
}
function reflow () {
  // see https://gist.github.com/paulirish/5d52fb081b3570c81e3a
  let foo = window.scrollX;
}
function remove (arr, value) {
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
function updateUrl (paramsObj = {}) {
  // set new url parameters
  function newUrl (paramsObj = {}) {
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
  //window.history.replaceState({}, 'New Page Title Here #todo', newUrl(paramsObj)) #todo this causes error
}
function paramValue (urlParams, key) {
  // decodes the encoding that updateUrl uses
  // see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/decodeURIComponent
  return decodeURIComponent(urlParams.get(key).replace(/\+/g, " "));
}
function splitByEach (string, breakAt = ", ") {
  let br = '<!split!>'
  return replaceEach(string, breakAt, br).split(br).filter(a => (a !== ''));
}
function regExEscape (string) {
  // via https://makandracards.com/makandra/15879-javascript-how-to-generate-a-regular-expression-from-a-string
  return string.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
}
function replaceEach (string, charsString, replaceWith = '') {
  charsString.split('').forEach(c => { string = string.replaceAll(c, replaceWith) });
  return string;
}
function occurs (string, substring) {
  let regex = new RegExp(regExEscape(substring), 'g')
  let matches = string.match(regex)
  if (matches) { return matches.length } else { return 0 }
}
function seeded (s) {
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
function digits () {
  let arr = []
  for (a = 1; a <= 9; a++) {
    arr.push(a + '')
  }
  arr.push('*')
  return arr;
}
function digitIndex (d) {
  return digits().indexOf(d + '');
}
function sortCallsign (callsign) {
  // sorts digits within a callsign
  let key = callsign + '';
  if (key.length > 1) {
    key = sortByCallsign(key.split('')).join('');
  }
  return key;
}
function sortByCallsign (arr) {
  // sorts and deduplicates a callsign list
  function compare (x, y) {
    function c (d, i) {
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

// Previously returned a list of callsigns
// Now returns a list of PK IDs instead
function getMemberList () {
  return Object.keys(data.members_by_id);
}

// = Find Individual Member Data =
function objFromDescription (string) {
  let d = {};
  if (string) {
    string.split('\n**').slice(1).forEach(n => {
      let pairs = n.split('**: ');
      d[pairs[0]] = pairs.slice(1).join("**: ");
    });
  }
  return d;
}
function discordStringFromObj (d) {
  let string = '';
  for ([key, value] of Object.entries(d)) {
    string += `\n**${key}**: ${value}`;
  }
  return string;
}
function updatedDescription (pk) {
  // #todo update
  return fusionNote(getCallsign(pk)) + discordStringFromObj(objFromDescription(pk.description));
}
function newMemberPkFromCallsign (callsign) {
  // #todo update
  // #todo add defaults for alt accounts also  
  // if alt, add a parenthetical to name with nickname from main
  // #todo if alt has same name as main, add the alt suffix after the pk.name to avoid duplicates
  if (isMainProxy(callsign)) {
    return {
      name: callsign,
      display_name: `${callsign} | Unnamed`,
      pronouns: 'they/them',
      "proxy_tags": [
        { "prefix": null, "suffix": " -" + callsign }
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
function getPkObject (pkId) {
  if (data.members_by_id.hasOwnProperty(pkId)) {
    // #todo figure out why the copy() is needed/if it helps
    return copy(data.members_by_id[pkId]);
  } else {
    return newMemberPkFromCallsign(pkId);
  }
}
// Regex from display_name:
function regExFromDisplayName (exp, pk, index = 0) {
  let fallback = "Unknown {?} they/them"
  let name = pk.display_name || pk.name || fallback;
  let match = exp.exec(name)
  if (match && match[index]) { 
    return match[index] 
  } else {
    log(`Using fallback value for ${name} with regex ${exp}`)
    return exp.exec(fallback)[index]
  }
}
function getCallsign (pk, index = 1) {
  // 1 will return without {}
  return regExFromDisplayName(/[\{\[](.+)[\}\]]/, pk, index)
}
function getNickname (pk) {
  // Note: Returned value does not include any parentheticals
  return regExFromDisplayName(/^([\w\s]+)(?= |$)/, pk, 1)
}
function getPronouns (pk) {
  // Note that this will break for names that don't follow the same pattern as our system if pronouns are not set
  return pk.pronouns || /[^\w\s] ([\w\s\/]+)$/.exec(pk.display_name || pk.name)[1]
}
function mainCallsign (callsign) {
  // #todo check if this is even needed, if so
  // #todo check this is working
  data.structure.proxies.forEach(s => {
    callsign = callsign.replaceAll(s, '');
  });
  return callsign;
}
// Lookups:
function callsignFromNickname (nickname) {
  // #later also find close matches
  return data.callsigns_by_name[nickname.toLowerCase()];
}
function getAvatarURL (pk) {
  // #later use the system image like PK does
  let defaultImg = 'https://cdn.pluralkit.me/images/ff/jfjson7surajrye64b52ia2a.webp'
  return pk.avatar_url || pk.webhook_avatar_url || defaultImg;
}
function getBgColor (cs) {
  // #later get member color?
  //let pk = getPkObject(cs);
  //if (pk.name.name) {
    // #todo troubleshoot this and close the GitHub issue
    //log(pretty(pk))
  //}
  // if (pk && pk.color && pk.color !== "null") {
    //return "#" + pk.color;
  //} else {
    let baseHue = [];
    function colorFromCallsign (cs) {
      return Math.floor(seeded(cs)() * 361)
    }
    // #later set color 'homes' per digit
    // and average the hue values?
    let hue = colorFromCallsign(cs)
    return `hsl(${hue}, 20%, 40%)`;
  //}
}
function getSideSibsList (cs) {
  let h = data.structure.relatives;
  return h[cs].sibs.reverse();
}
function getAllSibsList (cs) {
  let h = data.structure.relatives;
  if (!h.hasOwnProperty(cs)) { 
    //log(cs + " has no sibling entry") 
    return [];
  } else {
    let all = [].concat(h[cs].sibs, h[cs].lil_sibs, h[cs].big_sibs);
    return sortByCallsign(all).reverse();
  }
}
function isMainProxy (callsign) {  
  return (callsign == mainCallsign(callsign));
}

// = Plugging in Data =
function getToggle (string) {
  return document.getElementById("toggle-" + string).checked;
}
function updatePkInfo (pk, noSave = false) {
  // #todo use this when changing callsign/name/etc also
  pk = checkMemberObject(pk);
  let callsign = getCallsign(pk);

  data.members_by_id[pk.id] = pk;

  // Add all the various references to this member to the dict
  data.ids_by_ref[pk.id] = pk.id;
  data.ids_by_ref[callsign] = pk.id;
  data.ids_by_ref[callsign.normalize('NFKD')] = pk.id; // normalize('NFKD') makes subscript numbers into regular digits
  data.ids_by_ref[getNickname(pk).toLowerCase()] = pk.id;
  if (pk.name && /^[a-zA-Z]+$/.test(pk.name)) {
    data.ids_by_ref[pk.name.toLowerCase()] = pk.id;
  }
  if (pk.proxy_tags) {
    for (i in pk.proxy_tags) {
      let nn = pk.proxy_tags[i].suffix.slice(2)
      data.ids_by_ref[nn] = pk.id;
    }
  }

  if (!noSave) {
    //log(`Saving member to localForage: ${pk.id}`)
    localforage.setItem(pk.id, pk).catch(err => error);    
  }
}
async function updateDataFromMemberList (list = exported.members) {
  console.groupCollapsed("Updating from member list:");

  list.forEach(updatePkInfo);

  console.groupEnd();
}
