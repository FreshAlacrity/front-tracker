# Front Tracker

## About
Allows users of [Plural Kit](https://pluralkit.me/) to show, manage, analyse, and track member information for large systems. Currenty in development/alpha release; feedback and questions are welcome and can be submitted through the [GitHub Issues page](https://github.com/FreshAlacrity/front-tracker/issues/new).

## Planned
 #todo: move these to Issues page instead

### Next
- [ ] add the URL parameter to the page for showing active fronters when that button is clicked
- [ ] see what special characters are safe for url params and make sure there's a function to make them safe/convert back

### Editing members
- add a pencil ✏️ "Edit" button
  - make a tablet mode toggle that always shows the edit buttons?
  - [ ] show only on hover

### Savimg notes on system members
- allow folks to save cached notes to a google sheet with a name (column) and a password (and check that the password is the same?) and then obfuscade/encrypt the text using that password
  - butler: https://script.google.com/home/projects/1LOGC9FVeLE6rWkBitDSibhlL1NMmGTsDJGnnWL1PZajWQC5JXgp-NQwS/edit?pli=1
  - sheet: https://docs.google.com/spreadsheets/d/159uh1M7ut-kEBBnaeZuDR30Td_1B0MJ1x5m72Pmw5pQ/edit#gid=0
  - beware that this could be used to over-write existing notes (save date-time to only silently over-write notes that are older? or just append?)
  - allow folks to load in such notes

### Viewing Modes
- Public View
  - shift click to fuse?
    - [ ] when the first icon is shift-clicked sort all their fusions right after current fronters/push those to the front of the list
    - [ ] shift clicking a second digit fuses the two
  - [ ] show/hide last names
- Private View (for trusted friends + partners)
  - [ ] alt proxies view (images + names)
    - [ ] alt account names on coin backs
    - [ ] alt account profile images on coin backs
    - [ ] toggle if you hit the ' or ` keys?
  - [ ] when a token is added, reload the member list from PK
  - [ ] toggle showing alt profile images + names + details
- Editing Mode
  - [ ] public/private view toggle (to preview/hide members who are entirely private in public mode even when a key is present)
  - [ ] Register a member with PK when selected as fronting if they're not yet registered
  - test this?

#### Examples:
  [] any front can see it
  [3, 478] only fronts that include Val OR Milo
  [+3, +478] only fronts that have both Milo and Val
  [3+, +478] only fronts with some fusion of Val AND Milo can see it
  [3+, 478, 19-, -9] some fusion of Val but not any fusion of Aster and not Thorn specifically (but like 39 could see it) but if Milo is around it'll show up even if a Val fusion isn't around

### Later
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
- [ ] fix background colors to work with * proxies
  - [ ] set PK colors as profile background colors
- [ ] grey out the log switch button after submitting and show a 'succesfully logged' message
- [ ] plaintext/screen reader friendsly mode that loads no images
- [ ] dots around the rim in 12 hour clock positions for digits
  - [ ] test out doing sigil-style connections between them over portraits and for members with no portrait
- [ ] 
  - [ ] 
- [ ] styling for alt portraits for members with no unique alt profile image
  - [ ] CSS class for this
  - [ ] decide on an effect
