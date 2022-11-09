function showMessage(text) {
  // #later have this show on the page in a designated area
  error(text);
}
function loadFronters() {
  // #todo also note the timestamp and how long ago that was  
  getFronters().then(d => {
    log(d.members)
    // #later make a way to check this data against existing data?    
    //loadFromPkMemberList(d.members);
    data.page.active_list.value = "fronters";
    updatePage(d.members.map(getCallsign))
  });
}
function getActive(doAlert) {
  return validateMemberListInput(data.page.active_list.value, doAlert)
}
function activeListInput() {
  // runs on Enter key or when focus leaves active list text box
  if (getActive() !== "fronters") {
    updatePage(getActive(true));
  } else {
    loadFronters();
  }
}
function updatePage(active = getActive()) {
  active = sortByCallsign(active);
  updateTileClasses(active);

  updateUrl({ active: data.page.active_list.value });

  // #later also update page title?
  //data.page.active_list.defaultValue = active.join(", ");
  //data.page.active_list.value = active.join(", ");
}
function loadFromPkMemberList(list) {
  list.forEach(pk => { updatePkInfo(pk) });
  updateAllHeadmateTiles();
}
function loadFromPk() {
  log("Loading all members directly from PK");
  getMemberObjectList().then(loadFromPkMemberList);
}
function loadFromLocalForage() {
  log("Loading locally cached member data");
  localforage.iterate(function (pk, id, iterationNumber) {
    //log(`Loading member from local cache: ${pretty(pk)}`)
    updatePkInfo(pk, true); // prevents immediately re-saving
  }).then(function () {
    updateAllHeadmateTiles();
    log("All locally cached member data loaded");
  }).catch(function (err) {
    // This code runs if there were any errors
    error(err);
  });
}
function clearLocalData() {
  // via https://localforage.github.io/localForage/#data-api-clear
  localforage.clear().then(function () {
    // Run this code once the database has been entirely deleted.
    log('Local storage cleared');
  }).catch(function (err) {
    // This code runs if there were any errors
    error(err);
  });
}
function resetList() {
  updatePage(digits());
}

function onClick(event) {
  if (window.event.ctrlKey) {
    let callsign = event.target.id.slice("icon-front-".length);
    if (event.target.id.slice(0, "icon-front-".length) !== "icon-front-") {
      callsign = event.target.id.slice("icon-back-".length);
    }
    updatePage(updateActiveList(getActive(), callsign));
  }
}
function onDoubleClick(event) {
  // #later add public links too (if no auth key): https://dash.pluralkit.me/profile/m/cbkpk
  // #todo have it detect and make new members for alt mode also

  let callsign = event.target.id.slice("icon-front-".length);
  if (event.target.id.slice(0, "icon-front-".length) === "icon-front-") {
    let id = idFromCallsign(callsign);
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
  }
}

function nameChange(event) {
  // #todo test + troubleshoot
  // #todo use updateNameList() also
  function resetNameField() {
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
