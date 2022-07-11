/* eslint-disable */
const axios = require("axios");
const { ENV_VAR } = require("./createEnvFiles");

function getPremiumUserJWTToken() {
  return getJWTToken("premium-jim", "GBLtTyq3E_UNjFnpo9m6");
}

function getBasicUserJWTToken() {
  return getJWTToken("basic-thomas", "sR-_pcoow-27-6PAwCD8");
}

async function getJWTToken(username, password) {
  const responce = await axios.post(`http://localhost:${ENV_VAR.AUTH_APP_PORT}/auth`, {
    username,
    password,
  });

  const data = responce.data;

  return data.token;
}

module.exports = { getBasicUserJWTToken, getPremiumUserJWTToken }
