import React, {Component} from 'react';
import axios from 'axios';
import PokemonCard  from './PokemonCard';

class PokemonList extends Component {
  state = { 
    url: "https://pokeapi.co/api/v2/pokemon/?limit=151",
    pokemon: null
  }

  async componentDidMount() {
    const res = await axios.get(this.state.url);
    this.setState({ pokemon: res.data['results'] })
  }

  render() {
    return (
      <div>
        {this.state.pokemon ? (
          <div className="row m-0">
            {this.state.pokemon.map(pokemon => (
              <PokemonCard
                key={pokemon.name}
                name={pokemon.name}
                url={pokemon.url}
              />
            ))}
          </div>
        ) : (
          <h1 className="text-white">Loading pokemons...</h1>
        )}
      </div>
    );
  }
}

export default PokemonList;