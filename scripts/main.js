// GLOBAL STORAGE
// keep total storage under 700 mb (including all the files)
var data = {
  page: {
    container: document.getElementById("members"),
    active_list: document.getElementById("active-list"),
    settings: document.getElementById("controls"),
    toggles: {
      available: { action: updateOnToggle },
      unavailable: { action: updateOnToggle },
      live: { action: toggleLive }
    }
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
  function makeCheckboxes() {
    // #todo add more informative titles + labels for the checkboxes
    // #todo add this to toggles instead:
    // flip to alt accounts
    //if (urlParams.has('alts') === true) { flipTiles() }
    let toggles = data.page.toggles
    for (const [key, value] of Object.entries(toggles)) {
      let checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.name = "toggle " + key;
      checkbox.title = "toggle " + key;
      checkbox.id = "toggle-" + key;
      checkbox.checked = value.default;
      checkbox.addEventListener('change', value.action);
      data.page.settings.appendChild(checkbox);
    };
  }
  function addListInputListener() {
    data.page.active_list.addEventListener("focusout", activeListInput);
    data.page.active_list.addEventListener("keypress", function (event) {
      // If the user presses the "Enter" key on the keyboard
      if (event.key === "Enter") {
        // Cancel the default action, if needed
        event.preventDefault();
        activeListInput();
      }
    });
  }

  makeCheckboxes();
  addListInputListener();

  // make the base member list and add tiles for each member
  sortByCallsign(makeInitialList()).forEach(addHeadmateTile)
  loadUrlParameters();

  // load any member objects that have been cached
  localforage.iterate(function (pk, id, iterationNumber) {
      updatePkInfo(pk, true); // prevents immediately re-saving
    }).then(function () {
      updateAllHeadmateTiles();
      activeListInput();
      log("Locally cached member data loaded");
    }).catch(err => { error(err) })

    // load in from PK and update tiles unless that's actively prevented
    if (getToggle("live")) { loadFromPk() } else {
      log("Loading remote data prevented by url parameter 'live=false'");
    }
}
init()
