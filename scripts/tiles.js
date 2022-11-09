function elementByCallsign(callsign) {
  return document.getElementById("tile-" + callsign);
}

/* #todo figure out how to manage status

  if (false && headmate.status.present) {
    // #todo fix - need new status tracking system
    coin.style.order = num.length;
    coin.classList.add("present");
    coin.classList.add("available");
  } else {
    coin.classList.add("available");
  }
*/

// used in init()
function addHeadmateTile(mainCs) {  
  function makeCoin() {
    let coin = document.createElement("div");
    coin.addEventListener("click", onClick);
    coin.classList.add("flip-coin");
    coin.id = "tile-" + mainCs;
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
    // #todo troubleshoot:
    icon.style.backgroundColor = getBgColor(mainCs);
    coinFront.appendChild(icon);
    coinFront.title = mainCs;

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
  let m = getPkObject(mainCs);
  function nameElement(type) {
    let element = document.createElement("div");
    element.id = `name-${type}-${mainCs}`;
    // #todo adjust for alt accounts
    element.innerHTML = `${getEmoji(m)} ${mainCs} ${getEmoji(m)}<br>`;

    let nickname = document.createElement("input");
    nickname.addEventListener("focusout", nameChange);
    nickname.addEventListener("keypress", function(event) {
      // If the user presses the "Enter" key on the keyboard
      if (event.key === "Enter") {
        // Cancel the default action, if needed
        event.preventDefault();
        nameChange(event);
      }
    });
    nickname.classList.add("name");
    let val = getNickname(m);
    if (val !== "Unnamed") {
      nickname.defaultValue = val;
      nickname.value = val;
      nickname.placeholder = val; // used to detect name changes
    } else {
      nickname.placeholder = val;
    }
    if (type === "front") {
      nickname.id = "name-for-" + mainCs
    } else {
      nickname.id = "alt-name-" + mainCs
    }    
    element.appendChild(nickname);

    return element;
  }
  function setAvatar(element) {
    let url = getAvatarURL(m);
    // #todo detect broken image urls
    if (url) {
      element.style.backgroundImage = `url('${url}')`
      element.style.boxShadow = "none";
    } else {
      // @later add default image (color shifted glitter lattice?)
      element.style.boxShadow = "inset 1em 1em 1em black"; 
      // syntax: h-shadow v-shadow blur spread color
    }
    element.style.backgroundColor = getBgColor(m);
  }
  function updateBothSides() {
    ["front", "back"].forEach(type => {
      let name = document.getElementById(`name-${type}-${mainCs}`);
      if (name) { name.replaceWith(nameElement(type)) }

      let icon = document.getElementById(`icon-${type}-${mainCs}`);
      if (icon) { setAvatar(icon) }
    });
  }
  updateBothSides();
  return true;
}
function updateAllHeadmateTiles() {
  getMemberList().forEach(updateHeadmateTile);
}

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