How run project

Commands

1. yarn install
2. yarn build
3. yarn start

Or with docker/docker-comppse

1. docker-compose build
2. docker-compose up -d



Configuration

for environment variables go to env.config file.
To run project without docker/docker-compose specify defailt values
To run with docker/docker-compose crate .env file and set values



About API

To have access to API user must send JWT token (get from Auth service)
via Authorization header with every request.

App has to endpoints
  POST movie/ for creating new movie based on passed title
  GET movie/ for getting user's movies
