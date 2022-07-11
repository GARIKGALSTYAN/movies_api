/* eslint-disable */

const {
  getBasicUserJWTToken,
  getPremiumUserJWTToken,
} = require("./getAuthToken");

const {
  createMovie,
} = require("./createMovie");

const MOVIE_TITLES = [
  "Interstellar",
  "Bee Movie",
  "Pulp Fiction",
  "Shrek",
  "Groundhog Day",
  "Everything Everywhere All at Once",
];

(async () => {
  try {
    console.log("> Basic user accout test");

    const basic_user_jwt_token = await getBasicUserJWTToken();
    console.log({ basic_user_jwt_token });

    for (let i = 0; i < MOVIE_TITLES.length; i++) {
      try {
        console.log(MOVIE_TITLES[i]);
        const movie = await createMovie({
          jwt_token: basic_user_jwt_token,
          title: MOVIE_TITLES[i],
        });
        console.log("Created movie for basic user, with id:", movie.id);
      } catch (error) {
        console.log("error:", error);
        console.log("Basic user accout test error: ", error.message);
      }
    }

    console.log("> Premium user accout test");

    const premium_user_jwt_token = await getPremiumUserJWTToken();
    console.log({ premium_user_jwt_token });

    for (let i = 0; i < MOVIE_TITLES.length; i++) {


      try {
        const movie = await createMovie({
          jwt_token: premium_user_jwt_token,
          title: MOVIE_TITLES[i],
        });
        console.log("Created movie for premium user, with id:", movie.id);
      } catch (error) {
        console.log("Premium user accout test error: ", error.message);
      }
    }

  } catch (error) {
    console.log("test error: ", error.message);
  }
})();
