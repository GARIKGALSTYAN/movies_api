import axios from "axios";
import { SERVER_CONFIG } from "../../env.config";
import { MovieDetails } from "./types";

export async function getMoiveDetails(title: string) {
  const request_endpoint = `http://www.omdbapi.com/?apikey=${SERVER_CONFIG.omdbapi_key}&t=${title}`;

  const responce = await axios.get(request_endpoint);

  if (!responce.data) {
    throw new Error("Can't get movie details");
  }

  const {
    Released,
    Genre,
    Director,
  } = responce.data;

  if (!Released || Released === "N/A" ||
      !Genre || Genre === "N/A" ||
      !Director || Director === "N/A"
  ) {
    throw new Error("Can't get some movie details");
  }

  const movie_details: MovieDetails = {
    release_date: new Date(responce.data.Released),
    genre: responce.data.Genre,
    director: responce.data.Director,
  }

  return movie_details;
}
