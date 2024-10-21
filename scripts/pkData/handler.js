// see https://github.com/FreshAlacrity/pluralkit-data-handler

// #TODO
/*
- write more unit tests
- make sure every function is used somewhere or returned as a property
- pull PK API functions into this and make those their own sub-library
- get this all working here and in the Butler, then upload to its own repo and add back here as submodule
- remember that how tokens etc are stored varies between here and the Butler
- separate out the functions we use to extend members as a sub-library (for example, nickname and callsign functions)
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
      // Is there a way to get this to show the line where it was called from, instead of the line it's declared on?
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
      console.log([...arguments].map(pretty).join(' '))
      return input
    }

    function setLogFunction (fn) {
      if (typeof fn == "function") {
        this.log = fn
        log = fn // #later figure out how/why this works without setting it up as a global first
      } else {
        // Reset to original function
        this.log = console.log.bind(window.console, `    pkData.log:\n`)
        log = titledLog
        throw new TypeError(`This is not a function - ${typeof fn} ${JSON.stringify(fn)}; log function reset to default`)
      }
    }
    setLogFunction(console.info) // set the initial log function

    function sayHello () { log("pkData library loaded - current version: 0.1 (unstable)") }

    /** Makes a deep copy of objects with simple properties
     * @note see https://stackoverflow.com/questions/122102/what-is-the-most-efficient-way-to-deep-clone-an-object-in-javascript
     * @note Strips out properties whose values are functions or undefined, converts NaN and Infinity to null, stringifies dates, and converts RegEx to empty objects and otherwise messes up 'Maps, Sets, Blobs, FileLists, ImageDatas, sparse Arrays, Typed Arrays or other complex types'
     * @note Will probably also fail for very large objects
     */
    function copy (inputObj) {
      if (typeof(inputObj) == "undefined") { throw new TypeError (`Undefined input`) }
      return JSON.parse(JSON.stringify(inputObj)) 
    }
  
  /* SYSTEM STORAGE */
    function systemDataReport (systemObj, intro = "System Data") {
      return intro + ":\n" + Object.keys(systemObj).map(k => {
        if (Array.isArray(systemObj[k])) {
          return `${k}: ${systemObj[k].length} entries`
        } else {
          let comment = JSON.stringify(systemObj[k])
          if (comment.length > 100) {
            comment = comment.slice(0, 50) + "..."
          }
          return `${k}: ${comment}`
        }
      }).join("\n")
    }
    function checkId (systemObj) {
      // Note that systems (and members and groups etc) can both have a uuid instead
      // The API can use ID, UUID, or the ID of a Discord account linked to the system, so really any of those should work for this purpose
      // #later maybe add support for those, not now :)
      if (!systemObj) { throw new TypeError(`Not a valid system object: ${pretty(systemObj)}`) }
      if (!systemObj['id']) { throw new TypeError(`No id found in system object: ${systemDataReport(systemObj)}`) }
      return systemObj && systemObj['id']
    }
    function listSystemIds () { return Object.keys(SYSTEM_STORAGE) }
    function isStored (systemObj) { return !!SYSTEM_STORAGE[systemObj["id"]] }
    function overrideSystemData (systemObj) {
      checkId(systemObj)
      // If a system object was entered, overwrite the system data entirely using a copy of that object
      SYSTEM_STORAGE[systemObj['id']] = copy(systemObj)
      return SYSTEM_STORAGE[systemObj['id']];
    }
    function clearSystemData (systemId) {
      checkId({ "id": systemId })
      return overrideSystemData({
            "id": systemId
          })
    }
    function clearAllSystemData (systemId) { SYSTEM_STORAGE = {} }

  /* ENTRY MANAGEMENT */
    function about(m) {
      // Makes a quick little blurb to identify an entry for logging purposes
      // Assumes a lot about what properties something might have; may need to update later
      if (!m) {
        return pretty(m)
      } else if (typeof m == "string") {
        return m
      } else if (m.name || m.display_name) {
        return `${m.name || m.display_name} (${m.id || m.uuid})`
      } else {
        return `${m.id || m.uuid || m.timestamp}`
      }
    }
    function setValue (systemId, type, data) {
      // Overrides values
      //log(`Setting ${type} ${about(data)}`) // makes a LOT of logs on import
      let newData = copy(data)
      SYSTEM_STORAGE[systemId][type] = newData;
      return newData;
    }
    function checkValue (systemId, type) {
      // Will not go fetch new data
      return SYSTEM_STORAGE[systemId][type]
    }
    function getIndexOfMatch (systemId, type, obj, matchBy = "id") {
      return checkValue(systemId, type).map(m => m[matchBy]).indexOf(obj[matchBy])
    }
    function countMatching (systemId, type, obj) {
      let matchBy = obj.id ? 'id' : 'uuid'
      if (!obj[matchBy]) {
        throw new TypeError(`This object has no id or uuid value:\n${pretty(obj)}`)
      }
      let currentList = checkValue(systemId, type)
      if (!currentList || !Array.isArray(currentList)) {
        throw new TypeError(`Trying to look for matches, but this isn't an array:\n${pretty(currentValue)}`)
      }
      return currentList.filter(m => m[matchBy] == obj[matchBy]).length
    }
    function checkIfEntryExists (systemId, type, obj) {
      // #todo alert if more than 1?
      return countMatching(systemId, type, obj) == 1
    }
    function addEntry (systemId, type, m) {
      log(`Adding ${type} ${about(m)}`) // temp #todo remove
      let currentValue = checkValue(systemId, type)
      if (!Array.isArray(currentValue)) {
        throw new TypeError(`Trying to add an entry, but this isn't an array:\n${pretty(currentValue)}`)
      }
      currentValue.push(m) // Remember that this returns *length* of new array
      setValue(systemId, type, currentValue)
      return true
    }
    function updateEntryObject (oldEntry, newObj) {
      // Update existing entry object
      for (let key in newObj) { 
        // Detect a case of public/private name data clash
        if (key == "name" && !newObj.display_name) {
          // #todo consider if there is a better way to do this
          key = display_name
        }
        oldEntry[key] = newObj[key] 
      }
      log(`Updated ${about(oldEntry)}`)

      // Return updated version
      return oldEntry
    }
    function updateEntryByType (systemId, type, obj) {
      // Currently only works for groups and members, for switches use timestamp?

      // Object must have a id or uuid to match to previous record
      let matchBy = obj.id ? 'id' : 'uuid'

      // Check that there's one and only one existing entry that matches this one
      let count = countMatching(systemId, type, obj)
      if (!count == 1) {
        let msg = `${count} ${type}s found in the system with ${matchBy} ${obj[matchBy]}`
        if (count == 0) {
          log(msg)
          addEntry(systemId, type, obj)
        } else {
          // More than one entry with this ID was found
          throw new ReferenceError(msg)
        }
      } else {
        let index = getIndexOfMatch(systemId, type, obj)
        log(`Updating ${type} ${about(obj)} at index ${index}`)
        let currentList = checkValue(systemId, type)
        obj = updateEntryObject(currentList[index], obj)
        currentList[index] = obj
        setValue(systemId, type, currentList)
      }
      return obj // this now includes any data that was present but not overwritten
    }
    function exportSystemData (systemId = listSystemIds()[0]) {
      if (isStored({ id: systemId })) {
        return copy(SYSTEM_STORAGE[systemId])
      } else {
        throw new ReferenceError(`System with id "${systemId}" not found`)
      }
    }
    function importSystemData (systemObj) {
      checkId(systemObj)

      // Get the system Id from the object
      let systemId = systemObj['id']

      // If this system has not been previously imported, start with a clean slate
      if (!isStored(systemObj)) { clearSystemData(systemId) }

      // Add without overwriting
      for ([type, data] of Object.entries(systemObj)) {
        // If there are any stored values for lists, merge them
        // note: this should include the properties "accounts", "switches", "groups", "members"
        
        let currentValue = checkValue(systemId, type)
        if (Array.isArray(data) && currentValue && currentValue.length != 0) {
          data.forEach(entry => updateEntryByType(systemId, type, entry))
        } else {
          setValue(systemId, type, data)
        }
      }

      // Return a clean copy of the new system with merged data
      return exportSystemData(systemId)
    }

  /* PK API */
  // #todo import
  /* get PK data */
  /* set PK data */

    function getValue (systemId, type) {
      // Will only return a list with 0 entries if that's what it gets from the API etc
      checkId({ "id": systemId })
      log(`Getting ${type} for system with id ${systemId}`)

      // If the data isn't present and can be gotten through the API, fetch it using an API call instead
      let stored = checkValue(systemId, type)
      let canFetch = ["switches", "groups", "members"] // #todo expand these when API functions are included
      if (!stored && canFetch.includes(type)) {
        return fetchSystemData(systemId, type)
      } else {
        return stored;
      }
    }

  /* RETURNING SPECIFIC ENTRIES */
    function getById (systemId, type, id) {
      function hasThisId (pk, id) { return (pk.id === id || pk.uuid === id); }
      let list = getValue(systemId, type).filter(g => hasThisId(g, id));
      if (list.length != 1) { throw new Error(`No ${type} with id "${id}" found`) }
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
    function getByName (systemId, type, name) {
      // #later sort by match quality
      let arr = getValue(systemId, type);

      // Look for an exact match
      arr = arr.filter(pk => (hasName(name, pk) === 1))

      // #todo also match by nickname for folks like Sweet William
      return arr;
    }

    function getSwitch (systemId, switchNum = 0) {
      // #todo make async and auto fetch older switches if the num is higher than whats currently available
      return getValue(systemId, "switches")[switchNum];
    }

    function getFronters (systemId, switchNum = 0) {
      return getGroupMemberObjects(getSwitch(systemId, switchNum));
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

    // @author June
    // @author Hall
    /*
    // Previous version
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
    */
    function objFromDescription (string, intro = "Intro") {
      // #later rewrite (use regex?)
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
      let groups = getValue("groups");
      return groups.filter(g => {
        return (g.members.includes(pk.id) || g.members.includes(pk.uuid))
      })
    }

    // = GROUPS =
    function getGroupMemberObjects (pkGroupObj) {
      return pkGroupObj.members.map(id => getById("member", id))
    }


  /* MEMBERS */
  // @author Bryn
  function isMember (pk, group) {
    return group["members"].includes(pk.id) || group["members"].includes(pk.uuid);
  }

  function namedRegEx (type) {
    let key = {
      'isUtility': '[A-Z]'
    }
    return new RegExp(key[type])
  }
  function isUtility (pk) {
    let text = getCompactSetString(pk)
    return namedRegEx('isUtility').test(text)
  }
  function isAlt (pk) {
    let text = getCompactSetString(pk)
    let regex = new RegExp('[\'"]')
    return regex.test(text)
  }
  function isPrimary (pk) {
    return (!isUtility(pk) && !isAlt(pk))
  }

  /* Reveal functions and set aliases visible to outside scopes. */
  return {
    /* PKDATA LIB FUNCTIONS */
    // Note: if changing any of the property names, leave a note about what it used to be
    // Make sure everything here has a unit test please ^^

    /* UTILITY */
    'logger': log,
    'logWith': setLogFunction,
    'hello': sayHello,
    'prettyPrint': pretty,
    'copy': copy,
    'exportSystem': exportSystemData, // note that this is not the same as the PK system export, but maybe it could be?
    'clearSystem': clearSystemData,
    'clearAll': clearAllSystemData, // deletes everything stored for all systems

    /* SYSTEMS */
    'listSystemIds': listSystemIds,

    /* SYSTEM DATA (all expect system object as the first parameter) */
    'checkId': checkId,
    'describe': systemDataReport,
    'importSystem': importSystemData,
    'overrideSystem': overrideSystemData,
    'isStored': isStored, // doesn't check if the stored version is up to date, just if there is one

    /* GENERAL ENTRY DATA (members, groups, switches etc) */
    'addEntry': addEntry,
    'updateEntry': updateEntryByType,
    'hasEntry': checkIfEntryExists,
    'setAll': setValue,
    'checkAll': checkValue, // returns what's stored, will never fetch api data
    'getAll': getValue, // will fetch API data if it hasn't been loaded already
    // #todo need a function to force loading API data
    
    /* SPECIALIZED */
    'getMemberGroups': getMemberGroups, // rename? make member property? #todo
    'objectFromName': getByName, // params: type, name
    'objectFromId': getById,

    /* DESCRIPTIONS */
    'headerList': listThese,
    'headerListToObj': objFromDescription,
    'objToHeaderList': discordStringFromObj
  }
}())

// Aliases used by in pkButler
// #todo test and later set these up to use the names directly
const systemId = "exmpl" //webhooks.pk.system // for Butler
const headerList = pkData.headerList
const objFromDescription = pkData.headerListToObj
const clearSystemData = pkData.clearAll
const setGlobal = pkData.setAll.bind(pkData, systemId)
const getGlobal = pkData.getAll.bind(pkData, systemId)
const getGroups = pkData.getAll.bind(pkData, systemId, "groups")
const getSwitches = pkData.getAll.bind(pkData, systemId, "switches")
const updateGroupInGlobals = pkData.updateEntry.bind(pkData, systemId, "groups")
const updateMemberInGlobals = pkData.updateEntry.bind(pkData, systemId, "members")
const hasEntry = pkData.hasEntry.bind(pkData, systemId)
const getById = pkData.objectFromId.bind(pkData, systemId)
const getByName = pkData.objectFromName.bind(pkData, systemId)
const getMemberGroups = pkData.getMemberGroups.bind(pkData, systemId)

