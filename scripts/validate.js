function fusionNote(callsign) {
  // #later check these automatically
  let names = ["☸️ Moth", "🍀 Clover", "🧮 Val", "🏗️ Kent", "🐏 Faun", "🤝 Ruth", "🎇 Lucky", "📜 Giles", "🌑 Thorn", "🌃 Glitter"];
  let numDigits = callsign.split('').filter(c => (digitIndex(c) > -1)).length;
  if (numDigits === callsign.length) {
    if (callsign.length === 1 && callsign !== "*") {
      return `Represents district ${callsign} on our internal council`
    } else if (callsign === "*") {      
      return `Non-representative, non-voting adviser to the council`
    } else {
      let districtList = oxfordCommaList((callsign + '').split('').filter(d => (d !== "*")))
      return `Temporary fusion of ${oxfordCommaList((callsign + '').split('').map(d => names[digitIndex(d)]))}\nRepresents districts ${districtList}`;
    }
  } else {
    return "Unconventional headmate";
  }
}
quickTest(fusionNote("E"), "Unconventional headmate", "No digit fusionNote() test");
quickTest(fusionNote("6"), "Represents district 6 on our internal council", "One digit fusionNote() test");
quickTest(fusionNote("24"), "Temporary fusion of 🍀 Clover and 🏗️ Kent\nRepresents districts 2 and 4", "Two digit fusionNote() test");
quickTest(fusionNote("246"), "Temporary fusion of 🍀 Clover, 🏗️ Kent, and 🤝 Ruth\nRepresents districts 2, 4, and 6", "Three digit fusionNote() test");

function deduplicateProxyList(arr) {
  return [...new Set(arr)].sort(function (x, y) {
    function smooshProxy(p) {
      function nullToBlank(s) {
        if (s && s !== "null") {
          return s
        } else {
          return ''
        }
      };
      return nullToBlank(p.prefix) + nullToBlank(p.suffix)
    }
    x = smooshProxy(x);
    y = smooshProxy(y);
    if (x < y) {
      return -1;
    }
    if (x > y) {
      return 1;
    }
    return 0;
  });
}

// #redo and use:
function updateRequiredProxyTags(pk) {
  // - all members including alts should have:
  // - CS: text and text -CS proxies
  // - Name: text and text -Name proxies (if name != CS)
  // check that it includes at least everything from updateRequiredProxyTags?
  // #later make sure these proxies do not conflict with any other members'
  // #later remove emoji proxies
  // #todo include a way to remove an old name?
  function newProxyTag(prefix = null, suffix = null) {
    // #todo just push this already
    return { "prefix": prefix, "suffix": suffix }
  }
  /*
  function addProxyTag(a, b) { pk.pk.proxy_tags.push(newProxyTag(a, b)) }
  addProxyTag(null, ` -${pk.etc.callsign + pk.etc.suffix}`);
  addProxyTag(`${pk.etc.callsign + pk.etc.suffix}: `);
  if (pk.name !== (pk.etc.callsign + pk.etc.suffix)) {
    addProxyTag(null, ` -${pk.name}`);
    addProxyTag(`${pk.name + pk.etc.suffix}: `);
  }
  */
  // #todo check that this does actually deduplicate proxy tags

  pk.proxy_tags = deduplicateProxyList(pk.proxy_tags);
  return pk;
}
function nameOccurs(name) {
  // returns the number of times this name is currently used
  // #todo implement
  // #todo use in name updates
  let allNames = Object.keys(data.callsigns_by_name);
  let count = allNames.filter(e => (e === name)).length;
    log(`checking for name ${name}: ${allNames.filter(e => (e === name)).join(",")}`)
  return count
}

