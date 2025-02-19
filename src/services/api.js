import axios from "axios";

const BASE_URL = "https://pokeapi.co/api/v2/";

export const getPokemonList = async (limit = 20, offset = 0) => {
  try {
    const response = await axios.get(`${BASE_URL}pokemon?limit=${limit}&offset=${offset}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching Pokemon list:", error);
    throw error;
  }
};

export const getPokemonDetails = async (name) => {
  try {
    const response = await axios.get(`${BASE_URL}pokemon/${name}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching Pokemon details:", error);
    throw error;
  }
};
