function nameIsUnique(name) {
  // @todo implement and use in name updates
  // remember to catch Unnamed
  return true
}

async function checkMemberObject(m, autofix = true) {
  function c(text) { console.log(text) }
  function checkNameVsDisplayName() {
    // @todo catch names that aren't contained by displaynames
  }

  let edits = {}  

  // check name format, #### | Nickname
  if (!m.display_name) {
    // based on the convention of naming members by callsign when they don't have a a nickname
    edits.display_name = `${m.name} | Unnamed`;
  }
  
  // @todo if alt, check that the name is followed by a parenthetical nickname from the main registry

  // check name set private @todo
  if (m.privacy.name_privacy !== "private") {
    edits.privacy = {} // note that this would erase any previous edits to privacy
    edits.privacy.name_privacy = "private";
  }

  // @todo
  // members with avatar urls should have a picrew link in their description (with some exceptions)
    // - if they have neither "Picrew" nor "Profile Image Source" then object
    // - all members including alts should have:
    // - CS: text and text -CS proxies
    // - names set to private
  // all non-alt members should have:
    // - preferred pronouns listed
    // - a description with what digits are fused into them etc
    // - all named members should have:
    // - Name: text and text -Name proxies
    // - all members should have a description
  // check and make sure name is unique

  // alt members:
  // - there's a trailing '
  // - later check if member of group with id 'zdytf'
  // - set to private
  // - if no image use the image from the main proxy in PK

  if (JSON.stringify(edits) !== "{}") {
    if (autofix) {
      editMember(m.id, edits)
    } else {
      c(`Suggested changes for ${m.name}:\n${JSON.stringify(edits, null, 2)}`);
    }
  }

  return Object.assign(m, edits)
}