import React, { useState, useEffect } from 'react';
import axios from 'axios';


const PokemonCatch = () => {
  const [pokemonBag, setPokemonBag] = useState([]);
  const [wildPokemon, setWildPokemon] = useState([]);

  useEffect(() => {
    encounterWildPokemon();
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
  
  const catchPokemon = (pokemon) => {
    setPokemonBag(state => {
      const pokemonExists = (state.filter(p => pokemon.id === p.id).length > 0);
      if (!pokemonExists) {
        state = [...state, pokemon];
        state.sort((a,b) => a.id - b.id);
      }
      return state;
    });
    encounterWildPokemon();
  };

  return (
    <div>
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
        <button className="catch-btn" onClick={() => catchPokemon(wildPokemon)}>Catch</button> 
      </div>   
      <div className="right-panel-bottom rounded bg-white d-flex row m-0">
        {pokemonBag.map(pokemon => (
          <div className="col-md-6" key={pokemon.id}>
            <img
              src={"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + pokemon.id + ".png"}
              alt={pokemon.name}
            />
            <button className='remove-btn'>Remove</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PokemonCatch;

