
function getAvatarURL(callsign) {
  let m = headmates[callsign];
  let isAlt = (callsign.slice(-1) === "'")
  if (!isAlt && m && m.pk && m.pk.avatar_url) {

    return m.pk.avatar_url
  } else {
    return ''
  }
}

function addHeadmateTile(num, headmate) {
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
    icon.id = "icon-" + num;
    icon.addEventListener("dblclick", onDoubleClick);
    icon.classList.add("icon");
    icon.style.backgroundColor = hexVals[(num * 61) % hexVals.length];
    coinFront.appendChild(icon);
    coinFront.title = num;

    let name = document.createElement("div");
    name.id = "nickname-for-" + num;
    name.innerHTML = headmate.html_name ?? num;
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
  // @todo update name
  if (num[num.length -1] === "'") {
    // @todo
    //console.log("Can't yet add alt account icon or name for " + num);
  } else {
    // update name
    let name = document.getElementById("nickname-for-" + num);
    if (name) {
      name.innerHTML = headmate.html_name ?? num;
    }

    // update profile image
    let icon = document.getElementById("icon-" + num);
    if (icon) {
      icon.style.backgroundImage = `url('${getAvatarURL(num)}')`
    }
  }
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