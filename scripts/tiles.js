function htmlIdStringByPkId (pkId) {
  // #todo consider if we need this at all when using PK Ids
  // see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent
  return encodeURIComponent(pkId).replace(
    /[!'()*]/g,
    (c) => `%${c.charCodeAt(0).toString(16).toUpperCase()}`
  );
}
function elementByPkId (pkId) {
  return document.getElementById(`tile-${htmlIdStringByPkId(pkId)}`);
}

// used in init()
function addHeadmateTile (pkId) {
  let idString = htmlIdStringByPkId(pkId);
  function makeCoin () {
    let coin = document.createElement("div");
    coin.addEventListener("click", onTileClick);
    coin.classList.add("flip-coin");
    coin.classList.add("hidden"); // #here
    coin.id = `tile-${idString}`;
    data.page.container.appendChild(coin);

    let coinFaces = document.createElement("div");
    coinFaces.classList.add("flip-coin-inner");
    coin.appendChild(coinFaces);
    return coinFaces;
  }
  function coinFace (type = "front") {
    let coinFront = document.createElement("div");
    coinFront.classList.add("flip-coin-" + type);

    let icon = document.createElement("div");
    icon.id = `icon-${type}-${idString}`;
    icon.addEventListener("dblclick", onDoubleClick);
    icon.classList.add("icon");
    icon.style.backgroundColor = getBgColor(pkId);
    coinFront.appendChild(icon);
    //coinFront.title = '';

    let name = document.createElement("div");
    name.id = `name-${type}-${idString}`;
    name.textContent = pkId;
    coinFront.appendChild(name);

    coinFront.title += '\n' + status;
    return coinFront;
  }

  let coin = makeCoin();
  coin.appendChild(coinFace("front"));
  coin.appendChild(coinFace("back"));
}

// #todo update local variable name, using PK ID now instead of callsigns
function updateHeadmateTile (pkId) {
  let pk = getPkObject(pkId);
  let idString = htmlIdStringByPkId(pkId);
  function nameElement (type) {
    let element = document.createElement("div");
    element.id = `name-${type}-${idString}`;

    // Set visible callsign
    // #todo adjust for alt accounts?
    // #todo set smaller font for longer callsigns?
    element.innerHTML = getCallsign(pk, 0);

    // Make editable nickname field
    let nickname = getNickname(pk);    
    let nicknameElement = document.createElement("div");
    if (getToggle("editing")) {
      nicknameElement = document.createElement("input");
      nicknameElement.addEventListener("focusout", nameChange);
      nicknameElement.addEventListener("keypress", function(event) {
        // If the user presses the "Enter" key on the keyboard
        if (event.key === "Enter") {
          // Cancel the default action, if needed
          event.preventDefault();
          nameChange(event);
        }
      });
      if (nickname !== "Unnamed") {
        nicknameElement.defaultValue = nickname;
        nicknameElement.value = nickname;
        nicknameElement.placeholder = nickname; // used to detect name changes
      } else {
        nicknameElement.placeholder = nickname;
      }
    } else {      
      nicknameElement.textContent = nickname; // for non-editing mode
    }
    nicknameElement.classList.add("name");
    
    if (type === "front") {
      nicknameElement.id = `name-for-${idString}`
    } else {
      nicknameElement.id = `alt-name-for-${idString}`
    }
    element.appendChild(nicknameElement);

    /*
    let lastname = document.createElement("div");
    lastname.className = "last-name"
    lastname.innerHTML += `${lastNameGenerator(mainCs)}`;    
    element.appendChild(lastname);
    */
    return element;
  }
  function setAvatar (element) {
    // #todo add last fronted date to the title as well

    element.title = getPronouns(pk) + '\n(double click to open the PK page for this member)'
    let url = getAvatarURL(pk);
    // #todo detect broken image urls
    if (url) {
      element.style.backgroundImage = `url('${url}')`
      //element.onerror = function(e){ console.log("broken") } // not working
      element.style.boxShadow = "none";
    } else {
      // @later add default image (color shifted glitter lattice?)
      element.style.boxShadow = "inset 1em 1em 1em black"; 
      // syntax: h-shadow v-shadow blur spread color
    }
    element.style.backgroundColor = getBgColor(pk.id);
  }
  function updateBothSides () {
    // #todo consider throwing an error here if the elements are not found
    ["front", "back"].forEach(type => {
      let name = document.getElementById(`name-${type}-${idString}`);
      if (name) { name.replaceWith(nameElement(type)) }

      let icon = document.getElementById(`icon-${type}-${idString}`);
      if (icon) { setAvatar(icon) }
    });
  }

  // Check if the coin exists; if not, create one
  if (!elementByPkId(pkId)) { addHeadmateTile(pkId) }

  updateBothSides();
  return true;
}

// #todo use a list of member IDs instead
function updateAllHeadmateTiles () {
  getMemberList().forEach(updateHeadmateTile);
}

// #todo put this global in the data object with other toggles
var tilesFlipped = false;
function flipTiles () {
  // @todo get this working
  let elements = [...document.getElementsByClassName("flip-coin-inner")]
  if (elements.length === 0) {
    console.log("no elements found"); // @todo
  }
  elements.forEach(t => {
    if (tilesFlipped) {
      t.classList.remove("flipped")
    } else {
      t.classList.add("flipped")
    }
  });
  tilesFlipped = !tilesFlipped;
}