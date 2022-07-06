#### Commands

Run in root folder

- yarn install
- yarn build
- yarn start

Or with docker/docker-comppse

- docker-compose build
- docker-compose up -d



#### Configuration

For environment variables go to env.config file.
To run project without docker/docker-compose specify default values.
To run with docker/docker-compose create .env file and set values.



#### About API

To have access to API user must send JWT token (get from Auth service)
via Authorization header with every request.

App has to endpoints
-  POST movie/ for creating new movie based on passed title
- GET movie/ for getting user's movies
