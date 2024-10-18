function splitIntoTerms (searchString) {
  log(`Search string input: "${searchString}"`)
  // Break the search string into separate terms
  return splitByEach(searchString, ",.~ ;:/").map(t => t.trim())
}
function getMemberId (searchTerm) {
  return data.ids_by_ref[searchTerm.toLowerCase()]
}
function validMember (searchTerm) {
  if (["+","-"].includes(searchTerm.slice(-1))) { 
    //log(`Recognized as wild ref: ${searchTerm}`);
    return false
  } else if (data.ids_by_ref[searchTerm.toLowerCase()]) {
    return true
  } else {
    // #todo look harder?
    log(`Not recognized as registered member(s): ${searchTerm}`);
    return false
  }
}
function listRelated (activeList, allMembers = getMemberList()) {
  // Takes as input an array of pkIds to look for relations of and a list of members to search within and returns a list of pkIds for all members in the second array unrelated to members of the first array
  
  // Get just the letters from the active member's callsigns
  let activeAtoms = activeList.map(pkId => getCallsign(getPkObject(pkId))).join("").match(/(\w)/g)

  // Filter member list to exclude related members
  function getAtoms(pkId) { return getCallsign(getPkObject(pkId)).match(/(\w)/g) || [] }
  let unrelatedMembers = allMembers.filter(pkId => {
    // Check for overlap
    return intersect(getAtoms(pkId), activeAtoms).length != 0
  });
  
  return unrelatedMembers
}
function listActive (searchString = data.page.active_list.value) {
  // Takes a string of comma or otherwise separated search terms
  // Returns a list of pkIds for direct matches from search input
  // Usually called from the text box, can also be from URL params
  let searchTerms = splitIntoTerms(searchString)
  // #todo make this less redundant/better organized later as this is also called in updateTileClasses()

  let foundMembers = searchTerms.filter(validMember).map(getMemberId)
  
  if (foundMembers.length == 0) { showMessage(`No direct matches found from search terms "${searchTerms.join('", "')}"`); }
  return [...new Set(foundMembers)] // deduplicates list just for neatness
}
function listElligible (searchTerms, memberList) {
  // Returns a list of pkIds for all members that satisfy wildcard search terms (like 38+ or G+)
  function hasAll (callsignChars, memberList) {
    // Checks to see if members in the memberList array contain all the callsign characters in the array
    function getCallsignChars(pkId) { return getCallsign(getPkObject(pkId)).normalize('NFKD').toLowerCase().split("") }

    // #todo test
    // Takes a string of callsign characters as input and returns a list of pkIds for members that have all of those present
    let required = callsignChars.length
    callsignChars = callsignChars.map(c => c.normalize('NFKD').toLowerCase())

    // Filter member list to only include members that have all the required callsign components
    let relatedMembers = memberList.filter(pkId => {
      // Check for overlap
      return intersect(getCallsignChars(pkId), callsignChars).length == required
    });
    
    return relatedMembers
  }
  
  let wildTerms = searchTerms.filter(t => t.slice(-1) == "+").map(t => t.slice(0, -1))
  if (wildTerms.length > 0) {    
    log("Wild search terms: [\"" + wildTerms.join('", "') + '"]')
    let foundMembers = []

    wildTerms.forEach(t => {
      let callsignChars = t.split("")
      //log(callsignChars)
      foundMembers.push(...hasAll(callsignChars, memberList))
      //log(foundMembers)
    });

    if (foundMembers.length == 0) { showMessage(`No indirect matches found from search terms "${wildTerms.join('", "')}"`); }
    return [...new Set(foundMembers)] // deduplicates list just for neatness
  } else {
    return []
  }
}
function updateTileClasses (overrideList = []) {
  // #todo fix known issue, including "fronters" etc in search terms doesn't actually include them in results the way it should
  // Either use the override list directly or parse the search terms
  let activeMembers = []
  let unavailableMembers = []
  
  if (overrideList.length != 0) {
    // Set as active only members in the override list
    activeMembers = overrideList

    // Set as unavailable any related members to the override list members
    unavailableMembers = listRelated(activeMembers, getMemberList())
  } else {
    // Set as active any members that are direct matches to search terms
    activeMembers = listActive()

    let searchTerms = splitIntoTerms(data.page.active_list.value)

    // If no members qualify as active, bump up available members to active
    if (activeMembers.length == 0) {
      // This means there are no direct matches to the prompt
    
      // Set elligible members as active:
      //log("Search terms: [\"" + searchTerms.join('", "') + '"]')
      activeMembers = listElligible(searchTerms, getMemberList())
    } else {
      // #todo rewrite this to require less computation
    
      // Set as unavailable any inelligible members
      let elligible = listElligible(searchTerms, getMemberList())
      unavailableMembers.push(...getMemberList().filter(m => !elligible.includes(m)))

      // Set as unavailable any related members
      unavailableMembers.push(...listRelated(activeMembers, unavailableMembers))
    }
  }

  let showAvailable = getToggle("available")
  let showUnavailable = getToggle("unavailable")

  getMemberList().forEach(pkId => {
    let e = elementByPkId(pkId)
    if (e) { // accounting for tiles that may not be present
      let tileClass = "hidden"
      if (activeMembers.includes(pkId) || activeMembers.length === 0) {
        tileClass = "active"
      } else if (unavailableMembers.includes(pkId) && showUnavailable) {
        tileClass = "unavailable"
      } else if (showAvailable && !unavailableMembers.includes(pkId)) {
        tileClass = "available"
      }
      e.className = tileClass + ' flip-coin';
    }
  });
}