import React, { useState, useEffect } from "react";
import { getPokemonList } from "../services/api";
import PokemonCard from "./PokemonCard";
import "./PokemonList.css";
import 'bootstrap/dist/css/bootstrap.min.css';

// Function to generate a random color
const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const PokemonList = () => {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await getPokemonList(2, offset);
        const pokemonDetails = await Promise.all(
          data.results.map(async (pokemon) => {
            const details = await fetch(pokemon.url).then((res) => res.json());
            return details;
          })
        );

        setPokemon((prevPokemon) => [...prevPokemon, ...pokemonDetails]);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching Pokemon data:", error);
        setError("Failed to load Pokemon");
        setLoading(false);
      }
    };

    fetchPokemon();
  }, [offset]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredPokemon = pokemon.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

 
  const loadMore = () => {
    setLoading(true);  
    setTimeout(() => {
      setOffset((prevOffset) => prevOffset + 2);
      setLoading(false);  
    }, 1500);  
  };

  return (
    <div className="pokemon-list">
    
      <input
        type="text"
        className="form-control mb-3 w-100" 
        placeholder="Search Pokemon"
        value={searchTerm}
        onChange={handleSearchChange}
      />

      {error && <p className="error">{error}</p>} {/* Display error message */}
      
      {filteredPokemon.length > 0 ? (
        filteredPokemon.map((p, index) => (
          <div
            key={index}
            className="pokemon-card"
            style={{ backgroundColor: getRandomColor() }} 
          >
            <PokemonCard
              name={p.name}
              image={p.sprites?.front_default || "https://via.placeholder.com/100"}
              height={p.height / 10}
              weight={p.weight / 10}
            />
          </div>
        ))
      ) : (
        <p className="no-results">No Pokemon found.</p>
      )}

      
      {loading ? (
        <p>Loading...</p>  
      ) : (
        <button
          onClick={loadMore}
          className="btn-custom"
          disabled={loading}
        >
          {loading ? "Loading..." : "Load More"}
        </button>
      )}
    </div>
  );
};

export default PokemonList;
