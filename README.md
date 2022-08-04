# Front Tracker

CS - Callsign

## Notes
- Locally there's an auth.js file with just `let pkToken = "token-here"` - that isn't being synched to GitHub so if we need to set this up again we'll need to make a new one of those (later make this a URL parameter)
- Remember that the PK API limits requests etc pretty strongly; if we want to do a major batch update it may be easier to do that by importing an export type file (remember that those are .json files and not .js files)

## To Do

### Next
- send that first API request through immediately
- click to bring up a description
  - first just slap on the stringified JSON
  - then make every value an editable text field
  - add a save button
- if a member is clicked and has no PK registered, make one and print to console commands for setting an avatar?
- PK API
  - fetch member data to display BEFORE checking things
  - new alt member function
  - set name function
    - CS: text and text -CS equivalent name proxies
  - function to take Descriptions apart and put them back together
- assert and check:
  - members with avatar urls should have a picrew link in their description (with some exceptions)
  - all members should have CS: text and text -CS proxies
  - all named members should have Name: text and text -Name proxies
  - all members should have preferred pronouns listed
  - all members should have their names set to private
- alt account names on coin backs
  - toggle mode that shows alt account names + image urls
    - toggle both front and back classes on all the things of that type?
    - have it do that if you hit the ' or ` keys?
    - make them flip over like coins to have fursonas on the other side
    - list people without alts last? or grey out their images?
- fix CSS so the tiles are different sizes again


### Then
- more strategic background colors
  - use HSL?
  - lighter colors for Moth fusions
  - darker for Thorn fusions
  - more saturated for Lucky fusions
  - less saturated for Val fusions
  - that leaves Faun (Red?), Clover (Orange?), Ruth (Purple?), Kent (Green?), Giles (Blue?)
  - consider also colors that mean something: https://blog.datawrapper.de/gendercolor/
- pull from and update url parameters
  - first upload to GitHub site somewhere, /front/ ?
- search by name, digits etc
- style present digits by % to fit on one line
  - style other icons to be that size or smaller
- known issues: sort order doesn't always put present headmates first (not fixed; to reproduce )
- output as ?active=24,5,6 and generate a link (output to search bar?)
- load from URL parameter
- style: size up the present fronters to be all on one row (when possible) and add some space below that
- show emojis
- connect to PluralKit API
- names off to right side with details?
- refactor to use an object to store current, past, and future states


### Later
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