# Front Tracker

CS - Callsign


## Notes
- CTRL + click to front or un-front a member
- double click to open up PK dash page for the member
- Locally there's an auth.js file with just `let pkToken = "token-here"` - that isn't being synched to GitHub so if we need to set this up again we'll need to make a new one of those (later make this a URL parameter)
- Remember that the PK API limits requests etc pretty strongly; if we want to do a major batch update it may be easier to do that by importing an export type file (remember that those are .json files and not .js files)


## To Do

### Next
- unique ID for front and back icons and names
- click to show back or front
  - do flip animation (for members that can flip)
- PK API
  - fetch member data to display BEFORE checking things
  - function for making a new alt member
    - does the current one do that?
    - detect new alt and make private and set member of alt group
  - set name function
    - CS: text and text -CS equivalent name proxies
  - function to take Descriptions apart and put them back together
- figure out why sort order for digits is off
- alt account names on coin backs
  - toggle mode that shows alt account names + image urls
    - toggle both front and back classes on all the things of that type?
    - have it do that if you hit the ' or ` keys?
    - make them flip over like coins to have fursonas on the other side
    - list people without alts last? or grey out their images?
- shift click to fuse
  - when the first headmate is shift-clicked:
    - sort all their fusions right after current fronters/push those to the front of the list
  - shift clicking a second digit fuses the two
- send that first API request through immediately
  - add a save button
- click to bring up a description
  - first just slap on the stringified JSON
  - then make every value an editable text field


### Then
- known issues: sort order
- output as ?active=24,5,6
  - generate a link (output to search bar?)
  - 'Log Switch' button
    - load from last switch if there's no URL param
    - https://pluralkit.me/api/endpoints/#switches
  - load from URL parameter    
    - first upload to GitHub site somewhere, /front/ ?
  - reset button (back to 1,2,3,4,5,6,7,8,9)
  - button to log switches to PK
- names off to right side with details?
- register a member with PK when selected as fronting if they're not yet registered
- suggest Picrews


### Later
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