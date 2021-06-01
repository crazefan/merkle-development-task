# Merkle development task 🛠️

ExpressJS backend + ReactJS frontend app to fetch and show results from omdb API. API endpoint is secured with
basic authorization and JWT token is sent to client. Results are cached with Redis in memory for better performance.

TailwindCSS for frontend styling. Axios for all fetching operations, remote and local calls.

## Development mode 👨‍💻

Testing the website is only possible with following credentials for API:

- username: _admin_
- password: _12345_

### Docker 🐳📦

You can start this project with docker using following command in the project's root folder:

- `docker-compose up`

You'll be able to access app on localhost port 5000

### Locally with NodeJS 🖥️

You need to have [Redis](https://redis.io/) server on your machine for code to work properly.

Before running the code make sure you change REDIS_URI env variable in .env file to 6379. By default this variable
is configured to run in docker.

To run this app in development mode with separate npm server for frontend execute the following commands in root folder

- `npm install`
- `npm start`

in /client folder

- `npm install`
- `npm start`

To run this app in mode when backend is serving frontend as static files:

Go to /client folder and run

- `npm install`
- `npm run build`

And then in the project's root folder run

- `npm install`
- `npm start`

In this case the website will be served by Express on 5000 port, no need to start frontend separetly.

## Additional info 📄

Due to size, goal and time constraints of the project many additional security things were omitted - such as
3rd party service secure logins (ex: Auth0), and for ease of use all CORS routes were made accessible.

The repository will be updated with proper links and info when the project will be dockerized and deployed.
