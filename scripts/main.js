// GLOBAL STORAGE
// keep total storage under 700 mb (including all the files)
var data = {
  page: {
    container: document.getElementById("fronters"),
    active_list: document.getElementById("active-list"),
  },
  setup: {
    digits: 9,
    member: {
      alts: 3,
    }
  },
  structure: {
    proxies: ['', "'", '"'],
    relatives: {},
    statuses: {}
  },
  members_by_callsign: {},
  callsigns_by_name: {},
  callsigns_by_id: {}
}
function loadFronters() {
  // #todo also note the timestamp and how long ago that was
  getFronters().then(d => {
    log(d.members)
    // #later make a way to check this data against existing data?
    //loadFromPkMemberList(d.members);
    updatePage(d.members.map(getCallsign))
  });
}
function getActive(doAlert) {
  return validateMemberListInput(data.page.active_list.value, doAlert)
}
function activeListInput() {
  // on Enter key or focus leaves active list text box
  updatePage(getActive(true));
}
function updatePage(active) {
  active = sortByCallsign(active);
  updateTileClasses(active);

  let activeList = active.join('~');
  if (activeList === digits().join('~')) {
    // don't bother adding it to the url if it's the default list
    // #todo don't save if the page is showing the current fronters?
    activeList = ''
  }
  updateUrl({ active: activeList });

  // #later also update page title?
  data.page.active_list.defaultValue = active.join(", ");
  data.page.active_list.value = active.join(", ");
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
function init() {
  // add tiles for the current member list
  makeInitialList().forEach(addHeadmateTile)

  // load any member objects that have been cached
  loadFromLocalForage();

  // see https://codepen.io/eahartmann/pen/bGvaMvy
  const urlParams = new URLSearchParams(window.location.search);

  // load in from PK and update tiles unless that's actively prevented
  let localOnly = (urlParams.has('live') && !!urlParams.get('live'))
  if (localOnly) {
    log("Loading remote data prevented by url parameter 'live=false'")
  } else {
    loadFromPk();
  }

  // flip to alt accounts
  if (urlParams.has('alts') === true) { flipTiles() }

  if (urlParams.has('active') === true) {
    // get list from url
    let active = validateMemberListInput(paramValue(urlParams, 'active'), false);
    updatePage(active);
  } else {
    // get current fronters from PK
    loadFronters();
  }
  

  data.page.active_list.addEventListener("focusout", activeListInput);
  data.page.active_list.addEventListener("keypress", function (event) {
    // If the user presses the "Enter" key on the keyboard
    if (event.key === "Enter") {
      // Cancel the default action, if needed
      event.preventDefault();
      activeListInput();
    }
  });

  //loadFromPK();
  // #todo also get fronters?

  // remember that double clicking a portrait can also do this:
  //newMember("149");
}
init()
