# Merkle development task 🛠️

ExpressJS backend + ReactJS frontend app to fetch and show results from omdb API. API endpoint is secured with
basic authorization and JWT token sent to client. Resulst are cached with Redis.

TailwindCSS for frontend styling. Axios for all fetching operations, remote and local calls.

## Development mode

Testing the website is only possible with following credentials for API:
username: _admin_
password: _12345_

You need to have [Redis](https://redis.io/) server on your machine for code to work properly.

To run this app in development mode execute the following commands in root folder

- `npm install`
- `npm start`

in /client folder

- `npm install`
- `npm start`

## Production mode

To run this app in production mode where backend will serve frontend as static files

Go to /client folder and run

- `npm install`
- `npm run build`

And then in the root folder run

- `npm install`
- `npm start`

The website will be served by Express on 5000 port, no need to start frontend separetly.

## Additional info

Due to size, goal and time constraints of the project many additional security things were omitted - such as
3rd party service secure logins (ex: Auth0), all CORS routes were made accessible.

The repository will be updated with proper links and info when the project will be dockerized and deployed.
