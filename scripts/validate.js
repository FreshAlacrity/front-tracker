function validateMemberListInput(string, doAlert = false) {
  log("Validating: " + string);
  let arr = splitByEach(string, ",.~ ;:/");
  let all = getMemberList();
  let notMembers = [];
  function has(key, str) {
    if (key.length === 1) {
      return str.indexOf(key) > -1
    } else {
      return (key.split('').filter(d => (str.indexOf(d) > -1)).length >= key.length)
    }
  }
  function have(key, arr, match = true) { return arr.filter(e => (has(key, e) === match)) }
  function endsIn(end, str) { return str.slice(-1) === end }
  
  let exclusions = have("-", arr);
  arr = have("-", arr, false);
  arr = arr.map(e => {
    if (callsignFromNickname(e)) {
      return callsignFromNickname(e)
    } else if (has('+', e)) {
      let qualifies = have(e.replace('+',''), all);
      qualifies = qualifies.filter(m => {
        if (endsIn('-', e)) {
          // remove any member that contains these digits
          return exclusions.filter(x => has(x.replace('-',''), m)).length === 0;
        } else {
          // remove only perfect matches
          return exclusions.filter(x => has(m, x.replace('-',''))).length === 0;
        }
      });
      return qualifies;
    } else {
      return e
    }
  }).flat()
  arr = arr.filter(cs => {
    if (!all.includes(cs)) {
      notMembers.push(cs);
      return false;
    } else {
      return true;
    }
  });

  // deduplicate:
  arr = sortByCallsign(arr);

  if (notMembers.length > 0) {
    // currently can cause a softlock if using alert()
    showMessage(`These are not registered member(s): ${notMembers.join(", ")}`);
  }
  log("Using: " + arr)
  return arr
}

function fusionNote(callsign) {
  // @todo later check + update these automatically
  let names = ["☸️ Moth", "🍀 Clover", "🧮 Val", "🏗️ Kent", "🐏 Faun", "🤝 Ruth", "🎇 Lucky", "📜 Giles", "🌑 Thorn"];
  if (new RegExp(/^\d+$/).test(callsign)) {
    if (callsign.length === 1) {
      return `Represents district ${callsign} on our internal council`
    } else {
      // @todo set up and pull from a list of digit display_names
      return `Temporary fusion of ${oxfordCommaList((callsign + '').split('').map(a => names[parseInt(a - 1)]))}\nRepresents districts ${oxfordCommaList((callsign + '').split(''))}`;
    }
  } else {
    return "Unconventional headmate";
  }
}
quickTest(fusionNote("E"), "Unconventional headmate", "No digit fusionNote() test");
quickTest(fusionNote("6"), "Represents district 6 on our internal council", "One digit fusionNote() test");
quickTest(fusionNote(24), "Temporary fusion of 🍀 Clover and 🏗️ Kent\nRepresents districts 2 and 4", "Two digit fusionNote() test");
quickTest(fusionNote(246), "Temporary fusion of 🍀 Clover, 🏗️ Kent, and 🤝 Ruth\nRepresents districts 2, 4, and 6", "Three digit fusionNote() test");

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
  // used in util.js updatePkInfo()
  autoUpload = false; // while testing #later remove this  
  let edits = {}
  let callsign = getCallsign(pk);
  let isMain = isMainProxy(callsign);
  // #later, also detect if we're getting a public-facing pk object or not by looking at privacy: null and/or lack of display_name?

  let silent = true;
  function objection(property, issue = "has no") {
    if (!silent) {
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
    // check that name is set private
    if (isMain && pk.privacy.name_privacy !== "private") {
      // note that this would erase any previous edits to privacy
      edits.privacy = { name_privacy: "private" };
    } else if (!isMain) {
      // #later check that alts are set entirely private
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

  checkNames();
  // needs to go after name check and before proxy check:
  Object.assign(pk, edits);
  //checkProxies(); // #todo re-enable after other things are fixed and we have a new exported backup

  checkAvatar();
  checkDescription();
  checkPronouns();
  checkPrivacy();

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
      if (!silent) {
        log(`Suggested changes for ${pk.name}:\n${pretty(edits)}`);
      }
    }
  }
  return Object.assign(pk, edits)
}