# Front Tracker

CS - Callsign


## Notes
- CTRL + click to front or un-front a member
- double click to open up PK dash page for the member
- Locally there's an auth.js file with just `let pkToken = "token-here"` - that isn't being synched to GitHub so if we need to set this up again we'll need to make a new one of those (later make this a URL parameter)
- Remember that the PK API limits requests etc pretty strongly; if we want to do a major batch update it may be easier to do that by importing an export type file (remember that those are .json files and not .js files)


## To Do

### Next
- [ ] function to update an internal member object from a PK member object

### Known Issues
- fixed?
  - [ ] sort order for digits is off
    - [ ] check: is this because the sort order is being applied to the wrong element?
  - [ ] alt callsigns for members with no initial proxy don't have "'"
  - [ ] double clicking members with no alt proxy triggers normal proxy behavior
  - [ ] Altar doesn't show up
  - [ ] detecting whether the click is to front or back seems not to be happening?

### Plans for Refactor
- [ ] set up functional public/private/editable links through url params  
  - [ ] when there's no token entered or not editing=true:
    - [ ] make name fields un-editable
    - [ ] double click should go to public page
    - [ ] hide 'log switch' button
- [ ] upload to GitHub site as /front/

#### Data Structure
- [ ] set up a global data object with:
  - [ ] global dictionary that has callsigns referenced to PK Member objects and status info
    - [x] base entries on a template
      - [x] give members an array of N blank proxies
      - set a default displayname [callsign | Unnamed]
      - CS: text and text -CS equivalent name proxies
      - update from PK member object
  - [ ] template objects:
    - [ ] members of different indexes
      - include default name (i.e. "Unnamed")
  - [ ] global dictionary with IDs mapped to callsign + index:
    - ex: ...PK ID: { callsign: ###, index: # }...
  - [ ] URL params:
    - [ ] token for authentification
    - [ ] editing true/false (on top of having the key or not)
    - [ ] what index to show initially
    - [ ] current fronters (+option to load from last switch)
    
#### Functions
- [ ] read in and save URL parameters
- [ ] rewrite as async function to set up members object
  - start with list of unique symbols, max N to combine, N of variations
  - generate all callsigns up to length of N
- [ ] function to identify what callsign and index a member object corresponds to
    - [ ] function to check against each other
      - this can be used to iterate through to find the match or validate, either way :)
    - [ ] add things that don't match any existing callsigns to both dictionaries
- [ ] function to update PK object from headmate object
- [ ] async function to import member data from member object
  - [ ] rewrite async function to import member data from a bulk PK API call/member list array
  - [ ] function to take Descriptions apart and put them back together
    - [ ] function for generating the first line of the description ("Temporary fusion of..." etc)
- function to take the dictionary keyed by callsign and validate all members
- new member function
  - for initial proxy
  - for different indexes
- [ ] new function to output fronters as list (ex: 5,6,24)
  - [ ] update the url parameter (ex: ?active=5,6,24)
  - [ ] load from URL parameter
  - [ ] 'Log Switch' button
    - [ ] load from last switch if there's no URL param
    - [ ] see https://pluralkit.me/api/endpoints/#switches
  - [ ] reset button (back to 1,2,3,4,5,6,7,8,9)
- functions that take [callsign, index, subset, key, (value)] as input and using a switch statement:
  - set:
    - [ ] status: upates other statuses by index and callsign (recursively?)
    - [ ] name: updates display name and potentially other index names/displaynames
      - try just replacing using string.replace(old, new)
      - add old name to description unless it's "Unnamed"
      - add name before and after proxies
      - set status.named = true
  - for every call:
    - update HTML and dictionary by callsign using the (returned) PK member object
  - for any call from the page itself:
    - confirm
    - update PK via API
    - update HTML again
  - for new members:
    - update the dictionary of IDs
- [ ] functions for managing html objects
  - elements id'd to the pertinent values of [callsign, index, subset, key, value]:
    - [ ] functions to make blank HTML element/elements of each type
    - [ ] function to update the HTML element from the member object


### Misc/Later
- search function 
  - search by emojis and emoji names
    - use the emoji list in the spreadsheet to allow search by near miss
- tie-ins with Project Targeting:
  - output possible duties to address?
  - click to open Projects page for these fronters?
    - todo/private
    - portfolio/public
- track what front combinations happen most often
  - dropdown to load from most common combinations?

#### UI & Design
- fields should have outline dark grey, buttons should be solid
- [ ] option to toss section headers into the flex-container
  - 100% width
  - Active, Available, and Unavailable
  - use regular sort order with callsign 0
  - [ ] add method for expand/collapse for each section?
- [ ] option to show little address-book style profiles of the current fronters with pronouns and short descriptions
- [ ] better styling for alt portraits for members with no unique alt profile image
  - [ ] use a CSS class instead of applying it directly
- [ ] helpful titles for tiles? ('pronouns + double click to open in PK dash'?)
- [ ] click to bring up a description
  - first just slap the stringified JSON onto a floating DIV
  - then make every value an editable text field (that'd already be better than PK because you'd have to bring up a description then copy it then edit it, instead of just editing it)
- [ ] function to suggest Picrews
- [ ] register a member with PK when selected as fronting if they're not yet registered
- shift click to fuse
  - when the first headmate is shift-clicked:
    - [ ] sort all their fusions right after current fronters/push those to the front of the list
  - [ ] shift clicking a second digit fuses the two
- CTRL + click headmates to split; pulls up a popup that shows split options/previews the split (that disappears when CTRL is released - split to digits - or an option is clicked)
- ??? + click headmates to mark as stable - show merges of this headmate as unavailable
- toggle show/hide: 
  - digits
  - emojis (if portraits aren't shown, make them big?)
  - fursona view (images + names)
  - only current fronters
  - only available members
  - only registered members/members with nicknames
- consider callsigns like ###f and ###o for alts? (since ' isn't html-safe)
  - if we go this route, just have a global array with what order to cycle those/what defaults to what? is that better than ###-# because it's more flexible?
  - how to support unconventional callsigns? E, C etc
  - how to support callsigns like 19-5? (would that be 195-o?)
    - separate [callsign, index, subset, key, (value)] using _?
    - function to match to or create a callsign and index value given a member object as input (primarily by display_name rn but that could be flexible)
- ? silhouette for headmates that don't have portraits
   - suggest picrews from headmates who share digits
- add resting status for digits (maybe)
- [ ] click to pull up details (including Description/Picrew & PK ID)
- style present digits by % to fit on one line
  - style other icons to be that size or smaller
- [x] toggle mode that shows alt account names + image urls
  - [x] alt account names on coin backs
  - [x] alt account profile images on coin backs
  - [ ] stop tiles with no back from flipping?
  - [ ] have it do that if you hit the ' or ` keys?
  - [ ] in alt mode list people without alts last? and/or grey out their images?
- [ ] help icon that pops up Notes text from above
- alternate style for mobile: names off to right side with details?
- style: size up the present fronters to be all on one row (when possible) and add some space below that

##### Colors
- [ ] sample background colors from images where present and add those colors to PK
  - otherwise use emoji colors?
- more strategic background colors
  - hue based on average of digits, and lightness based on total spread of digits (Z's idea)
  - use HSL?
  - lighter colors for Moth fusions
  - darker for Thorn fusions
  - more saturated for Lucky fusions
  - less saturated for Val fusions
  - that leaves Faun (Red?), Clover (Orange?), Ruth (Purple?), Kent (Green?), Giles (Blue?)
  - consider also colors that mean something: https://blog.datawrapper.de/gendercolor/