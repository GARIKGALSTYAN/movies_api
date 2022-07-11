/* eslint-disable */
const axios = require("axios");
const { ENV_VAR } = require("./createEnvFiles");

async function createMovie({ jwt_token, title }) {
  try {
    const responce = await axios.post(`http://localhost:${ENV_VAR.MOVIE_API_SERVER_PORT_EXTERNAL}/movie`,
    {
      title,
    },
    {
      headers: {
        Authorization: `Bearer ${jwt_token}`,
      },
    }
  );

    const data = responce.data;

    return data;
  } catch (error) {
    throw new Error(error.message + " / " + error.response.data);
  }

}

module.exports = { createMovie }