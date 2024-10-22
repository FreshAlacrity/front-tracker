function getHeaders (requireAuth, hasContent, method, body) {
  let obj = { 'headers': {} }
  if (hasContent) { obj['headers']['Content-Type'] = 'application/json' }
  if (method) { obj['method'] = method }
  if (body) { obj['body'] = JSON.stringify(body) }
  if (requireAuth && data.setup.token === '') {
    // Remember that running functions that require a token before local data is loaded
    // means that won't be used even if there is one saved

    // #todo add a better way to resolve invalid token input here
    // #todo also add a way to cancel the action that prompted this
    while (data.setup.token === '') { inputToken() }
  }
  obj['headers']['Authorization'] = data.setup.token
  return obj
}

// Settings:
let totalRequests = 0;
let currentRequests = 0;
let requestAfter = 0;
async function delayedFetch (url, data) {
  // see https://www.javascripttutorial.net/javascript-fetch-api/
  // see https://stackoverflow.com/questions/38956121/how-to-add-delay-to-promise-inside-then
  let rootUrl = "https://api.pluralkit.me/v2"
  totalRequests++
  let num = totalRequests;
  currentRequests++
  if (currentRequests > 10) {
    console.log(`There's ${currentRequests} requests stacked up so let's export and re-import instead maybe? That's a lot to do all at once.`)
  } else {
    let min = 1500;
    let now = new Date().getTime();
    let waitFor = 0;
    if (requestAfter > now) {
      waitFor = requestAfter - now;
      requestAfter = requestAfter + min;
    } else {
      requestAfter = now + min;
    }
    console.log(`Setting up request ${totalRequests} with delay: ${waitFor} (${currentRequests} requests cued up)`)
    await new Promise(resolve => setTimeout(resolve, waitFor));
    console.log(`Sending API request ${num} to ${url}`);
    let result = await fetch(rootUrl + url, data);
    console.log(`Received API request ${num} for ${url}`);
    currentRequests--
    return result;
  }
}
async function fetchPkData (url) {
  try {
    let response = await delayedFetch(url, getHeaders())
    return await response.json();
  } catch (error) { console.log(error) }
}
function fetchSystemInfo (system = 'lhexq') {
  return fetchPkData(`/systems/${system}`)
}
function fetchMemberObjectList (system = 'lhexq') {
  return fetchPkData(`/systems/${system}/members`)
}
function fetchMemberInfo (id = 'qkxux') { // Lucky's member ID
  return fetchPkData(`/members/${id}`)
}

// see https://pluralkit.me/api/endpoints/#switches
async function getFronters (system = 'lhexq') {
  let url = `/systems/${system}/fronters`
  let etc = getHeaders(true, true, 'GET')
  try {
    let response = await delayedFetch(url, data)
    let fronters = await response.json()
    //log(pretty(fronters))
    return fronters;
  } catch (error) {
    error(error);
    return { members: [] };
  }
}

async function newMember (callsign, details) {
  // #todo combine with validate function/have those work together
  let url = `/members`
  let memberObj = { 'name' : "TEST" } // Name field is required
  // #todo add details

  let etc = getHeaders(true, true, 'POST', memberObj)

  try {
    let res = await delayedFetch(url, data)
    let pk = await res.json()
    updatePkInfo(pk); // update current data with new member
    // #todo make new tile
    return pk;
  } catch (error) {
    console.log(error);
  }
}

async function reportBack (comment, data) {
  // #todo test
  let json = await data
  if (!json) {
    console.error(comment + ": " + "No value returned")
  } else {
    log(comment + ": " + pretty(json));
  }
}
async function editMember (id, memberObj) {
  let url = `/members/${id}`
  let etc = getHeaders(true, true, 'PATCH', memberObj)
  delayedFetch(url, etc).then(d => reportBack("Member edited", d.json()));
}
async function setDisplayName (id, newName) {
  return editMember(id, { display_name: newName })
}

async function reportSwitch (active = getActive(), system = 'lhexq') {
  let url = `/systems/${system}/switches`
  log(`Reporting switch with IDs: ${active.join(', ')}`);
  // #later also add timestamp in the object?
  let etc = getHeaders(true, true, 'POST', { members: active })
  log(`WIP - check that the above message has a list of member IDs`)
  //delayedFetch(url, etc) // #todo double check and enable
}