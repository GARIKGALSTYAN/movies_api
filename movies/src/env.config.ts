const db_host = process.env.POSTGRES_HOST;
const db_username = process.env.POSTGRES_USER;
const db_password = process.env.POSTGRES_PASSWORD;
const db_port = Number(process.env.POSTGRES_PORT);
const db_name = process.env.POSTGRES_DATABASE_NAME;

const server_port = Number(process.env.MOVIE_API_SERVER_PORT_INTERNAL);
const auth_jwt_secret = process.env.JWT_SECRET;
const omdbapi_key = process.env.OMDBAPI_KEY;


const db_host_default = "localhost";
const db_username_default = "user";
const db_password_default = "postgres";
const db_port_default = 33000;
const db_name_default = "movie";

const server_port_default = 18000;
const auth_jwt_secret_default = "secret";
const omdbapi_key_default = "5ff1511e";


export const DATABASE_CONFIG = {
  host: db_host || db_host_default,
  username: db_username || db_username_default,
  password: db_password || db_password_default,
  port: db_port || db_port_default,
  database_name: db_name || db_name_default,
}

export const SERVER_CONFIG = {
  port: server_port || server_port_default,
  auth_jwt_secret: auth_jwt_secret || auth_jwt_secret_default,
  omdbapi_key: omdbapi_key || omdbapi_key_default,
}
