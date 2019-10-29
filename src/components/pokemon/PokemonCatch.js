import React from 'react';
import PokemonBag from '../pokemon/PokemonBag';
import WildPokemon from '../pokemon/WildPokemon';


const pokemonCatch = () => {
  return (
    <div>
      <WildPokemon/>   
      <PokemonBag/>
    </div>
  );
};

export default pokemonCatch;

