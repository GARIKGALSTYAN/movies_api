/* eslint-disable */
const axios = require("axios");
const { ENV_VAR } = require("./envConfig");

async function createMovie({ jwt_token, title }) {
  try {
    console.log("createMovie call: ", { jwt_token, title });
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
    console.log("post req", title);

    console.log("respoce:", responce);

    const data = responce.data;

    return data;
  } catch (error) {
    console.log("createMovie error:", responce);

    let error_message = error.message;
    if (error.responce && error.response.data) {
      error_message += ( " / " + error.response.data );
    }

    throw new Error(error_message);
  }

}

module.exports = { createMovie }
