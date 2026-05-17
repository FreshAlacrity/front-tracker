// TRANSIENT STORAGE
// keep total storage under 700 mb (including all the files)
var data = {
  page: {
    container:   document.getElementById("members"),
    active_list: document.getElementById("active-list"),
    settings:    document.getElementById("controls"),
    toggles: {
      available:   { action: updateOnToggle, default: true },
      unavailable: { action: updateOnToggle },
      live:        { action: toggleLive, default: false }, // #todo revert this to true when deploying
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
  ui_setFooter("Footer Test");
  info("Welcome");

  // Build/setup for the interactive parts of the UI
  ui_makeCheckboxes();
  ui_addListInputListener();

  // make the base member list and add tiles for each member
  // #todo make this dynamic so it adds a tile for each PK ID instead
  sortByCallsign(makeInitialList()).forEach(addHeadmateTile);

  // Disabling url params while troubleshooting
  //update_fromUrlParameters();

  storage_loadAll();

  info("End init");
}
init()
