import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; 
import { getPokemonDetails } from "../../services/api"; 

const PokemonDetail = () => {
  const { name } = useParams(); 
  const [pokemonDetail, setPokemonDetail] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPokemonDetail = async () => {
      try {
        const data = await getPokemonDetails(name); 
        setPokemonDetail(data); 
        setIsLoading(false); 
      } catch (error) {
        console.error("Error fetching Pokémon details:", error);
        setIsLoading(false); 
      }
    };

    fetchPokemonDetail();
  }, [name]); 

  if (isLoading) {
    return <p>Loading Pokemon details...</p>;
  }

  if (!pokemonDetail) {
    return <p>Pokemon not found.</p>;
  }

  return (
    <div className="pokemon-detail">
      <h2>{pokemonDetail.name.toUpperCase()}</h2>
      <img
        src={pokemonDetail.sprites.front_default}
        alt={pokemonDetail.name}
        className="pokemon-image"
      />
      <p>Height: {pokemonDetail.height / 10} m</p>
      <p>Weight: {pokemonDetail.weight / 10} kg</p>
      
      <h3>Types:</h3>
      <ul>
        {pokemonDetail.types.map((type) => (
          <li key={type.type.name}>{type.type.name}</li>
        ))}
      </ul>

      <h3>Abilities:</h3>
      <ul>
        {pokemonDetail.abilities.map((ability) => (
          <li key={ability.ability.name}>{ability.ability.name}</li>
        ))}
      </ul>

      <h3>Stats:</h3>
      <ul>
        {pokemonDetail.stats.map((stat) => (
          <li key={stat.stat.name}>
            {stat.stat.name}: {stat.base_stat}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PokemonDetail;

