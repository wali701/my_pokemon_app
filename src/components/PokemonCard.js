import React from "react";
import { Link } from "react-router-dom";
import "./PokemonCard.css";

const PokemonCard = ({ name, image, height, weight }) => {
  return (
    <div className="pokemon-card">
      {/* Updated alt attribute */}
      <Link to={`/pokemon/${name}`} className="pokemon-link">
        <img
          src={image || "https://via.placeholder.com/100"} 
          alt={name}  // Just use the Pokémon's name as alt text
          className="pokemon-image"
        />
        <h3>{name.charAt(0).toUpperCase() + name.slice(1)}</h3> {/* Capitalize first letter */}
        <p>Height: {height ? `${height}m` : "N/A"}</p> {/* Show N/A if no height */}
        <p>Weight: {weight ? `${weight}kg` : "N/A"}</p> {/* Show N/A if no weight */}
      </Link>
    </div>
  );
};

export default PokemonCard;
