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
      live:        { action: toggleLive, default: true },
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
  members_by_callsign: {},
  callsigns_by_name: {},
  callsigns_by_id: {}
}

function saveToken(input) {
  data.setup.token = input;
  localforage.setItem('token', input).then(function (value) {
      // Do other things once the value has been saved.
      log("Token saved to local storage");
  }).catch(function(err) {
      // This code runs if there were any errors
      log(err);
  });
}

function inputToken() {
  let input = window.prompt("Enter your PK Token:","Use `pk;token` to have the PK bot DM yours to you or request it from an admin.");
  if (validateToken(input)) {
    saveToken(input)
    alert("Thank you.")
  } else {
    alert("Sorry, that is not a valid token.")
  }
}

function validateToken(input) {
  // #later actually check this with the PK server
  return (input.length === 64)
}

function clearToken() {
  data.setup.token = "";
  localforage.removeItem('token').then(function() {
      // Run this code once the key has been removed.
      alert("Token cleared.");
  }).catch(function(err) {
      // This code runs if there were any errors
     alert("Issue clearing token: " + err);
  });  
}

function toggleEditing() {
  // #todo
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
      if (id !== "token") {
        updatePkInfo(pk, true); // prevents immediately re-saving
      } else {
        if (validateToken(pk)) { 
          log("Saved token validated");
          saveToken(pk);
        } else {
          log("Saved token invalid");
        }
      }
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
