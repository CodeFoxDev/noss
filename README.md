# Features

### Commands
When typing use a '/' to issue commands, same as in notion.
Commands include things like: formatting (h1, etc.), images, tables and other special blocks.
- Maybe allow extensions/plugins in the future that can register custom commands?

### Editing modes
There are two editing modes, each of them have their pros and cons, some features of them include:
- Git (ish) mode
  When you make changes it will be saved to your account, but you have to commit them for others to view,
  this makes it easy to see who wrote what. (with git blame)
  Also makes version control very clear, and easy to check what was somewhere previously
- Realtime
  Updates to others in realtime, good for collaborating in realtime.
  Still has the features of seeing who wrote what, but makes version control less clear, as 'versions' are seperated by time

### Shortcuts
You should be able to navigate the editor (and maybe other pages) without a mouse, similar to vim.
Everything should have clear and familiar (same as other apps) shortcuts

# Urls
Url for projects is similar to github
- /:user/:repo
- /:workspace/:repo
  - /minkema/aantekeningen
- /:workspace/:repo/:files(/:subfiles*)
  - /minkema/aantekeningen/scheikunde/V4.2-Bouwstenen-van-stoffen
  - the pages should be encoded to valid url segments

# TODO
- **Editor component**
  - [x] Seperate code into class to improve readability
    - [x] Add blocks property which are instance of `Block` class
      - [x] Focus method
    - [x] Allow for inserting new block with one function call with index
    - [ ] Add support for chromium based browsers, as they insert divs on enter, which is not accounted for
  - [x] Seperate blocks in divs
    - [x] Change div props on `contenteditable > insertParagrah`
  - [ ] Seamless UI
    - [ ] Fix focussing issue, not always focussing on ctrl+enter and focussing on the right side
  - [ ] Formatting
    - [ ] Commands, to change block type when typing `/`
    - [ ] Markdown support? (or just partial)
  - [ ] Context menu when text is selected
    - [ ] Show/hide when text is selected/unselected
    - [ ] Allow changing of formatting
  - [ ] Allow undo/redo of actions
    - [ ] Create action stack and keep track of changes to page
- **Viewer component**
  - [ ] Same UI as editor, but without edit features