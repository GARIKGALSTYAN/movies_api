/* eslint-disable */
const fs = require("fs");
const path = require("path");
const { ENV_VAR } = require("./envConfig");

const auth_env_path = "../../auth";
const movies_env_path = "../";

const auth_env_path_absolute = path.resolve(__dirname, auth_env_path, ".env");
const movies_env_path_absolute = path.resolve(__dirname, movies_env_path, ".env");

const auth_env_content =
`
APP_PORT=${ENV_VAR.AUTH_APP_PORT}
JWT_SECRET=${ENV_VAR.JWT_SECRET}
`;

const movie_env_content =
`
JWT_SECRET=${ENV_VAR.JWT_SECRET}
MOVIE_API_SERVER_PORT_INTERNAL=${ENV_VAR.MOVIE_API_SERVER_PORT_INTERNAL}
POSTGRES_HOST=${ENV_VAR.POSTGRES_HOST}
POSTGRES_USER=${ENV_VAR.POSTGRES_USER}
POSTGRES_PASSWORD=${ENV_VAR.POSTGRES_PASSWORD}
POSTGRES_PORT=${ENV_VAR.POSTGRES_PORT}
POSTGRES_DATABASE_NAME=${ENV_VAR.POSTGRES_DATABASE_NAME}
OMDBAPI_KEY=${ENV_VAR.OMDBAPI_KEY}
`;

fs.writeFileSync(auth_env_path_absolute, auth_env_content);
fs.writeFileSync(movies_env_path_absolute, movie_env_content);

console.log({ auth_env_content });
console.log({ movie_env_content });

console.log({ auth_env_path_absolute });
console.log({ movies_env_path_absolute });
