
function onClick(event) {
  if (window.event.ctrlKey) {
    function updateTargetStatus(targetCS, isPresent) {
      function unmerge(callsign) {
        callsign.split('').forEach(d => {
          setStatus(d, "present", true);
        });
        setStatus(callsign, "present", false);
      }
      function toggleOn(callsign) {
        setStatus(callsign, "present", true);

        // for digits:
        setStatus(callsign, "resting", false);

        // make sure only headmates that can coexist are present:
        let bigSibs = headmates[callsign].in;
        let lilSibs = headmates[callsign].components;
        let sideSibs = headmates[callsign].siblings;
        let all = [].concat(sideSibs, lilSibs, bigSibs);
        all = sortByCallsign(all).reverse();
        all.forEach(s => {
          if (s.length > 1 && checkStatus(s, "present")) {
            unmerge(s);
          }
          setStatus(s, "present", false);
        });
      }
      function toggleOff(callsign) {
        console.log("Toggle Off called for " + callsign);
        setStatus(callsign, "present", false);
        if (callsign.length == 1) {
          setStatus(callsign, "resting", true);
        } else {
          unmerge(callsign);
        }
      }
      if (isPresent) {
        toggleOff(targetCS);
      } else {
        toggleOn(targetCS);
      }
    }
    function updateTileClasses() {
      for (const [callsign, value] of Object.entries(headmates)) {
        let e = elementByCallsign(callsign);
        if (e) { // accounting for tiles that may not be present
          e.classList.toggle("available", value.status.available);
          e.classList.toggle("present", value.status.present);
          e.style.order = sortOrder(callsign, value);
        }
      }
    }

    let callsign = event.target.id.slice("icon-front-".length);
    if (event.target.id.slice(0, "icon-front-".length) !== "icon-front-") {
      callsign = event.target.id.slice("icon-back-".length);
    }

    let isPresent = elementByCallsign(callsign).classList.contains("present");

    updateTargetStatus(callsign, isPresent);
    setAvailability();
    updateTileClasses();
  }
}
function onDoubleClick(event) {
  // @later add public links too (if no auth key): https://dash.pluralkit.me/profile/m/cbkpk
  // @todo have it detect and make new members for alt mode also

  let callsign = event.target.id.slice("icon-front-".length);
  if (event.target.id.slice(0, "icon-front-".length) === "icon-front-") {
    if (headmates.hasOwnProperty(callsign) && headmates[callsign].pk) {
      //console.log(JSON.stringify(headmates[callsign].pk, null, 2));
      window.open(`https://dash.pluralkit.me/dash/m/${headmates[callsign].pk.id}`, "_blank");
    } else {
      // catch and make new member
      if (confirm(`${callsign} doesn't have a registered proxy. Create one now?`)) {
        console.log(`${callsign} doesn't have a registered proxy. Creating one now...`);
        newMember(callsign).then(m => {
          headmates[callsign].pk = m;
          console.log(`New member object: ${JSON.stringify(headmates[callsign].pk, null, 2)}`);
          addPluralKitDetails(m);
        })
      }
    }
  }
}

function nameChange(event) {
  let newName = event.target.value;
  let oldName = event.target.placeholder;
  if (newName !== oldName) {
    let callsign = event.target.id.slice("name-for-".length)
    if (headmates[callsign]) {
      let edits = { name: newName }
      let m = headmates[callsign].pk
      let isAlt = event.target.id.slice("alt-name-".length) === "alt-name";
      if (isAlt) { 
        callsign += "'" 
        m = headmates[callsign].pk_alt
      }

      if (m.display_name) {
        edits.display_name = m.display_name.replace(oldName, newName);        
      } else {
        edits.display_name = `${callsign} | ${newName}`;
      }

      // if a proxy exists:
      let prompt = `Change name for ${callsign} from ${oldname} to ${newName}?`
      prompt += `\n (WIP/not yet implemented)`; // @todo remove


      if (confirm(prompt)) {



        editMember(id, { name: newName })
      } else {
        if (oldName !== "Unnamed") {
          event.target.value = oldName;
        } else {
          event.target.value = '';
        }
      }
    }

    // if no proxy exists
    /*
    if (confirm(`${callsign} doesn't have a registered proxy. Create one now?`)) {
      console.log(`${callsign} doesn't have a registered proxy. Creating one now...`);
      newMember(callsign).then(m => {
        headmates[callsign].pk = m;
        console.log(`New member object: ${JSON.stringify(headmates[callsign].pk, null, 2)}`);
        addPluralKitDetails(m);
      })
    }
  
    editMember(id, { 
      name: newName,
      display_name: newName 
    })
    */
    // find new display_name

  } else {
    alert("How odd...how did you change a name for an unregistered headmate? Callsign: " + callsign);
  }
}
