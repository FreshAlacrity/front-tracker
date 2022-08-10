function addHeadmateTile(num, headmate) {
  function getBgColor(callsign) {
    let baseHue = []; // @todo set color 'homes' per digit
    // @todo average the hue values
    let hue = Math.floor(Math.random()*361)
    return `hsl(${hue}, 20%, 40%)`;
  }
  function makeCoin() {
    let coin = document.createElement("div");
    coin.addEventListener("click", onClick);
    coin.classList.add("flip-coin");
    coin.id = "tile-" + num;
    if (headmate.status.present) {
      coin.style.order = num.length;
      coin.classList.add("present");
      coin.classList.add("available");
    } else {
      coin.style.order = sortOrder(num, headmate);
      coin.classList.add("available");
    }
    container.appendChild(coin);

    let coinFaces = document.createElement("div");
    coinFaces.classList.add("flip-coin-inner");
    coin.appendChild(coinFaces);
    return coinFaces;
  }
  function coinFace(type = "front") {
    let coinFront = document.createElement("div");
    coinFront.classList.add("flip-coin-" + type);

    let icon = document.createElement("div");
    icon.id = `icon-${type}-${num}`;
    icon.addEventListener("dblclick", onDoubleClick);
    icon.classList.add("icon");
    icon.style.backgroundColor = getBgColor(num);
    coinFront.appendChild(icon);
    coinFront.title = num;

    let name = document.createElement("div");
    name.id = `name-${type}-${num}`;
    name.textContent = num;
    coinFront.appendChild(name);

    coinFront.title += '\n' + status;
    return coinFront;
  }

  let coin = makeCoin();
  coin.appendChild(coinFace("front"));
  coin.appendChild(coinFace("back"));
}
function addAllHeadmateTiles() {
  for (const [callsign, value] of Object.entries(headmates)) {
    addHeadmateTile(callsign, value)
  }
}

function updateHeadmateTile(num, headmate) {
  function partsFromDisplayName(displayName, obj) {    
    let parts = displayName.split(' ');
    if (parts[0]) { obj.callsign = parts[0] }
    if (parts[1] !== "|") { obj.emoji = parts[1] }
    if (parts[2]) { obj.nickname = parts[2] }
    let isWord = /^\w+$/ // /\w/ // for if we want parentheticals
    if (parts[2] && parts[3] && isWord.test(parts[3])) {
      obj.nickname += ' ' + parts[3];
    }
    return obj;
  }
  function nameElement(headmate, callsign, type) {
    // @later maybe set this up another way?
    // it's really just Sweet William with a space in his name
    let element = document.createElement("div");
    element.id = `name-${type}-${callsign}`

    let nickname = document.createElement("input");
    nickname.addEventListener("focusout", nameChange);
    nickname.classList.add("name");

    if (type === "front") {
      nickname.id = "name-for-" + callsign
    } else {
      nickname.id = "alt-name-" + callsign
    }    

    let obj = { emoji: '', callsign: callsign, nickname: '' }
    let registry = { ...obj }
    if (headmate.pk && headmate.pk.display_name) {
      registry = partsFromDisplayName(headmate.pk.display_name, registry);
    }
    if (type === "back") {
      if (headmate.pk_alt && headmate.pk_alt.display_name) {
        obj = partsFromDisplayName(headmate.pk_alt.display_name, obj)
      } else {
        obj.callsign = callsign + "'";
      }
    } else {
      obj = registry;
    }
    
    name = `${obj.emoji} ${obj.callsign} ${obj.emoji}`;
    name += "<br>";
        
    if (obj.nickname) { 
      nickname.placeholder = obj.nickname;
    } else {
      nickname.placeholder = registry.nickname 
    }
    if (obj.nickname !== "Unnamed") {
      nickname.value = obj.nickname;
    }

    element.innerHTML = name;
    element.appendChild(nickname);
    return element;
  }
  function setAvatar(element, headmate, callsign, type = "front") {    
    let m = headmate;
    let url = '';
    let shadow = "inset 1em 1em 1em black"; //h-shadow v-shadow blur spread color

    if (type === "back" && m.pk_alt && m.pk_alt.avatar_url) {  
      if (m && m.pk && m.pk.avatar_url !== m.pk_alt.avatar_url) {
        shadow = "none";
      }
      url = m.pk_alt.avatar_url;
    } else if (type === "back" && m && m.pk && m.pk.avatar_url) {
      url = m.pk.avatar_url;
    } else if (type === "front" && m && m.pk && m.pk.avatar_url) {
      url = m.pk.avatar_url;
      shadow = "none";
    } else {
      url = ''; // @later add default (color shifted glitter lattice?)
    }
    
    element.style.boxShadow = shadow;
    element.style.backgroundImage = `url('${url}')`
  }
  function updateBothSides() {
    ["front", "back"].forEach(type => {
      let name = document.getElementById(`name-${type}-${num}`);
      if (name) { name.replaceWith(nameElement(headmate, num, type)) }

      let icon = document.getElementById(`icon-${type}-${num}`);
      if (icon) { setAvatar(icon, headmate, num, type) }
    });
  }
  updateBothSides();
  return true;
}
function updateAllHeadmateTiles() {
  for (const [callsign, value] of Object.entries(headmates)) {
    updateHeadmateTile(callsign, value)
  }
}

function reflow() {
  // see https://gist.github.com/paulirish/5d52fb081b3570c81e3a
  let foo = window.scrollX;
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