# Team project: Fit.me 

### Backend

- Apollo server
- DB connection
- Auth lib and mocked signin mutation

### Frontend

- Apollo client
- Routing (Home and NotFoundPage)
- Auth util to handle access token

## JavaScript Packages

- Useful commands:
  - yarn install (install local dependencies - based on package.json and yarn.lock files)
  - yarn add <package-name> (install new NPM package and add it as a dependency to package.json)
  - yarn <script-name> (eg. yarn start, yarn prettier, see "scripts" section in package.json)
  
## Server Setup
### SSH 

- ssh username@vse.handson.pro

### Domains

- http://dev.frontend.team02.vse.handson.pro/
- http://dev.backend.team02.vse.handson.pro/graphql

## ENV properties for frontend on localhost
- BROWSER=none
- REACT_EDITOR=none
- REACT_APP_GRAPHQL_API=http://localhost:4000/graphql
- FRONTEND_URL=http://localhost:3000/
