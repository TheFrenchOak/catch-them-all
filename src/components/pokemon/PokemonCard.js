import React, { Component } from 'react';
import pokeball from '../pokemon/pokeball.gif';
import styled from 'styled-components';

const Sprite = styled.img`
  width: 5em;
  height: 5em;
  display: none;
`

class PokemonCard extends Component {
  state = { 
    name: '',
    imageUrl: '',
    pokemonIndex: '',
    imageLoading: true,
    toManyRequests: false
  }
  
  componentDidMount() {
    const { name, url } = this.props;
    const pokemonIndex = url.split('/')[url.split('/').length - 2];
    const imageUrl = `https://github.com/PokeAPI/sprites/blob/master/sprites/pokemon/${pokemonIndex}.png?raw=true`
  
    this.setState({
      name,
      imageUrl,
      pokemonIndex
    })
  }

  render() {
    return (
      <div className='col-md-3 col-sm-6 mb-5'>
        <div className="card">
          <h5 className="card-header">{this.state.pokemonIndex}</h5>
          <Sprite
            className="card-img-top rounded mx-auto mt-2"
            onLoad={() => this.setState({ imageLoading: false })}
            onError={() => this.setState({ toManyRequests: true })}
            src={this.state.imageUrl}
            style={ 
              this.state.toManyRequests ? { display: "none" } : 
              this.state.imageLoading ? null : { display: "block" } 
            }>
          </Sprite>
          { (this.state.imageLoading || this.state.toManyRequests) ? (
          <img 
            className="card-img-top rounded mx-auto d-block mt-2"
            src={pokeball}
            alt={this.state.name}
            style={{ width: '5em', height: '5em' }}
          />
          ) : null }
          <div className="card-body mx-auto">
            <h6 className="card-title">
              {this.state.name
                .toLowerCase()
                .split('-')
                .map(
                  word => word.charAt(0).toUpperCase() + word.substring(1)
                )
                .join(' ')}
            </h6>
          </div>
        </div>
      </div>
    );
  }
}

export default PokemonCard;