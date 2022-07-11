/* eslint-disable */
const axios = require("axios");
const { ENV_VAR } = require("./envConfig");

async function createMovie({ jwt_token, title }) {
  try {
    const responce = await axios.post(`http://0.0.0.0:${ENV_VAR.MOVIE_API_SERVER_PORT_EXTERNAL}/movie`,
      {
        title,
      },
      {
        headers: {
          Authorization: `Bearer ${jwt_token}`,
        },
      }
    );

    console.log("respoce:", responce);

    const data = responce.data;

    return data;
  } catch (error) {
    throw new Error(error.message + " / " + error.response.data);
  }

}

module.exports = { createMovie }
