// see https://www.javascripttutorial.net/javascript-fetch-api/
// requires an auth token set to pkToken variable

let totalRequests = 0;
let currentRequests = 0;
let requestAfter = 0;
let rootUrl = "https://api.pluralkit.me/v2"

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


async function getAllMembers(system = 'lhexq') {
  let url = rootUrl + `/systems/${system}/members`
  let data = {
    headers: {
      Authorization: pkToken
    }
  }
  try {
    let res = await delayedFetch(url, data)
    return await res.json();
  } catch (error) {
    console.log(error);
  }
}

async function getMember(id = 'pbbdj') {
  let url = rootUrl + "/members/" + id // Jes's member ID
  let data = {
    headers: {
      Authorization: pkToken
    }
  }
  try {
    let res = await delayedFetch(url, data)
    return await res.json();
  } catch (error) {
    console.log(error);
  }
}

async function newMember(callsign) {
  // #todo combine with validate function/have those work together
  let url = rootUrl + "/members"
  let newMemberObject = {
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
  
  let data = {
    method: 'POST', // GET, POST, PUT, DELETE, etc.
    headers: {
      "Content-Type": "application/json",
      Authorization: pkToken
    },
    body: JSON.stringify(newMemberObject)
  }
  // if alt, add parenthetical to name with nickname from main
  // if alt, set entirely private
  // if alt, add to group zdytf
  try {
    let res = await delayedFetch(url, data)
    return await res.json();
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
      Authorization: pkToken
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