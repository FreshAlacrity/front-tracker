// GLOBAL STORAGE
// keep total storage under 700 mb (including all the files)
var data = {
  page: {
    container: document.getElementById("fronters"),
    active_list: document.getElementById("active-list"),
    settings: document.getElementById("controls"),
    toggles: {
      available: document.getElementById("toggle-available"),
      unavailable: document.getElementById("toggle-unavailable"),
      live: document.getElementById("toggle-live")
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

  // checkbox options/toggles:
  let viewing = "active";
  if (urlParams.has('show')) { viewing = urlParams.get('show') }
  //`?show=active/available/all`
  
  // #todo add more informative titles + labels for the checkboxes
  // #later add a toggle alts checkbox using flipTiles()
  let toggles = {
    available: {
      default: (viewing === "available" || viewing === "all"),
      action: updateOnToggle
    },
    unavailable: {
      default: (viewing === "all"),
      action: updateOnToggle
    },
    live: {
      default: !urlParams.get('live'),
      action: toggleLive
    }
  };
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

  //loadFromPK();

  // remember that double clicking a portrait can also do this:
  //newMember("149");
}
init()