function checkMemberObject(pk, autoUpload = true) {
  // #todo update to take edit mode into account better
  // used in util.js updatePkInfo()
  let editMode = getToggle("editing");
  autoUpload = (false && editMode); // while testing #later remove this  
  let edits = {}
  let callsign = getCallsign(pk);
  let isMain = isMainProxy(callsign);
  // #later, also detect if we're getting a public-facing pk object or not by looking at privacy: null and/or lack of display_name?

  function objection(property, issue = "has no") {
    if (editMode) {
      console.warn(`${pk.display_name} with id '${pk.id}' ${issue} ${property}`);
    }
  }
  
  function checkNames() {
    // #todo check name format, #### | Nickname

    if (pk.name === "Unnamed") {
      objection("name", "is not set properly");
      pk.name = callsign;
      edits.name = callsign;
      // this shouldn't happen again, but it has in the past
    }

    if (!pk.display_name) {
      objection("display name");
      // if alt, check that it includes a parenthetical with nickname from main
      // based on the convention of naming members by callsign when they don't have a a nickname
      edits.display_name = `${callsign} | Unnamed`;
    } else if (pk.display_name.indexOf(pk.name) < 0) {
      objection("display name", "doesn't contain their name");
      // #todo prompt to resolve?
    }
  }
  function checkPrivacy() {
    if (pk.privacy) {
      // check that name is set private
      if (isMain && pk.privacy.name_privacy !== "private") {
        // note that this would erase any previous edits to privacy
        edits.privacy = { name_privacy: "private" };
      } else if (!isMain) {
        // #later check that alts are set entirely private
      }
    } else {
      // loading without a token
    }
  }
  function checkAvatar() {
    if (pk.avatar_url) {
      if (pk.avatar_url.indexOf("picrew.me/shareImg") > 0) {
        pk.avatar_url = ""
        objection("avatar image", "is a direct link to picrew");
      }
      if (false) {
        // #todo if they have neither "Picrew" nor "Profile Image Source" then object
        objection("description", "has no image source link");
      }
    }
  }
  function checkProxies() {
    let updated = updateRequiredProxyTags(pk);
    function compareProxyTagList(a, b) {
      // #todo test
      let prettyListA = JSON.stringify(deduplicateProxyList(a.proxy_tags));
      return (prettyListA === JSON.stringify(b.proxy_tags))
    }
    if (!compareProxyTagList(pk, updated)) {
      objection("proxy tags", "has outdated");
      edits.proxy_tags = updated.proxy_tags;
    }
  }
  function checkPronouns() {
    if (!pk.pronouns) {
      // #todo just autofix, don't object?
      //objection("preferred pronouns");
      edits.pronouns = "they/them";
      objection("pronouns");
      //autofix = true;
    } else if (pk.pronouns.indexOf("they/them") < 0) {
      edits.pronouns = ", they/them";
      objection("pronouns", "doesn't have they/them in their");
    }
  }
  function checkDescription() {
    if (isMain && pk.description !== updatedDescription(pk)) {
      // description is wrong format or fusion note is old
      edits.description = updatedDescription(pk);
      objection("description", "has an outdated");
    }
  }

  if (editMode) {
    checkNames();
    // needs to go after name check and before proxy check:
    Object.assign(pk, edits);
    //checkProxies(); // #todo re-enable after other things are fixed and we have a new exported backup
    checkPrivacy();
  }
  checkAvatar();
  checkDescription();
  checkPronouns();

  // #todo
  // all non-alt members should have:
  // - a description with what digits are fused into them etc
  // - all named members should have:
  // - Name: text and text -Name proxies
  // check and make sure name is unique

  // alt members:
  // - should have a trailing '
  // - be a member of group with id 'zdytf'
  // - if no image, use the image from the main proxy in PK

  // @todo make everything here part of making new members


  if (JSON.stringify(edits) !== "{}") {
    if (autoUpload) {
      editMember(pk.id, edits)
    } else {
      if (editMode) {
        message(`Suggested changes for ${pk.name}:\n${pretty(edits)}`);
      }
    }
  }
  return Object.assign(pk, edits)
}