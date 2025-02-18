import React, { useState, useEffect, useCallback } from "react";
import { getPokemonList } from "../services/api";
import PokemonList from "../components/PokemonList";
import "./Home.css";

const Home = () => {
  const [filteredPokemon, setFilteredPokemon] = useState([]); // Store filtered Pokémon

  // Memoize loadPokemon using useCallback
  const loadPokemon = useCallback(async () => {
    try {
      const data = await getPokemonList(10, 0); // Load 10 Pokémon at a time
      const pokemonDetails = await Promise.all(
        data.results.map(async (pokemon) => {
          const details = await fetch(pokemon.url).then((res) => res.json());
          return details;
        })
      );

      // Set the loaded Pokémon as the main list
      setFilteredPokemon(pokemonDetails); // Set filteredPokemon initially to the full list
    } catch (error) {
      console.error("Failed to load Pokémon:", error);
    }
  }, []); // Load Pokémon only once on mount

  // Effect to load Pokémon initially
  useEffect(() => {
    loadPokemon();
  }, [loadPokemon]); // Only run once when the component mounts

  return (
    <div className="home-container">
      {/* Render the Pokémon list */}
      <PokemonList pokemon={filteredPokemon} />
    </div>
  );
};

export default Home;
