
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

    let callsign = event.target.id.slice("tile-".length);
    // it's generally icons being clicked now but icon- is the same length
    let isPresent = elementByCallsign(callsign).classList.contains("present");
    
    updateTargetStatus(callsign, isPresent);
    setAvailability();
    updateTileClasses();
  }
}
function onDoubleClick(event) {  
  // @later add public (if no auth key): https://dash.pluralkit.me/profile/m/cbkpk
  // @todo have it detect alt mode (or open alt on CTRL + double click?)
  let callsign = event.target.id.slice("icon-".length);
  if (headmates.hasOwnProperty(callsign) && headmates[callsign].pk) {
    console.log(JSON.stringify(headmates[callsign].pk, null, 2));
    window.open(`https://dash.pluralkit.me/dash/m/${headmates[callsign].pk.id}`, "_blank");
  } else {    
    // @todo catch and make new member
    alert(`${callsign} doesn't have a registered proxy. Creating one now...`);
    console.log(`${callsign} doesn't have a registered proxy. Creating one now...`);
    newMember(callsign).then(m => {
      headmates[callsign].pk = m
      console.log(`New member object: ${JSON.stringify(headmates[callsign].pk, null, 2)}`);
      // @todo update the tile
      addPluralKitDetails(m)
    })
  }
}
function nameChange(event) {
  
  //editMember(id, { display_name: newName })
}
