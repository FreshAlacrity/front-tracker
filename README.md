# Front Tracker

CS - Callsign


## Notes
- CTRL + click to front or un-front a member
- double click to open up PK dash page for the member
- Locally there's an auth.js file with just `let pkToken = "token-here"` - that isn't being synched to GitHub so if we need to set this up again we'll need to make a new one of those (later make this a URL parameter)
- Remember that the PK API limits requests etc pretty strongly; if we want to do a major batch update it may be easier to do that by importing an export type file (remember that those are .json files and not .js files)


## To Do

### Next
- [ ] unique ID for front and back icons and names
  - don't use the ##' format because ' isn't a valid part of html IDs
- PK
  - function for making a new alt member
    - does the current one do that?
    - detect new alt and make private and set member of alt group
  - set name function onChange
    - CS: text and text -CS equivalent name proxies
  - function to take Descriptions apart and put them back together
- known issue: sort order for digits is off
  - [ ] check: is this because the sort order is being applied to the wrong element?
- [x] toggle mode that shows alt account names + image urls
  - [ ] alt account names on coin backs
  - [ ] alt account profile images on coin backs
  - [ ] stop tiles with no back from flipping
  - [ ] have it do that if you hit the ' or ` keys?
  - [ ] in alt mode list people without alts last? and/or grey out their images?
- [ ] send that first API request through immediately

### Then
- shift click to fuse
  - when the first headmate is shift-clicked:
    - [ ] sort all their fusions right after current fronters/push those to the front of the list
  - [ ] shift clicking a second digit fuses the two
- [ ] click to bring up a description
  - first just slap the stringified JSON onto a floating DIV
  - then make every value an editable text field
- [ ] known issues: sort order
- [ ] register a member with PK when selected as fronting if they're not yet registered
- [ ] suggest Picrews
- [x] output as list 5,6,24
  - [ ]update the url parameter ( ?active=5,6,24 )
  - [ ] load from URL parameter
  - [ ] 'Log Switch' button
    - [ ] load from last switch if there's no URL param
    - [ ] see https://pluralkit.me/api/endpoints/#switches
  - [ ] reset button (back to 1,2,3,4,5,6,7,8,9)

### Later
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