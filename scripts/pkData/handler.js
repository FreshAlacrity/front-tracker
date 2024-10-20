// see https://github.com/FreshAlacrity/pluralkit-data-handler
// #TODO
/*
- get this working here, then upload to its own repo and add back here as submodule
- remember that how tokens etc are stored varies between here and the Butler
- separate out the functions we use to extend members as a 'members' or 'm' sub-object?
- pull PK API functions into this and make those their own sub-library
*/

const pkData = (function () {
  /* INTERNAL GLOBALS */
  var SYSTEM_STORAGE = {}

  /* UTILITY */
  /** Returns a neatly formatted string given most input; may butcher short objects containing strings with spaces. */
  function pretty (x) {
    if (typeof x === 'string') {
      return x
    } else {
      if (x === undefined) { return 'undefined' }
      if (typeof x === 'number' && isNaN(x)) { x = 'NaN' }
      let longString = JSON.stringify(x, null, 2)
      if (longString.replace(/\s/g, '').length < 120) {
        /* So short arrays etc can fit on one line */
        // may butcher short objects containing strings with spaces. Look into this @later
        longString = JSON.stringify(x)
      }
      return longString
    }
  }
  /**
   * Logs things in the standard format for this library so it's clear where the error came from.
   * @param {...*} - any number of inputs to be logged as a single entry
   * @returns {*} the first parameter, to be used for inline debugging
   */
  function titledLog (input) {
    console.log(`    pkData.log:\n\n${[...arguments].map(pretty).join(' ')}\n\n`)
    return input
  }
  function sayHello () { log("pkData library loaded - current version: 0.1 (unstable)") }
  function setLogFunction (fn) {
    if (typeof fn == "function") {
      this.log = fn
      log = fn // #later figure out how/why this works without setting it up as a global first
    } else {
      // Reset to original function
      this.log = titledLog
      log = titledLog
      throw new Error(`This is not a function - ${typeof fn} ${JSON.stringify(fn)}; log function reset to default`)
    }
  }
  setLogFunction(titledLog) // set the initial log function


  /* unit testing */
  const unitTests = (function () {
    const allTests = []

    function add (...tests) {
      allTests.push(tests)
    }

    /**
    * Internal unit testing function.
    * @version 1.2, as of Dec 12, 2020
    * @param {*} setupResult - Output from any setup function run ahead of the test.
    * @param {*} actualResult - The actual output, to be tested for equality.
    * @param {*} expectedResult - The expected output to be tested against.
    * @param {string} [testName] - The name of the test (providing a name returns a readout instead of a boolean value).
    * @param {boolean} [suppressLog=false] - Truthy values suppress logging for false tests.
    * @returns {boolean|string} - If given a testName returns a detailed test result readout, else returns a boolean value representing whether the test passed.
    */
    function doTest (testName, setupResult, actualResult, expectedResult) {
      /* convert to strings so object comparisons work well */
      setupResult = JSON.stringify(setupResult)
      actualResult = JSON.stringify(actualResult)
      expectedResult = JSON.stringify(expectedResult)

      const result = (actualResult === expectedResult)

      // #later trim to 1000 chars for readout?
      const readout = [
        `${testName} - ${result}`,
        `Setup result:    ${setupResult}`,
        `Actual result:   ${actualResult}`,
        `Expected result: ${expectedResult}`, ``
      ].join('\n\n       ')

      return {
        pass: result,
        log: readout
      }
    }
    add('unitTests.test()',
      ['A', doTest('True Test', 'A', 1, 1).pass, true],
      ['B', doTest('False Test', 'B', 1, 0).log, [
        `False Test - false`,
        `Setup result:    "B"`,
        `Actual result:   1`,
        `Expected result: 0`,
        ``
      ].join('\n\n       ')]
    )

    /** Run a sequence of tests from an array through test() */
    function tests (name, ...testArrays) {
      let failed = []
      testArrays.forEach((a, i) => {
        let result = doTest('', a[0], a[1], a[2])
        if (!result.pass) {
          // redo failed tests to get verbose logs
          failed.push(`${name} Test ${i + 1}${result.log}`)
        }
      })

      let message = name + ' - PASSED ' + testArrays.length
      if (failed.length > 0) {
        message = `----\n${failed.join('\n')}\n----`
      }
      return message
    }

    /** Run all the tests in the unitTests array. */
    function runUnitTests () {
      const testResults = allTests.map(a => tests(...a))
      log('Unit Test Results:\n-------------------------\n\n' + testResults.join('\n'))
    }

    return {
      add: add,
      run: runUnitTests,
      test: doTest
    }
  }())

  /* other */

  /** Makes a deep copy of objects with simple properties
   * @note see https://stackoverflow.com/questions/122102/what-is-the-most-efficient-way-to-deep-clone-an-object-in-javascript
   * @note Strips out properties whose values are functions or undefined, converts NaN and Infinity to null, stringifies dates, and converts regex to empty objects and otherwise messes up 'Maps, Sets, Blobs, FileLists, ImageDatas, sparse Arrays, Typed Arrays or other complex types'
   */
  function copy (inputObj) { return JSON.parse(JSON.stringify(inputObj)) }
  // #todo does this fail for large objects?
  // #todo include in unit test a date, a regex, infinity, and a map
  unitTests.add('copy()',
    [1,
      copy({ foo: 2, beep: 'A', bop: 1000, bip: undefined }),
      { foo: 2, beep: 'A', bop: 1000 }
    ]
  )

  /* PK API */
  // #todo import
  /* get PK data */
  /* set PK data */
  /* GENERAL */
  /* global */
  function systemDataReport (sysObj = SYSTEM_STORAGE, intro = "System Data") {
    return intro + ":\n" + Object.keys(sysObj).map(k => {
      if (Array.isArray(sysObj[k])) {
        return `${k}: ${sysObj[k].length} entries`
      } else {
        let comment = JSON.stringify(sysObj[k])
        if (comment.length > 100) {
          comment = comment.slice(0, 50) + "..."
        }
        return `${k}: ${comment}`
      }
    }).join("\n")
  }
  function overrideSystemData (systemObj, logImport = true) {
    // If a system object was entered, use a copy of that object
    // Otherwise overwrite the system entirely
    // #later is this wise to do without requiring some sort of boolean to authorize it?
    let newObj = systemObj ? copy(systemObj) : {};
    SYSTEM_STORAGE = newObj
    if (logImport) { log(systemDataReport(SYSTEM_STORAGE, "System data successfully imported")) }
    return newObj;
  }
  function exportSystemData () {
    return copy(SYSTEM_STORAGE)
  }
  function test_sysMangement () {
    let backup = exportSystemData()
    let initial = Object.keys(SYSTEM_STORAGE).length
    overrideSystemData({ 'foo': 'bar' }, false)
    let temp = Object.keys(SYSTEM_STORAGE).length
    overrideSystemData(backup, false)
    return (initial != temp) && (Object.keys(SYSTEM_STORAGE).length == initial)
  }
  // #todo figure out why this fails
  unitTests.add('exportSystemData() overrideSystemData()', ["none", test_sysMangement(), true])

  function setGlobal (type, data = []) {
    log(`Setting ${type}`)
    let newData = copy(data)
    SYSTEM_STORAGE[type] = newData;
    return newData;
  }
  function getGlobal (type) {
    log(`Getting ${type}`)
    // If the data isn't present, fetch it using an API call instead
    // #todo check if it's even a valid type here too?
    if (!SYSTEM_STORAGE[type] || SYSTEM_STORAGE[type].length == 0) { fetchSystemData(type) }
    return SYSTEM_STORAGE[type];
  }
  unitTests.add('setGlobal() getGlobal()',
    //[setGlobal('foo', [1, 2]), getGlobal('foo'), [1, 2]]
  )
  // #todo delete foo later

  function clearSystemData () {
    // #later consider what properies this ought to have
    SYSTEM_STORAGE = {
      "members": [],
      "groups": [],
      "switches": []
    }
    //["members", "groups", "switches"].forEach(type => setGlobal(type, []));
  }

  function hasId (pk, id) { return (pk.id === id || pk.uuid === id); }

  function getById (type, id) {
    if (type.slice(type.length - 1) !== 's') { type += 's' }
    let list = getGlobal(type).filter(g => hasId(g, id));
    if (list.length != 1) {
      throw new Error(`No ${type} with id "${id}" found`);
    }
    return list[0];
  }

  /**
   * @param {string} name - a name or partial name of a member or group
   * @param {Object} pk - a member or group object
   * @returns {number} 1 for full match, 0 for no match
   * @author Myr
   */
  function hasName (name, pk) {
    // #later also return partial match values between 0 and 1
    if (pk.name && pk.name.toLowerCase() === name.toLowerCase()) { return 1 }
    if (pk.display_name && pk.display_name.toLowerCase() === name.toLowerCase()) { return 1 }
    let matchArr = [0];
    // if (g.display_name || g.name).includes(name)
    return Math.max(...matchArr)
  }

  /**
   * @param {string} type - "member" or "group"
   * @param {string} name - a name or partial name of a member or group
   * @returns {Array<Object>} group/member objects matching the name given
   * @author Myr
   */
  function getByName (type, name) {
    // #later sort by match quality
    if (type.slice(type.length - 1) !== 's') { type += 's' }
    let arr = getGlobal(type);

    // Look for an exact match
    arr = arr.filter(pk => (hasName(name, pk) === 1))

    // #todo also match by nickname for folks like Sweet William
    return arr;
  }

  /* group functions */
  /* member list functions */

  function listNames (objArr, preferDisplayName = false) {
    // Mostly for debugging
    if (preferDisplayName) {
      return objArr.map(g => (g.display_name || g.name));
    } else {
      return objArr.map(g => g.name);
    }
  }
  /* member functions */


  function getSwitches () {
    // #todo #later fetch from PK and make these asynchronous?
    return getGlobal("switches");
  }
  function getSwitch (switchNum = 0) {
    // #todo make async and auto fetch older switches if the num is higher than whats currently available
    return getGlobal("switches")[switchNum];
  }


  // = MEMBERS =
  function getFronters (switchNum = 0) {
    return getGroupMemberObjects(getSwitch(switchNum));
  }
  function test_getFronters () {
    log(getFronters(2))
  }


  function countMatching (type, obj) {
    let matchBy = obj.id ? 'id' : 'uuid'
    if (!obj[matchBy]) {
      throw new Error(`This object has no id or uuid value:\n${pretty(obj)}`);
    }
    return getGlobal(type + "s").filter(m => m[matchBy] == obj[matchBy]).length
  }
  function checkIfEntryExists (type, obj) {
    // #todo alert if more than 1?
    return countMatching(type, obj) == 1
  }
  function addEntry (type, obj) {
    if (type.slice(-1) != "s") { type = type + "s" }
    setGlobal(type, getGlobal(type).push(obj))
    return true
  }

  /**
   * Updates a member or group within the system object
   * @author June
   * @author Bryn
   * @author Bee
   * @author Quince
   * @author Penelope
   * @see {@link https://pluralkit.me/api/endpoints/#members PluralKit Endpoint Documentation}
   */
  function updateEntryByType (type, obj) {
    // #todo finish and test
    // Currently only works for groups and members
    // Object must have a id or uuid to match to previous record

    // Check that there's one and only one existing entry that matches this one
    let count = countMatching(type, obj)
    if (!count == 1) {
      let msg = `${count} ${type}s found in the system with ${matchBy} ${obj[matchBy]}`
      if (count == 0) {
        log(msg)
        addEntry(type, obj)
      } else {
        // More than one entry with this ID was found
        throw new Error(msg)
      }
    }

    let matchBy = obj.id ? 'id' : 'uuid'
    log(`Updating ${type} in globals with ${matchBy} ${obj[matchBy]}`)

    // #todo do this in a way that doesn't keep traversing
    setGlobal(type + "s", getGlobal(type + "s").map(m => {
      if (m[matchBy] == obj[matchBy]) {
        // Update existing entry
        for (let key in obj) { m[key] = obj[key] }
        log(`Updated ${type} ${m.name || m.display_name} (${m.id || m.uuid})`)

        // Keep the updated version to return as a receipt
        obj = m
      }
      return m
    }))
    return obj // this now includes any data that was present but not overwritten
  }
  function updateGroupInGlobals (obj) {
    return updateEntryByType('group', obj)
  }
  // #todo #later make this into a unit test and change it back after
  function test_updateEntryByType () {
    /*
    let testMember = {
      "privacy": {
        "visibility": "public",
        "name_privacy": "private",
        "description_privacy": "public",
        "pronoun_privacy": "public",
        "birthday_privacy": "public",
        "avatar_privacy": "public",
        "proxy_privacy": "public",
        "metadata_privacy": "public"
      },
      "uuid": "b62f0ab2-dc4f-4536-bb7f-7797690d3253"
    }
    */
    let id = "kzkww" // Bee
    let testMember = getById("member", id)
    let field = "pronouns"
    //testMember["id"] = null

    log("Initial value set?", testMember[field] != "foo")
    testMember[field] = "foo"
    let changedMember = updateEntryByType('member', testMember)
    log("Updated in return value?", changedMember[field] == "foo")
    let doubleCheck = getById("member", id)
    log("Updated in system global?", doubleCheck[field] == "foo")
  }

  // Format any linked properties into a hyperlink
  // @author August
  function makeLinks (obj) {
    let linked = Object.keys(obj).filter(h => Object.keys(obj).includes(h + " Link"));
    linked.forEach(h => {
      obj[h] = `[${obj[h]}](${obj[h + " Link"]})`;
      delete obj[h + " Link"];
    })
    return obj;
  }

  // #later rewrite (use regex?)
  // @author June
  // @author Hall
  function objFromDescription (string, intro = "Intro") {
    let d = {};
    if (string) {
      let parts = string.split('\n**')
      d[intro] = '';
      parts.forEach(n => {
        let pairs = n.split('**: ');
        if (pairs.length < 2) {
          d[intro] += pairs[0]
        } else {
          // Check that the key doesn't have a preceeding ** from not having an intro
          key = pairs[0]
          if (key.slice(0, 2) == "**") { key = key.slice(2) }

          // Why the join here? -Hall
          text = pairs.slice(1).join("**: ");

          d[key] = text
        }
      });
    }
    // Format any linked properties into a hyperlink
    d = makeLinks(d);
    return d;
  }
  function test_objFromDescription () {
    pkData.clear();
    let description = getByName("member", "Hall")[0]["description"];
    log(objFromDescription(description));
  }

  // @author August
  function listThese (descObj, headers = [], include = false, tail = "\n\n") {
    // Returns a string with bolded headers for each of the object's properties
    // Avoid side effecting by copying the object
    let d = copy(descObj);
    if (!include) {
      // Exclude the listed headers instead
      headers.forEach(h => delete d[h]);
      headers = Object.keys(d);
    }
    headers = headers.filter(h => d.hasOwnProperty(h));
    return headers.map(h => `**${h}**: ${d[h]}`).join(tail);
  }
  function discordStringFromObj (d, tail = "\n\n", intro = "Intro") {
    let start = [intro, "Internal Name Translation", "Specific Boundaries"];
    let end = ["Music", "Music Link", "Voice Recording", "Picrew"];
    let string = [
      listThese(d, start, true, tail),
      listThese(d, [...start, ...end], false, tail),
      listThese(d, end, true, tail)
    ].join(tail).slice(intro.length + 6);
    return string;
  }
  function test_descriptionParsing () {
    let initial = log(twineObj().description, "(original)");
    let recompiled = discordStringFromObj(log(objFromDescription(initial)));
    if (recompiled !== initial) { log("Something is wrong with this recompiled description:", "\n" + recompiled) }
  }

  // @author Myr, August
  function getSectionFromDesc (pk, header) {
    let regex = new RegExp("\\*\\*" + header + "\\*\\*:(.+)$", "gim");
    if (!pk.description) { return "" }
    let matches = pk.description.match(regex);
    if (!matches) { return "" }
    if (matches.length > 1) { log(`${pk.name} has more than one header with title ${header} in their alt description`) }
    return matches[0].slice(('**' + header + '**:').length);
  }
  // @author Myr, August
  function getListFromDesc (pk, header) {
    let str = getSectionFromDesc(pk, header);
    return (str === '') ? [] : str.split(", ").map(p => p.trim());
  }

  /**
   * @param {string} id - the five-letter id or uuid of a member
   * @returns {Array<Object>} group objects for every group that member belongs to
   * @author Myr
   */
  function getMemberGroups (id = "uioxq") {
    let pk = getById("member", id);
    let groups = getGlobal("groups");
    return groups.filter(g => {
      return (g.members.includes(pk.id) || g.members.includes(pk.uuid))
    })
  }
  function test_getMemberGroups () {
    pkData.clear(); // so the Butler will use live data
    log(listNames(getMemberGroups()).join(", "))
  }

  function getMemberAlts (pk) {
    // #todo
  }

  // = GROUPS =
  function getNamedGroupId (name) {
    let dict = {
      copilots: "jxgrj",
      alt_copilots: "edoeg",
      atoms: "nbzrx",
      dormant: "khyku",
      council: "iacrr",
      bounce: "kiwbl",
      pass: "djruh",
      regulars: "peokh",
      tasked: "vwbqw",
      staged: "guggr"
    }
    let groupId = dict[name.toLowerCase()];
    if (!groupId) {
      throw new Error(`No id set for group name ${name}`);
    }
    return groupId;
  }
  function getNamedGroup (name) {
    let groupId = getNamedGroupId(name);
    return getById("group", groupId);
  }
  function test_GetNamedGroup () {
    //s.clear();
    log(getNamedGroup("council"))
  }

  function getGroupMemberObjects (pkGroupObj) {
    return pkGroupObj.members.map(id => getById("member", id))
  }
  function test_GetGroupMemberObjects () {
    log(getGroupMemberObjects(getNamedGroup("council")))
  }

  /* MEMBERS */
  // @author Bryn
  function isMember (pk, group) {
    return group["members"].includes(pk.id) || group["members"].includes(pk.uuid);
  }
  function test_isMember () {
    pkData.clear(); // clear the export data to use live data only
    let pk = getByName("member", "June")[0];
    let groupA = getById("group", "iyusd")
    let groupB = getNamedGroup("regulars")
    //log(getGroupMemberObjects(groupB).map(pk => pk.name).join(', '))
    // ex - isMember(pk, getNamedGroup("tasked"))
    log(`${pk.name} is in ${groupA.name}: ${isMember(pk, groupA)}`)
    log(`${pk.name} is in ${groupB.name}: ${isMember(pk, groupB)}`)
  }

  function regex (type) {
    let key = {
      'isUtility': '[A-Z]'
    }
    return new RegExp(key[type])
  }
  function isUtility (pk) {
    let text = getCompactSetString(pk)
    return regex('isUtility').test(text)
  }
  function isAlt (pk) {
    let text = getCompactSetString(pk)
    let regex = new RegExp('[\'"]')
    return regex.test(text)
  }
  function isPrimary (pk) {
    return (!isUtility(pk) && !isAlt(pk))
  }
  /*
  // Known issue: workflow for unit tests includes clobbering the system global before it gets here (should be fixed)
  function runMemberTypeTest (k) {
    let pk = getById('member', k) // note: this will only work after the lib is initiated
    return [getNickname, isUtility, isAlt, isPrimary].map(f => f(pk))
  }
  let memberTypeFunctionTestNames = 'getNickname() isUtility() isAlt() isPrimary()'
  let memberTypeTests = {
    "knaqg": ["Echo",        true, false, false],
    "hdfqk": ["Damson",      false, false, true],
    "eedvu": ["Floop (Tea)", false, true, false]
  }
  Object.keys(memberTypeTests).forEach(pkId => {
    unitTests.add([memberTypeFunctionTestNames, runMemberTypeTest(pkId).join(' '), memberTypeTests[pkId]].join(' '))
  });
  */

  /* Reveal functions and set aliases visible to outside scopes. */
  return {
    /* PKDATA LIB FUNCTIONS */
    // Note: if changing any of the property names, leave a note about what it used to be
    // Make sure everything here has a unit test please ^^

    /* UTILITY */
    'log': log,
    'logWith': setLogFunction,
    'hello': sayHello,
    'prettyPrint': pretty,
    /* GENERAL */
    'init': overrideSystemData,
    'clear': clearSystemData,
    'export': exportSystemData, // note that this is not the same as the PK system export, but maybe it could be?
    'report': systemDataReport,
    'switches': getSwitches,
    /* ?? */
    'headerList': listThese,
    'headerListToObj': objFromDescription,
    /* MEMBER */
    'getMemberGroups': getMemberGroups, // rename? make member property? #todo
    'addEntry': addEntry,
    'updateEntry': updateEntryByType,
    'hasEntry': checkIfEntryExists,
    'updateGroup': updateGroupInGlobals,
    /* PK OBJECT FINDERS */
    'listAll': getGlobal, // #todo consider if this needs to be renamed or depreciated etc
    'updateTypeList': setGlobal,
    'objectFromName': getByName, // params: type, name
    'objectFromId': getById,
    /* TEMP */
  }
}())

// Aliases used by in pkButler
// #todo test and later set these up to use the names directly
const getByName = pkData.objectFromName
const getById = pkData.objectFromId
const headerList = pkData.headerList
const objFromDescription = pkData.headerListToObj
const getMemberGroups = pkData.getMemberGroups
const clearSystemData = pkData.clear
const getGlobal = pkData.listAll
const getGroups = pkData.listAll.bind(pkData, "groups")
const setGlobal = pkData.updateTypeList
const updateMemberInGlobals = pkData.updateEntry.bind(pkData, "member") // first param is the 'this' value
const updateGroupInGlobals = pkData.updateGroup
const hasEntry = pkData.hasEntry
const getSwitches = pkData.switches
