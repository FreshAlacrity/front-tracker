function reflow () {
  // Currently unused, but may come in handy; triggers DOM reflow
  // see https://gist.github.com/paulirish/5d52fb081b3570c81e3a
  let foo = window.scrollX;
}
function showMessage (text) {
  // #later have this show on the page in a designated area and support different background colors
  console.info(text)
}
function loadFronters () {  
  getFronters().then(d => {  
    showMessage("Loaded switch logged at: " + d.timestamp) // #later note the time logged and how long ago that was in a message
    log("Updating active members: " + d.members.map(d => d.id).join(", "))

    // Without changing the search box to names it's harder to search for possible copilots, but this is clunky
    // #todo sort out how to preload this in a nice way and then include as a search result match + add a css class for fronters to show that nicely
    data.page.active_list.value = d.members.map(d => getNickname(d))
    // #todo alert if no fronters found
    updatePage(d.members.map(d => d.id))
  });
}
function activeListInput () {
  // Runs on Enter key or when focus leaves active list text box
  let mapToFront = ["fronters", "front", "fronter", "", undefined]
  if (mapToFront.includes(data.page.active_list.value.toLowerCase())) {
    loadFronters()
  } else {
    updatePage()
  }
}
function updatePage (overrideList = []) {
  function updateUrl (paramsObj = {}) {
    // Set new url parameters

    // #todo set as params anything that is not set to defaults
    // #later check to make sure there's no '#' in any of the paramsObj values (why?)
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

    // see https://stackoverflow.com/questions/824349/how-do-i-modify-the-url-without-reloading-the-page
    // and https://stackoverflow.com/questions/13348766/securityerror-the-operation-is-insecure-window-history-pushstate
    if (window.location.origin == "null") {
      log(`Running locally; url params would have been set to ${params.toString()}`)
    } else {
      let url = `${window.location.origin}${window.location.pathname}?${params.toString()}`
      window.history.pushState({}, 'New Page Title Here #todo', url) // this causes an error when running locally
    }
  }
  
  log("Updating the page")
  updateTileClasses(overrideList);

  let show = "active"
  if (getToggle("unavailable")) { show = "all" }
  else if (getToggle("available")) { show = "available" }

  // this doesn't actually do what we want; putting a list of Ids in the textbox is needlessly confusing, maybe convert to names?
  //if (setTextbox) { data.page.active_list.value = active.join(", ") }
  updateUrl({
    active: data.page.active_list.value,
    show: show,
    live: getToggle("live")
  });
}

function loadUrlParameters (localForageSuccessBool) {
  function paramValue (urlParams, key) {
    // decodes the encoding that updateUrl uses
    // see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/decodeURIComponent
    return decodeURIComponent(urlParams.get(key).replace(/\+/g, " "));
  }

  // Stores applicable url parameter values to data.page properties
  // see https://codepen.io/eahartmann/pen/bGvaMvy
  const urlParams = new URLSearchParams(window.location.search);
  
  let viewing = "active"; // default value
  if (urlParams.has('show')) { viewing = urlParams.get('show') }
  //`?show=active/available/all`

  // update checkboxes from url parameters
  // #later make a function/switch to handle these?
  Object.keys(data.page.toggles).forEach(toggle => {
    let toggleStates = {
      available: (viewing === "available" || viewing === "all"),
      unavailable: (viewing === "all")
    }

    let checkbox = document.getElementById("toggle-" + toggle);    
    if (urlParams.has(toggle)) {
      if (toggleStates[toggle]) {
        checkbox.checked = toggleStates[toggle];
      } else {
        checkbox.checked = !!urlParams.get(toggle);
      }
    } else {
      checkbox.checked = !!data.page.toggles[toggle].default;
    }
    
  });

  if (urlParams.has('active')) {
    data.page.active_list.value = paramValue(urlParams, 'active')
  }
}

function clearLocalData () {
  // via https://localforage.github.io/localForage/#data-api-clear
  localforage.clear().then(function () {
    // Run this code once the database has been entirely deleted.
    log('Local storage cleared');
  }).catch(function (err) { console.error(err) });
}

