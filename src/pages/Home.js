import React, { useState, useEffect, useCallback } from "react";
import { getPokemonList } from "../services/api";
import PokemonList from "../components/PokemonList";
import "./Home.css";

const Home = () => {
  const [filteredPokemon, setFilteredPokemon] = useState([]); 

  
  const loadPokemon = useCallback(async () => {
    try {
      const data = await getPokemonList(10, 0); 
      const pokemonDetails = await Promise.all(
        data.results.map(async (pokemon) => {
          const details = await fetch(pokemon.url).then((res) => res.json());
          return details;
        })
      );

      
      setFilteredPokemon(pokemonDetails); 
    } catch (error) {
      console.error("Failed to load Pokémon:", error);
    }
  }, []); 

  
  useEffect(() => {
    loadPokemon();
  }, [loadPokemon]); 

  return (
    <div className="home-container">
      
      <PokemonList pokemon={filteredPokemon} />
    </div>
  );
};

export default Home;
