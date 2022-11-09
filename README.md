# Front Tracker

## To Do

### Next
- [ ] upload to GitHub site as /front/
  - move known issues to GitHub issue tracker

- [ ] validate PK data and suggest edits
  - [x] function to fix fusion notes
  - [ ] function to remove emoji proxies
  - [ ] make proxies for all triples
  - [ ] make export command to do all those changes at once

- [ ] prompt for token instead of storing that in a file
  - [ ] support public and private views
    - [ ] add an edit mode, so some people can see the private info without accidentally editing
    - [ ] when there's no token entered or not editing=true:
      - [ ] make name fields un-editable
      - [ ] double click should go to public page
      - [ ] hide 'log switch' button

- [ ] set PK colors as profile background colors
  - [ ] add a color picker for member colors
    - see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/color
- [ ] visible feedback (not just in the console)
  - [ ] some kind of feedback that fronters have been successfully logged (maybe the button can't be pressed and says "Logged" if what's being shown _are_ the current fronters?)
  - the "Current Fronters" button should also be disabled if the current fronters are being shown
- default to fetching current fronters when 'live' is set true?
- set it up so it asks for a key to save locally if you try to do anything that it needs it for
  - use async alert() and await?
- when only showing the active members, show a side panel with a card tht has the details for that PK member

- [ ] function + template generation for making new alt proxies


### Active List Syntax
- in the future, save the input string separately so it keeps the syntax the user entered
- search function/syntax
  - when a member isn't found, use this to locate a near match
  - search by emojis and emoji names
    - use the emoji list in the spreadsheet to allow search by near miss
- grouping headmates like (2, 6, 7) to show stability in that group/available fusions for those members?
  (had a blur moment where it felt like those three were working together but it wasn't clear how)
- for who is involved in a specific project/will be shown a todo list item:
  REQUIRE
    +## show only if this member is present (required AND)
    ##+ for requiring fusions containing (both) those digits
  UNLESS
    -## for excluding front combinations that contain this member personally
    ##- for excluding fronts that contain that member and their fusions
  OVERRIDE
    ## for if a specific member to be present is sufficient (optional OR)

#### Examples:
  [] any front can see it
  [3, 478] only fronts that include Val OR Milo
  [+3, +478] only fronts that have both Milo and Val
  [3+, +478] only fronts with some fusion of Val AND Milo can see it
  [3+, 478, 19-, -9] some fusion of Val but not any fusion of Aster and not Thorn specifically (but like 39 could see it) but if Milo is around it'll show up even if a Val fusion isn't around


### URL Params
  - [ ] token (for authentification)
  - [ ] edit=true/false (on top of having the token or not)
  - [ ] what index/proxy layer to show initially
  - [ ] display modes
    - [ ] public
    - [ ] private    
      - [ ] alt proxies view (images + names)
        - [ ] alt account names on coin backs
        - [ ] alt account profile images on coin backs
        - [ ] toggle if you hit the ' or ` keys?
    - [ ] edit
    - [ ] toggle options to show/hide:
      - [ ] callsigns
      - [ ] emojis
      - [ ] members: `?show=active/available/all`
        - [ ] members missing nicknames + portraits
        - [ ] members that share digits with fronters/siblings only
        - [x] non-active members  
          - [ ] add url parameters for show/hide available and unavailable members 
          - [ ] when only active members are shown, show little address-book style profiles of the current fronters with pronouns and descriptions
            - [ ] in edit mode, make every value an editable text field (that'd already be better than PK because you'd have to bring up a description then copy it then edit it, instead of just editing it)
          - [ ] if only current fronters are shown on load, don't load the whole member list
    - [ ] add a button to do this + dropdown for sort order

- [ ] register a member with PK when selected as fronting if they're not yet registered
  - test this?


### Known Issues
- [ ] alt accounts aren't loaded so flipping does nothing
  - [ ] detecting whether the click is to front or back seems not to be happening?

### Later
- [ ] function to suggest Picrews  
  - suggest picrews from headmates who share digits
- sort order/display options
  - [ ] show fusions of active members first
  - [ ] hide all but active members
- [ ] way to mark a digit as unavailable for fusions
- [ ] move "Verbal" and "Descriptive" description keys to Alt accounts instead
- [ ] export function for if we want to do a major batch update, since PK limits requests and it may be easier/more polite to do that by importing an export type file (remember that those are .json files and not .js files)
- add a way to include non-system members for contributor lists (like NMcCoy and Mojang and artists)
- allow inputting a Picrew URL and auto download + crop avatar from image on that page?
- output stats on how many members have internal name translations etc in edit mode

### Project Targeting
- [ ] set up a POST API hookup in the Project Butler to log fronts/ship data for specific projects
- [ ] in non-editing mode, click to open Projects page for that fronter/active list
  - [ ] private -> open todos page
    - by default log all the current active members as having contributed to the project
  - [ ] public -> open portfolio page

### Descriptions
- add ice breaker type questions to descriptions?
  -  if somebody was trying to use a pentagram to summon you and there was space to put 5 objects, what 5 things would summon you in particular? (can this be phrased more clearly/made shorter?)

### UI & Styling
- plaintext/screen reader friendsly mode that loads no images
- dots around the rim in 12 hour clock positions for digits
  - test out doing sigil-style connections between them over portraits and for members with no portrait
- fields should have outline dark grey, buttons should be solid
- [ ] support for section headers
  - 100% width
  - Active, Available, and Unavailable
  - use regular sort order with callsign 0
  - [ ] add method for expand/collapse for each section?
- [ ] styling for alt portraits for members with no unique alt profile image
  - [ ] CSS class for this
  - decide on an effect
- custom silhouette for headmates that don't have portraits
  - use one of the 'Alec' picrews and make it all greyed out over a random color background
- style present digits by % to fit on one line
  - style other icons to be that size or smaller
- alternate style/layout for mobile: names off to right side with details?

## Click Actions
- shift click to fuse
  - when the first headmate is shift-clicked:
    - [ ] sort all their fusions right after current fronters/push those to the front of the list
  - [ ] shift clicking a second digit fuses the two
- when using CTRL + click on a fused headmate, pull up a popup that shows split options/previews the split (that disappears when CTRL is released - split to digits - or an option is clicked)

## Callsigns
  - consider callsigns like ###f and ###o for alts? (since ' isn't html-safe)
  - how to support callsigns like 19-5? (would that be 195-o?)




## Notes
- [ ] add a "?" button to the page that shows this info:
  - CS: Callsign
  - CTRL + click to front or un-front a member
  - double click to open up the PK dash page for any registered member
