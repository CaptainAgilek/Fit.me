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

## ENV properties for backend
PORT=4000
JWT_SECRET=
DB_HOST=localhost
DB_NAME=user_team02
DB_USER=team02
DB_PASSWORD=
DB_PORT=4242
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASS=
FRONTEND_URL=http://localhost:3000/
BACKEND_URL=http://localhost:4000/

Edit .env file, add JWT_SECRET,DB_PASSWORD, SMTP_PASS.


