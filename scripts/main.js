// GLOBAL STORAGE
// keep total storage under 700 mb (including all the files)
var data = {
  page: {
    container:   document.getElementById("members"),
    active_list: document.getElementById("active-list"),
    settings:    document.getElementById("controls"),
    toggles: {
      available:   { action: updateOnToggle, default: true },
      unavailable: { action: updateOnToggle },
      live:        { action: toggleLive, default: false }, // #todo revert this to true for
      editing:     { action: toggleEditing  }
    }
  },
  setup: {
    token: "",
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
  members_by_id: {},
  ids_by_ref: {}
}


function toggleEditing () {
  // #todo #later
}

function init () {
  toast("Welcome");

  // Build/setup for the interactive parts of the UI
  makeCheckboxes();
  addListInputListener();

  // make the base member list and add tiles for each member
  // #todo make this dynamic so it adds a tile for each PK ID instead
  sortByCallsign(makeInitialList()).forEach(addHeadmateTile)
  loadUrlParameters();

  storage_loadAll()
}
init()
