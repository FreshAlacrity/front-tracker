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
    proxies: ['',"'",'"'],
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
  updateUrl({active: active.join('~') });
  // #later also update page title?
  data.page.active_list.defaultValue = active.join(", ");
  data.page.active_list.value = active.join(", ");
}

function loadFromPkMemberList(list) {
  list.forEach(pk => { updatePkInfo(pk) });
  updateAllHeadmateTiles();
}
function loadFromPk() {
  console.log("Loading all members directly from PK");
  getMemberObjectList().then(loadFromPkMemberList);
}
function resetList() {
  updatePage(digits());
}
function init() {
  // add tiles for the current member list
  makeInitialList().forEach(addHeadmateTile)

  // load in info from system.js file & update tiles
  loadFromPkMemberList(exported.members);

  // see https://codepen.io/eahartmann/pen/bGvaMvy
  const urlParams = new URLSearchParams(window.location.search);

  // load in from PK and update tiles
  if (urlParams.has('live') === true) { loadFromPk() }

  // flip to alt accounts
  if (urlParams.has('alts') === true) { flipTiles() }

  // get current fronters list and update statuses accordingly
  let active = []
  if (urlParams.has('active') === true) {
    active = validateMemberListInput(urlParams.get('active'), false);
  } else {
    active = digits();
  }
  updatePage(active);

  data.page.active_list.addEventListener("focusout", activeListInput);
  data.page.active_list.addEventListener("keypress", function(event) {
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