function onTileClick (event) {
  if (window.event.ctrlKey) {
    let pkId = event.target.id.slice("icon-front-".length);
    if (event.target.id.slice(0, "icon-front-".length) !== "icon-front-") {
      pkId = event.target.id.slice("icon-back-".length);
    }
    // #todo get this working again
    updatePage(updateActiveList(listActive(), pkId), true);
  }
}
function onDoubleClick (event) {
  // #later add public links too (if no auth key): https://dash.pluralkit.me/profile/m/cbkpk
  // #todo have it detect and make new members for alt mode also

  let callsign = event.target.id.slice("icon-front-".length);
  let id = idFromCallsign(callsign);

  if (getToggle("editing")) {
    if (event.target.id.slice(0, "icon-front-".length) === "icon-front-") {
      
      if (id) {
        window.open(`https://dash.pluralkit.me/dash/m/${id}`, "_blank");
      } else {
        // catch and make new member
        if (confirm(`${callsign} doesn't have a registered proxy. Create one now?`)) {
          log(`${callsign} doesn't have a registered proxy. Creating one now...`);
          newMember(callsign).then(pk => {
            log(`New member object for member with callsign ${callsign}:\n${pretty(pk)}`);
          });
        }
      }
    } // #todo later open edit link for backs also
  } else {
    if (id) {
      window.open(`https://dash.pluralkit.me/profile/m/${id}`, "_blank");
    } else {
      alert("Oops! This member doesn't have a page yet.");
    }
  }
}

function toggleLive (event) {
  if (event.target.checked) {
    updatePage() // updates the URL params etc
    showMessage("Loading in most recent data from PK")
    loadFromPk()
  } else {
    updatePage() // updates the URL params etc
  }
}

function nameChange (event) {
  // #todo test + troubleshoot
  // #todo use updateNameList() also
  function resetNameField () {
    if (oldName !== "Unnamed") {
      event.target.value = oldName;
    } else {
      event.target.value = '';
    }
  }
  let newName = event.target.value;
  let oldName = event.target.placeholder;
  log(`Name change event fired, comparing ${newName} to ${oldName}...`)
  if (newName !== '' && newName !== oldName) {
    let callsign = event.target.id.slice("name-for-".length)
    let isAlt = (event.target.id.slice("alt-name-".length) === "alt-name");
    if (isAlt) { callsign += "'" } // #later make this more elegant    
    if (idFromCallsign(callsign)) {
      log(`Name change event fired for existing member with callsign ${callsign}...`)
      // a proxy exists:
      let prompt = `Change name for ${callsign} from ${oldName} to ${newName}?`
      if (oldName === "Unnamed") {
        prompt = `Change name for ${callsign} to ${newName}?`
      }
      if (confirm(prompt)) {
        // #todo also automatically update nickname note and add parenthetical
        event.target.placeholder = newName;
        let edits = { name: newName }
        let m = getPkObject(callsign)
        if (m.display_name) {
          edits.display_name = m.display_name.replace(oldName, newName);
        } else {
          edits.display_name = `${callsign} | ${newName}`;
        }
        edits.proxy_tags = m.proxy_tags;
        edits.proxy_tags.push(
          { prefix: null, suffix: " -" + newName },
          { prefix: newName + ": ", suffix: null }
        );
        editMember(m.id, edits)
      } else {
        resetNameField();
      }
    } else {
      log(`Name change event fired for new member with callsign ${callsign}...`)
      // #todo test
      if (confirm(`${callsign} doesn't have a registered proxy. Create one with this name: '${newName}'?`)) {
        console.log(`${callsign} doesn't have a registered proxy. Creating one with name ${newName} now...`);
        event.target.placeholder = newName;
        newMember(callsign, {
          name: newName,
          display_name: callsign + " | " + newName,
          proxy_tags: [
            // #todo add new proxy tags to existing ones
            { prefix: null, suffix: " -" + newName },
            { prefix: newName + ": ", suffix: null },
            { "prefix": null, "suffix": " -" + callsign },
            { "prefix": callsign + ": ", "suffix": null }
          ]
        })
      } else {
        resetNameField();
      }
    }
  }
}

