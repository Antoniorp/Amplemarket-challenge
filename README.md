# Instructions

## Requisites
* `node`
* `yarn` or `npm`

## Notes for deploying the chrome extension

1. Run `yarn` or `npm install` on the root directory of the project
2. run `yarn build` or `npm run build` on the root directory of the project
3. copy the file inboxsdk.js from ./src to the ./build/static/js
4. in chrome://extensions, load the extension from the ./build folder.

## Limitations

1. The copy command is not working hence the need for manually copy the inboxsdk.js file
2. When the window changes its dimensions, the Templates dialog box will not readjust to the new window
