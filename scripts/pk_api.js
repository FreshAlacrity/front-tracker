// see https://www.javascripttutorial.net/javascript-fetch-api/
// requires an auth token set to pkToken variable

let totalRequests = 0;
let currentRequests = 0;
let requestAfter = 0;
let rootUrl = "https://api.pluralkit.me/v2"

function basicAuth(neccessary) {
  if (data.setup.token === '' && neccessary) {
    // #todo add a better way to resolve invalid token input here
    while (data.setup.token === '') {
      inputToken()
    }
  }
  return { headers: { Authorization: data.setup.token } }
}

async function delayedFetch(url, data) {
  // see https://stackoverflow.com/questions/38956121/how-to-add-delay-to-promise-inside-then
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
    console.log(`Sending API request ${num}`);
    let result = await fetch(url, data);
    console.log(`Received API request ${num}`);
    currentRequests--
    return result;
  }
}

async function getSystemInfo(system = 'lhexq') {
  let url = rootUrl + `/systems/${system}`
  try {
    let res = await delayedFetch(url, basicAuth())
    return await res.json();
  } catch (error) {
    console.log(error);
  }
}
async function getMemberObjectList(system = 'lhexq') {
  let url = rootUrl + `/systems/${system}/members`
  try {
    let res = await delayedFetch(url, basicAuth())
    return await res.json();
  } catch (error) {
    console.log(error);
  }
}
async function getMember(id = 'qkxux') { // Lucky's member ID
  let url = rootUrl + "/members/" + id
  try {
    let res = await delayedFetch(url, basicAuth())
    return await res.json();
  } catch (error) {
    console.log(error);
  }
}

async function newMember(callsign, details) {
  // #todo combine with validate function/have those work together
  let url = rootUrl + "/members"
  let memberData = newMemberPkFromCallsign(callsign);
  // #todo add details
  let data = {
    method: 'POST', // GET, POST, PUT, DELETE, etc.
    headers: {
      "Content-Type": "application/json",
      Authorization: basicAuth().headers.Authorization
    },
    body: JSON.stringify(memberData)
  }  
  // if alt, set entirely private
  // if alt, add to group zdytf
  try {
    let res = await delayedFetch(url, data)
    let pk = await res.json()
    updatePkInfo(pk); // update current data with new member
    return pk;
  } catch (error) {
    console.log(error);
  }
}

async function reportBack(comment, data) {
  // @todo test
  let json = await data
  if (!json) {
    console.error(comment + ": " + "No value returned")
  } else {
    log(comment + ": " + pretty(json));
  }
}
async function editMember(id, obj) {
  let url = rootUrl + "/members/" + id
  let etc = {
    method: 'PATCH', // GET, POST, PUT, DELETE, etc.
    headers: {
      "Content-Type": "application/json",
      Authorization: basicAuth().headers.Authorization
    },
    body: JSON.stringify(obj)
  }
  try {
    delayedFetch(url, etc).then(d => reportBack("Member edited", d.json()));
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function setDisplayName(id, newName) {
  return editMember(id, { display_name: newName })
}

// see https://pluralkit.me/api/endpoints/#switches
async function getFronters(system = 'lhexq') {
  let url = rootUrl + "/systems/" + system + "/fronters"
  let etc = {
    method: 'GET', // GET, POST, PUT, DELETE, etc.
    headers: {
      "Content-Type": "application/json",
      Authorization: basicAuth().headers.Authorization
    }
  }
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
async function isMember(m) {
  if (!idFromCallsign(m)) {
    let nm = await newMember(m);
    return nm.id;
  } else {
    return idFromCallsign(m);
  }
}
async function reportSwitch(active = getActive(), system = 'lhexq') {

  // ONLY REPORT MAIN IDs, NEVER ALT IDs:
  active = active.map(mainCallsign);
  
  function validateSwitch() {
    let ok = true;
    digits().forEach(d => {
      if (occurs(active.join(''), d) > 1) {
        error(`${d} cannot be in two fusions at once!`);
        ok = false;
      }
    });
    return ok;
  }

  if (validateSwitch()) {
    try {
      let idList = active.map(isMember);
      let url = rootUrl + "/systems/" + system + "/switches"
      Promise.all(idList).then(list => {
        log("Reporting switch with IDs: " + list.join(', '));
        let etc = {
          method: 'POST', // GET, POST, PUT, DELETE, etc.
          headers: {
            "Content-Type": "application/json",
            Authorization: basicAuth(true).headers.Authorization
          },
          // #later support also timestamp?
          body: JSON.stringify({ members: list })
        }
        delayedFetch(url, etc)
      });
      return true;
    } catch (error) {
      alert(error);
      return false;
    }
  } else {
    return false;
  }
}
