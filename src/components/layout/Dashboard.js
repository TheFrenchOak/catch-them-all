import React from 'react';
import PokemonList from '../pokemon/PokemonList';
import PokemonCatch from '../pokemon/PokemonCatch';

const Dashboard = () => {
  return (
    <div className="d-flex">
      <div className="left-panel row">
        <div className="col">
          <PokemonList/>
        </div>
      </div>
      <div className="right-panel d-block">
        <PokemonCatch/>
      </div>
    </div>
  );
}

export default Dashboard;