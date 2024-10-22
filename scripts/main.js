// GLOBAL STORAGE
// keep total storage under 700 mb (including all the files)
var data = {
  page: {
    container:   document.getElementById("members"),
    active_list: document.getElementById("active-list"),
    settings:    document.getElementById("controls"),
    toggles: {
      available:   { action: updatePage, default: true },
      unavailable: { action: updatePage },
      live:        { action: toggleLive, default: true }, // #todo revert this to true for live version
      local:       { action: updatePage, default: true }, // #todo revert this to true for live version
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

function saveToken (input) {
  data.setup.token = input;
  localforage.setItem('token', input).then(function (value) {
    log("Token saved to local storage");
  }).catch(function (err) { console.error(err) });
}

function inputToken () {
  let input = window.prompt("Enter your PK Token:","Use `pk;token` to have the PK bot DM yours to you or request it from an admin.");
  if (validateToken(input)) {
    saveToken(input)
    alert("Thank you.")
  } else {
    alert("Sorry, that is not a valid token.")
  }
}

function validateToken (input) {
  // #later actually check this with the PK server
  return (input.length === 64)
}

function clearToken () {
  data.setup.token = "";
  localforage.removeItem('token').then(function() {
      // Run this code once the key has been removed.
      alert("Token cleared.");
  }).catch(function (err) { console.error(err) });
}

function toggleEditing () {
  // #todo #later
  log(`WIP - edit mode currently not implemented`)
}

function init () {
  pkData.hello()

  // Build/setup for the interactive parts of the UI
  function makeCheckboxes () {
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
  function addListInputListener () {
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
  function loadFromPk () {
    if (getToggle("live")) {
      log("Loading all members directly from PK");
      fetchMemberObjectList().then(list => {
        list.forEach(pk => { updatePkInfo(pk) });
        updateAllHeadmateTiles()
        activeListInput() // also updates the page
        log("PluralKit member data loaded through via API")
      }).catch(function (err) { console.error(err) });
    } else {
      log("Loading remote data prevented setting 'live=false'");
    }
  }
  async function loadLocal () {
    if (getToggle("local")) { 
      log("Loading locally cached member data")
      // load any member objects that have been cached
      await localforage.iterate(function (data, key, iterationNumber) {
        if (key !== "token") {
          // currently all non-token values saved to storage are pk member objects
          updatePkInfo(data, true); // bool prevents immediately re-saving
        } else {
          if (validateToken(data)) { 
            log("Saved token validated");
            saveToken(data);
          } else {
            log("Saved token invalid");
          }
        }
      })
      updateAllHeadmateTiles()
      activeListInput() // also updates the page
      log("Locally cached member data loaded")
      return true
    } else {
      log("Loading local data prevented setting 'local=false'");
      return false
    }
  }

  makeCheckboxes();
  addListInputListener();
  loadUrlParameters(); // can we do this ahead of the checkboxes, so those reflect url values when they load?
  
  // Load in local data first in case it contains a token used to authenticate PK API calls
  loadLocal().then(r => {
      loadFromPk()

      // Test functions can go here for now:
      
      
    })
  
}
init()
