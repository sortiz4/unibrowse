# Unibrowse
Unibrowse is a single-page web application allowing users to browse through all
of the currently allocated Unicode blocks, search for character names,
literals, and code points, and learn additional information about each
character simply by mousing over them.

## Compilation
Those seeking to compile must have...

- .NET Core SDK 3.0+
- Node.js 12.0+
- NPM 6.0+
- Python 3.5+

Once these requirements have been met, simply clone the repository and execute
`py setup.py -sb` (this will setup and compile the project). Once completed,
the `server` can then be deployed like any ASP.NET Core application.
