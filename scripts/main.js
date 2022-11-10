// GLOBAL STORAGE
// keep total storage under 700 mb (including all the files)
var data = {
  page: {
    container: document.getElementById("fronters"),
    active_list: document.getElementById("active-list"),
    show_available: document.getElementById("show-available"),
    show_unavailable: document.getElementById("show-unavailable")
  },
  setup: {
    show: {
      available: false,
      unavailable: false
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

function init() {
  // add tiles for the current member list
  sortByCallsign(makeInitialList()).forEach(addHeadmateTile)

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

  if (urlParams.has('active') === true && urlParams.get('active') !== "fronters") {
    // get list from url
    let active = validateMemberListInput(paramValue(urlParams, 'active'), false);
    data.page.active_list.value = paramValue(urlParams, 'active');
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

  // set up show/hide checkboxes
  // #todo streamline this
  data.page.show_available.checked = data.setup.show.available;
  data.page.show_available.addEventListener('change', function() {
    data.setup.show.available = this.checked;
    updatePage()    
  });
  data.page.show_available.checked = data.setup.show.unavailable;
  data.page.show_unavailable.addEventListener('change', function() {
    data.setup.show.unavailable = this.checked;
    updatePage()
  });

  //loadFromPK();
  // #todo also get fronters?

  // remember that double clicking a portrait can also do this:
  //newMember("149");
}
init()
