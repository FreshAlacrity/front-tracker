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
