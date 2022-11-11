function idStringByCallsign(cs) {
  // see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent
  return "tile-" + encodeURIComponent(cs).replace(
    /[!'()*]/g,
    (c) => `%${c.charCodeAt(0).toString(16).toUpperCase()}`
  );
}
function elementByCallsign(callsign) {
  return document.getElementById(idStringByCallsign(callsign));
}

// used in init()
function addHeadmateTile(mainCs) {  
  function makeCoin() {
    let coin = document.createElement("div");
    coin.addEventListener("click", onTileClick);
    coin.classList.add("flip-coin");
    coin.classList.add("hidden"); // #here
    coin.id = idStringByCallsign(mainCs);
    data.page.container.appendChild(coin);

    let coinFaces = document.createElement("div");
    coinFaces.classList.add("flip-coin-inner");
    coin.appendChild(coinFaces);
    return coinFaces;
  }
  function coinFace(type = "front") {
    let coinFront = document.createElement("div");
    coinFront.classList.add("flip-coin-" + type);

    let icon = document.createElement("div");
    icon.id = `icon-${type}-${mainCs}`;
    icon.addEventListener("dblclick", onDoubleClick);
    icon.classList.add("icon");
    icon.style.backgroundColor = getBgColor(mainCs);
    coinFront.appendChild(icon);
    //coinFront.title = '';

    let name = document.createElement("div");
    name.id = `name-${type}-${mainCs}`;
    name.textContent = mainCs;
    coinFront.appendChild(name);

    coinFront.title += '\n' + status;
    return coinFront;
  }

  let coin = makeCoin();
  coin.appendChild(coinFace("front"));
  coin.appendChild(coinFace("back"));
}
function updateHeadmateTile(mainCs) {
  let pk = getPkObject(mainCs);
  function nameElement(type) {
    let element = document.createElement("div");
    element.id = `name-${type}-${mainCs}`;
    // #todo adjust for alt accounts
    element.innerHTML = `${getEmoji(pk)} ${mainCs} ${getEmoji(pk)}<br>`;

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
      nicknameElement.id = "name-for-" + mainCs
    } else {
      nicknameElement.id = "alt-name-" + mainCs
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
  function setAvatar(element) {
    let url = getAvatarURL(pk);
    // #todo detect broken image urls
    if (url) {
      element.style.backgroundImage = `url('${url}')`
      element.style.boxShadow = "none";
    } else {
      // @later add default image (color shifted glitter lattice?)
      element.style.boxShadow = "inset 1em 1em 1em black"; 
      // syntax: h-shadow v-shadow blur spread color
    }
    element.style.backgroundColor = getBgColor(pk);
  }
  function updateBothSides() {
    ["front", "back"].forEach(type => {
      let name = document.getElementById(`name-${type}-${mainCs}`);
      if (name) { name.replaceWith(nameElement(type)) }

      let icon = document.getElementById(`icon-${type}-${mainCs}`);
      icon.title = pk.pronouns + '\n(double click to open the PK page for this member)'
      if (icon) { setAvatar(icon) }
    });
  }
  updateBothSides();
  return true;
}
function updateAllHeadmateTiles() {
  getMemberList().forEach(updateHeadmateTile);
}

// #todo put this global in the data object with other toggles
var tilesFlipped = false;
function flipTiles() {
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