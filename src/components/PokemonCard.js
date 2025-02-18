import React from "react";
import { Link } from "react-router-dom";
import "./PokemonCard.css";

const PokemonCard = ({ name, image, height, weight }) => {
  return (
    <div className="pokemon-card">
      
      <Link to={`/pokemon/${name}`} className="pokemon-link">
        <img
          src={image || "https://via.placeholder.com/100"} 
          alt={name}  
          className="pokemon-image"
        />
        <h3>{name.charAt(0).toUpperCase() + name.slice(1)}</h3> 
        <p>Height: {height ? `${height}m` : "N/A"}</p> 
        <p>Weight: {weight ? `${weight}kg` : "N/A"}</p> 
      </Link>
    </div>
  );
};

export default PokemonCard;
