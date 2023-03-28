# Unibrowse
Unibrowse is a single-page web application allowing users to browse through all
of the currently allocated Unicode blocks, search for character names,
literals, and code points, and learn additional information about each
character simply by hovering over them.

## Compilation
Those seeking to compile must have...

- Node.js 18.0
- Python 3.10

Once these requirements have been met, simply clone the repository and execute
`py setup.py -u` to download the latest Unicode data, `npm install` to download
the project's dependencies, and `npm run build` to compile the project. Once
completed, the `www/apps/client/exported` directory can then be deployed to any
web server.
