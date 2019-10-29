import React, { useState, useEffect } from 'react';
import axios from 'axios';

const WildPokemon = () => {
  const [wildPokemon, setWildPokemon] = useState([]);

  useEffect(() => {
    encounterWildPokemon();
  }, []);

  const pokeId = () => {
    return Math.floor(Math.random() * 151) + 1;
  };

  const encounterWildPokemon = () => {
    axios
      .get("https://pokeapi.co/api/v2/pokemon/" + pokeId())
      .then(res => {
        setWildPokemon(res.data);
      })
  };
  
  return (
    <div className="right-panel-top rounded bg-white">
      <h2>{
        wildPokemon.name ? 
          wildPokemon.name
          .toLowerCase()
          .split('-')
          .map(
            word => word.charAt(0).toUpperCase() + word.substring(1)
          )
          .join(' ') : null
        }</h2>
      { wildPokemon.id ? 
        <img 
          className="card-img-top rounded mx-auto d-block mt-2"
          src={"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + wildPokemon.id + ".png"}
          alt={wildPokemon.name ? wildPokemon.name : null}
          style={{ width: '5em', height: '5em' }}
        />
      : null }
    </div>
  );
}

export default WildPokemon;