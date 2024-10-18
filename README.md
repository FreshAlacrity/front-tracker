# Front Tracker

## About
Allows users of [Plural Kit](https://pluralkit.me/) to show, manage, analyse, and track member information for large systems. Currenty in development/alpha release; feedback and questions are welcome and can be submitted through the [GitHub Issues page](https://github.com/FreshAlacrity/front-tracker/issues/new).

### Active List Syntax
Names and callsigns will pull up members; adding a + to a callsign or name will look for all members that are fusions of that callsign and mark those available; adding - to a callsign or name will mark those members unavailable


## Planned
 #todo: move these to Issues page instead

### Next
- get it working again
  - [x] problem seems to be with url params? yeah, identified and commented it out
  - [x] new problem: clearing local storage isn't working effectively
    - actual problem was the default image hardcoded in here wasn't being hosted anymore
  - [x] why is the member list not being requested?
    - it can be, by toggling on and off the 'live' checkbox to run loadFromPk()
    - member list shown is a system model
      - disable the system model, just show the existing member list
- show what headers are commonly in descriptions
- [ ] add the URL parameter to the page for showing active fronters when that button is clicked
- [ ] add a "donate"/<3 button and link it to Patreon (for now)
- [ ] add a "View Source" button and link to the repository
- [ ] Have one button for sign in/sign out and change the button text based on if a valid token is active
- [ ] get levenstein name recognition from active list working
- [ ] better names for checkbox toggles, so available -> "Show members available to front" etc

### Support for Other Systems
- [ ] allow putting in a system ID as a URL parameter and just list the members to start
- [ ] get the system name/tag and add to page title
- [ ] show more than one system at once
- [ ] use description text format to recognize component digits (if they have "callsign:")
- [ ] use group membership to recognize alt accounts
- [ ] allow input of a group ID for 'digits' (who do fuse) and/or unconventional headmates (who don't fuse)
- [ ] recognize proxy patterns for the purpose of making new proxies based on that as a template
- [ ] use a public group to assemble a list of digits (and load those members first?)
- [ ] in editing mode, add a generic "new member" profile tile
- [ ] add a url parameter for maximum N fused members
- [ ] new default image url; grab the pfp for the system?

### Editing members
- add a pencil ✏️ "Edit" button
  - make a tablet mode toggle that always shows the edit buttons?
  - [ ] show only on hover

### Savimg notes on system members
- mock up UI for this
- allow folks to save notes to local storage
- allow folks to save cached notes to a google sheet with a name (column) and a password (and check that the password is the same?) and then obfuscade/encrypt the text using that password
  - butler: https://script.google.com/home/projects/1LOGC9FVeLE6rWkBitDSibhlL1NMmGTsDJGnnWL1PZajWQC5JXgp-NQwS/edit?pli=1
  - sheet: https://docs.google.com/spreadsheets/d/159uh1M7ut-kEBBnaeZuDR30Td_1B0MJ1x5m72Pmw5pQ/edit#gid=0
  - beware that this could be used to over-write existing notes (save date-time to only silently over-write notes that are older? or just append?)
  - allow folks to load in such notes
- [ ] find encrypt and decrypt functions
  - Z recommends AES
  - also find something to generate a key from a password (a MD5 hashing function?)
  - https://github.com/ricmoo/aes-js and https://github.com/ricmoo/scrypt-js should do this
- [ ] later, check that we& can make notes on other systems and that works well

### Viewing Modes
- Allow local save of private notes for each headmate
  - add support for import/export (or linking to a google doc/markdown doc with headers?)
- Public View
  - [ ] hide any members with no public PK
  - shift click to fuse
    - [ ] when the first icon is shift-clicked sort all their fusions right after current fronters/push those to the front of the list
    - [ ] shift clicking a second digit fuses the two
  - [ ] show/hide last names
  - [ ] hide 'log switch' button
- Private View (for trusted friends + partners)
  - [ ] alt proxies view (images + names)
    - [ ] alt account names on coin backs
    - [ ] alt account profile images on coin backs
    - [ ] toggle if you hit the ' or ` keys?
  - [ ] when a token is added, reload the member list from PK
  - [ ] Edit mode button - how to make sure this isn't accidentally done?
  - [ ] toggle showing alt profile images + names + details
- Editing Mode
  - [ ] public/private view toggle (to preview/hide members who are entirely private in public mode even when a key is present)
  - [ ] hide buttons that are just for admin use when there's no token
  - [ ] when editing is toggled on, check that a token is present
  - [ ] add a "?" button to the page that shows this info:
    - CTRL + click to front or un-front a member
    - double click to open up the PK dash page for any registered member
  - [ ] make export command to update descriptions all at once
    - Updates for our system
      - [ ] Temporary function to remove emoji proxies for our system
      - [ ] move "Verbal" and "Descriptive" description keys to Alt accounts instead
      - [ ] Reorder display names to put districts after names? (vs using last names?)
  - [ ] Register a member with PK when selected as fronting if they're not yet registered
  - test this?
- Debug Mode
  - [ ] show/hide callsigns


#### Examples:
  [] any front can see it
  [3, 478] only fronts that include Val OR Milo
  [+3, +478] only fronts that have both Milo and Val
  [3+, +478] only fronts with some fusion of Val AND Milo can see it
  [3+, 478, 19-, -9] some fusion of Val but not any fusion of Aster and not Thorn specifically (but like 39 could see it) but if Milo is around it'll show up even if a Val fusion isn't around


### Known Issues
- [ ] alt accounts aren't load so flipping does nothing
  - [ ] detecting whether the click is to front or back seems not to be happening?


### Later
- [ ] when a member isn't found, use Levenshtein distance to locate a near match
- [ ] function + template generation for making new alt proxies
- add a way to include non-system members (or show multiple systems) for contributor lists (like sweeties and artists)
- output stats on how many members have what description headers (internal name translation etc) in edit mode


### Maybe
- [ ] Support for making a group within a system to use as a digit or not-digit list
- [ ] Add option to show the system description on the page somewhere?
- [ ] When only showing the active members, show a side panel with a card that has the details for that PK member
  - [ ] In edit mode, make every value on a card an editable text field
- [ ] Add the token as a GitHub secret and let people sign in with one password for editing and one password for viewing private info?
- [ ] Allow double click action to go to a url in the description instead (by looking for a keyword that matches the URL parameter like "Portfolio:")
- [ ] (Low Priority) When using CTRL + click on a fused headmate, pull up a popup that shows split options/previews the split (that disappears when CTRL is released - split to digits - or an option is clicked)
- [ ] add a color picker for member colors
  - see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/color
- [ ] search by emojis and emoji names
  - how to allow search by near miss?
- allow inputting a Picrew URL and auto download + crop avatar from image on that page (would still need to be uploaded somewhere, but a preview + crop function could be nice?)


#### UI & Styling
- [ ] visible feedback (not just in the console)
  - [ ] some kind of feedback that fronters have been successfully logged (maybe the button can't be pressed and says "Logged" if what's being shown _are_ the current fronters?)
  - the "Current Fronters" button should also be disabled if the current fronters are being shown
- [ ] add a little ## members and counting thing at the bottom
- [ ] fix background colors to work with * proxies
  - [ ] set PK colors as profile background colors
- [ ] grey out the log switch button after submitting and show a 'succesfully logged' message
- [ ] plaintext/screen reader friendsly mode that loads no images
- [ ] dots around the rim in 12 hour clock positions for digits
  - [ ] test out doing sigil-style connections between them over portraits and for members with no portrait
- [ ] support for section headers
  - 100% width
  - Active, Available, and Unavailable
  - use regular sort order with callsign 0
  - [ ] add method for expand/collapse for each section?
- [ ] styling for alt portraits for members with no unique alt profile image
  - [ ] CSS class for this
  - decide on an effect
- custom silhouette for members that don't have portraits
  - use one of the 'Alec' picrews and make it all greyed out over a random color background
- style present digits by % to fit on one line
  - style other icons to be that size or smaller
- alternate style/layout for mobile: names off to right side with details?
- fields should have outline dark grey, buttons should be solid



