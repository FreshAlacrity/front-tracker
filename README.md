# Front Tracker

CS - Callsign

## Notes
- CTRL + click to front or un-front a member
- double click to open up PK dash page for the member
- Locally there's an auth.js file with just `let pkToken = "token-here"` - that isn't being synched to GitHub so if we need to set this up again we'll need to make a new one of those (later make this a URL parameter)
- Remember that the PK API limits requests etc pretty strongly; if we want to do a major batch update it may be easier to do that by importing an export type file (remember that those are .json files and not .js files)

### URL parameters:
- alts: any value will show alt proxies

#### Later:
- token: an auth token to use for PluralKit
- system: a PluralKit system ID


## To Do

### Next
- [ ] new member function for alt proxies
- [ ] finish functions for renaming members
  - [ ] try just replacing using string.replace(old, new)
- validation
  - [ ] new alt proxies/check for existing ones: if no image use the image from the main proxy in PK
- [ ] detect and object to same name entries in pk && pk_alt
- [ ] alt callsigns for members with no initial proxy don't have "'"
- [ ] known issue: double clicking members with no alt proxy triggers normal proxy behavior
    - detecting whether the click is to front or back seems not to be happening?
- PK
  - [ ] function for making a new alt member
    - does the current one do that?
    - detect new alt and make private and set member of alt group
  - set name function onChange
    - CS: text and text -CS equivalent name proxies
  - function to take Descriptions apart and put them back together
- [ ] send that first API request through immediately

### Then
- [ ] function to suggest Picrews
- [ ] register a member with PK when selected as fronting if they're not yet registered
- shift click to fuse
  - when the first headmate is shift-clicked:
    - [ ] sort all their fusions right after current fronters/push those to the front of the list
  - [ ] shift clicking a second digit fuses the two
- [x] output as list 5,6,24
  - [ ] update the url parameter ( ?active=5,6,24 )
  - [ ] load from URL parameter
  - [ ] 'Log Switch' button
    - [ ] load from last switch if there's no URL param
    - [ ] see https://pluralkit.me/api/endpoints/#switches
  - [ ] reset button (back to 1,2,3,4,5,6,7,8,9)
- [x] toggle mode that shows alt account names + image urls
  - [x] alt account names on coin backs
  - [x] alt account profile images on coin backs
  - [ ] stop tiles with no back from flipping?
  - [ ] have it do that if you hit the ' or ` keys?
  - [ ] in alt mode list people without alts last? and/or grey out their images?

### Later
- [ ] option to show little profiles of the current fronters with pronouns and short descriptions
- [ ] fix known issue: sort order for digits is off
  - [ ] check: is this because the sort order is being applied to the wrong element?
- [ ] better styling for alt portraits for members with no unique alt profile image
  - [ ] use a CSS class instead of applying it directly
- [ ] helpful titles for tiles? ('double click to open in PK dash'?)
- [ ] click to bring up a description
  - first just slap the stringified JSON onto a floating DIV
  - then make every value an editable text field
- [ ] known issue: Altar doesn't show up
- [ ] known issues: sort order
- [ ] when there's no token entered:
  - [ ] make name fields un-editable
  - [ ] double click should go to public page
  - [ ] hide 'log switch' button
- [ ] upload to GitHub site somewhere, /front/ ?
  - first make the token a url parameter and do above changes
- add password/parameter to show Alt accounts?
- alternate style for mobile: names off to right side with details?
- more strategic background colors
  - hue based on average of digits, and lightness based on total spread of digits (Z's idea)
  - use HSL?
  - lighter colors for Moth fusions
  - darker for Thorn fusions
  - more saturated for Lucky fusions
  - less saturated for Val fusions
  - that leaves Faun (Red?), Clover (Orange?), Ruth (Purple?), Kent (Green?), Giles (Blue?)
  - consider also colors that mean something: https://blog.datawrapper.de/gendercolor/
- style: size up the present fronters to be all on one row (when possible) and add some space below that
- refactor to use an object to store current, past, and future states re: fronters (for Undo)
- search by name, digits etc
- style present digits by % to fit on one line
  - style other icons to be that size or smaller
- set the auth token up as a URL parameter
- add resting status for digits (maybe)
- ? silhouette for headmates that don't have portraits
   - suggest picrews from headmates who share digits
- shift click multiple portraits to merge
- CTRL + click headmates to split; pulls up a popup that shows split options/previews the split (that disappears when CTRL is released - split to digits - or an option is clicked)
- ??? + click headmates to mark as stable - show merges of this headmate as unavailable
- search by emojis (use the emoji list in the spreadsheet to allow search by near miss)
- change classes: replace present and available classes with ones for for not available + not fronting
- toggle show/hide: 
  - digits
  - emojis (if portraits aren't shown, make them big?)
  - fursona view (images + names)
  - only current fronters
  - only available members
  - only registered members/members with nicknames
- double click? to pull up details (including Picrew)
- output possible duties to address?
- track what front combinations happen most often
- support undo/redo?
- double click to open pluralkit info page
- add background colors for images without background colors
    - sample from images where present and add those colors to the spreadsheet + PK


### Plans for Refactor
- URL params:
  - token
  - 'allow edits' true/false (on top of having the key or not)
  - what index to show initially
  - current fronters
- start a fork for this so we still have a working version
- setup object with list of unique symbols, max N to combine, N of variations
- consider callsigns that are like, ###f and ###o? (since ' isn't html-safe)
  - if we go this route, just have a global array with what order to cycle those/what defaults to what? is that better than ###-# because it's more flexible?
  - how to support unconventional callsigns? E, C etc
  - how to support callsigns like 19-5? (would that be 195-o?)
    - separate [callsign, index, subset, key, (value)] using _?
    - function to match to or create a callsign and index value given a member object as input (primarily by display_name rn but that could be flexible)
- try to go more object-oriented?
- global dictionary that has callsigns referenced to PK Member objects and status info
  - ex: ...callsign: [ { pk: { id: 'xxxxx'... }, status: {}, relatives: {} }, {...}, {...} ]...
  - base entries on a template
    - give members an array of N blank proxies
    - set a default displayname [callsign | Unnamed]
    - update from PK member object
- global dictionary with IDs mapped to callsign + index:
  - ex: ...PK ID: { callsign: ###, index: # }...
- function to update all PK Member objects by API call/from member list array
  - function to take the dictionary keyed by callsign and validate all members
- functions that take [callsign, index, subset, key, (value)] as input and using a switch statement:
  - set: 
    - name: updates display name and potentially other index names/displaynames
    - status: upates other statuses by index and callsign (recursively?)
      - status defaults: 
        present: false,
        available: true,
        named: false,
        profile_image_set: false (maybe)
  - for every call:
    - update HTML and dictionary by callsign using the (returned) PK member object
  - for any call from the page itself:
    - confirm
    - update PK via API
    - update HTML again
  - for new members:
    - update the dictionary of IDs
- html objects
  - id'd to [callsign, index, subset, key, (value)]:
  - functions to make blank HTML element/elements of each type
  - function to update the HTML element from the member object
- add things that don't match any existing callsigns to both dictionaries
- function to update proxy objects from PK
  - how to match PK entries to proxy objects? function to check them against each other for matches?
    - dictionary of what ID goes to what object?
- function to update PK object from headmate object
- format to distinguish PK fields from derived fields (emoji, picrew etc)
  - list of derived fields?
