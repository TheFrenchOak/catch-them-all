import React, { useState, useEffect } from 'react';
import pokeball from '../pokemon/pokeball.png';
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

  const removePokemon = (id) => {
    setPokemonBag(state => state.filter(p => p.id !== id));
  };

  return (
    <div>
      <div id="gameboy">
        <div id="screen">
          <div className="hint">
            <p>Hint: Press A to throw a Pokeball and catch it!</p>
            <img 
              src={pokeball}
              alt="pokeball"
              style={{ width: '3em', height: '2.4em', marginTop: '20px' }}
            />
          </div>
          <div className='poke-name'>
            <h4>{
              wildPokemon.name ? 
                wildPokemon.name
                .toLowerCase()
                .split('-')
                .map(
                  word => word.charAt(0).toUpperCase() + word.substring(1)
                )
                .join(' ') : null
            }</h4>
          </div>
          <div className='poke-hp'>
            <p>Niv. {wildPokemon.base_experience}</p>
          </div>       
          { wildPokemon.id ? 
            <img 
              className="card-img-top rounded mx-auto d-block mt-2"
              src={"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + wildPokemon.id + ".png"}
              alt={wildPokemon.name ? wildPokemon.name : null}
              style={{ width: '8em', height: '8em', position: 'absolute', top:'60px', right:'70px'}}
            />
          : null } 
        </div>   
        <div id="dpad"></div>
        <div id="bevel"></div>
        <div id="bt1" onClick={() => catchPokemon(wildPokemon)}>
          <div className="btn-A">A</div>
          <div className="btn-B">B</div>
        </div>
        <div id="bt2"></div>
      </div>
      <div className="pokebag">
        <div className="right-panel-bottom bg-white">
          <div className="scrollable d-flex row">
            {pokemonBag.map(pokemon => (
              <div className="col-md-6" key={pokemon.id}>
                <p className="mb-0">n°{pokemon.id}</p>
                <img
                  src={"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + pokemon.id + ".png"}
                  alt={pokemon.name}
                />
                <button className='remove-btn btn btn-danger mb-2' onClick={() => removePokemon(pokemon.id)}>Release</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonCatch;

